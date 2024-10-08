import { Arg, Authorized, Ctx, Int, Mutation, Query } from "type-graphql";
import Group from "../entities/Group";
import {
  NewGroupInputType,
  UpdateGroupNameInputType,
} from "../types/GroupTypes";
import { ContextType } from "../types/ContextType";
import { GraphQLError } from "graphql";
import { findOrCreateUserByEmail, sendAnEmail } from "../services/userService";
import Channel from "../entities/Channel";
import User from "../entities/User";

/**
 * Resolver class for handling group-related operations.
 */
export default class GroupResolver {
  /**
   * Query resolver for fetching all groups.
   */
  @Authorized()
  @Query(() => [Group])
  async groups(@Ctx() ctx: ContextType) {
    // Check if the current user is logged in
    if (!ctx.currentUser) {
      throw new GraphQLError("you need to be logged in");
    }
    return Group.find({});
  }

  /**
   * Query resolver for retrieving a group by its ID.
   */
  @Authorized()
  @Query(() => Group)
  async groupById(
    @Arg("groupId", () => Int) id: number,
    @Ctx() ctx: ContextType
  ) {
    // Check if the current user is logged in
    if (!ctx.currentUser) {
      throw new GraphQLError("you need to be logged in");
    }
    const group = await Group.findOne({
      where: { id },
    });
    if (!group) {
      throw new GraphQLError("Group not found");
    }
    return group;
  }

  /**
   * Mutation resolver for creating a new group.
   */
  @Authorized()
  @Mutation(() => Group)
  async createGroup(
    @Arg("data", { validate: true }) data: NewGroupInputType,
    @Ctx() ctx: ContextType
  ) {
    // Check if the current user is logged in
    if (!ctx.currentUser) {
      throw new GraphQLError("you need to be logged in");
    }
    // Check if a group with the same name already exists for the current user
    const existingGroupOwner = await Group.findOne({
      where: {
        name: data.name,
        owner: ctx.currentUser,
      },
    });
    const existingGroupMember = await Group.findOne({
      where: {
        name: data.name,
      },
    });
    const isExistingGroupMember = existingGroupMember?.members.some(
      (member) => member.id === ctx.currentUser?.id
    );
    if (existingGroupOwner || isExistingGroupMember) {
      throw new GraphQLError("A group with this name already exists for you");
    }

    // Create a new Group object and assign the data
    const newGroup = new Group();
    Object.assign(newGroup, data);
    newGroup.owner = ctx.currentUser;

    // Validate emails and fetch users
    if (data.members && data.members.length > 0) {
      const members = [];
      for (const email of data.members) {
        const user = await findOrCreateUserByEmail(email);

        members.push(user);
        newGroup.members = members.filter(member => member !== null) as User[]; // Add the members to the group
      }
    }

    // Save the new group to the database and return it
    const { id } = await newGroup.save();

    // Iterate over each member of the new group
    if (newGroup.members && newGroup.members.length > 0) {
      newGroup.members.forEach((user) => {
        // Send an email to the current user
        sendAnEmail(newGroup, user, id);
      });
    }
    return Group.findOne({
      where: { id },
    });
  }

  /**
   * Mutation resolver for change the name of the group.
   */
  @Authorized()
  @Mutation(() => Group)
  async changeGroupName(
    @Arg("groupId", () => Int) id: number,
    @Arg("data", { validate: true }) data: UpdateGroupNameInputType,
    @Ctx() ctx: ContextType
  ) {
    // Check if the current user is logged in
    if (!ctx.currentUser) {
      throw new GraphQLError("you need to be logged in");
    }

    // Find the group with the given ID
    const groupToUpdate = await Group.findOne({
      where: { id },
    });

    // Throw an error if the group is not found
    if (!groupToUpdate) {
      throw new GraphQLError("Group not found");
    }

    // Check if the current user is the owner of the group
    if (groupToUpdate.owner.id !== ctx.currentUser.id) {
      throw new GraphQLError("You are not the owner of this group");
    }

    // Check if a group with the same name already exists for the current user
    const existingGroupOwner = await Group.findOne({
      where: {
        name: data.name,
        owner: ctx.currentUser,
      },
    });
    const existingGroupMember = await Group.findOne({
      where: {
        name: data.name,
      },
    });
    const isExistingGroupMember = existingGroupMember?.members.some(
      (member) => member.id === ctx.currentUser?.id
    );
    if (existingGroupOwner || isExistingGroupMember) {
      throw new GraphQLError("A group with this name already exists for you");
    }

    // Update the group name
    groupToUpdate.name = data.name;
    await groupToUpdate.save();

    // Return the updated group
    return Group.findOne({
      where: { id },
    });
  }

  /**
   * Mutation resolver for delete the group.
   */
  @Authorized()
  @Mutation(() => String)
  async deleteGroup(
    @Arg("groupId", () => Int) id: number,
    @Ctx() ctx: ContextType
  ) {
    // Check if the current user is logged in
    if (!ctx.currentUser) {
      throw new GraphQLError("you need to be logged in");
    }

    // Find the group with the given ID
    const groupToDelete = await Group.findOne({
      where: { id },
    });

    // Throw an error if the group is not found
    if (!groupToDelete) {
      throw new GraphQLError("Group not found");
    }

    // Check if the current user is the owner of the group
    if (groupToDelete.owner.id !== ctx.currentUser.id) {
      throw new GraphQLError("You are not the owner of this group");
    }

    // Delete the group
    await Group.delete(id);

    return "Group deleted successfully";
  }
}
