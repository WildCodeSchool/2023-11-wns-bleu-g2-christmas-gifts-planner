import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import Group from "../entities/Group";
import { NewGroupInputType } from "../types/NewGroupInputType";
import { ContextType } from "../types/ContextType";
import { GraphQLError } from "graphql";
import { findUserByEmail } from "../services/userService";
import Channel from "../entities/Channel";
import User from "../entities/User";

/**
 * Resolver class for handling group-related operations.
 */
export default class GroupResolver {
  /**
   * Query resolver for fetching all groups.
   */
  @Query(() => [Group])
  async groups() {
    return Group.find({
      relations: { owner: true, members: true },
    });
  }

   /**
   * Query resolver for fetching one group.
   */

  @Query(() => Group)
  async group(@Arg("id") id: number) {
    return Group.findOne({
      where: { id },
      relations: { owner: true, members: true },
    });
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
      relations: { members: true },
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
        const user = await findUserByEmail(email);
        // if (!user) {
        //   throw new GraphQLError(`User with email ${email} not found`);
        // }
        members.push(user);
        newGroup.members = members.filter(member => member !== null) as User[]; // Add the members to the group
        const channel = new Channel();
      Object.assign(channel, {
        name: `${user?.lastName} ${user?.firstName}'s channel`,
        group: newGroup,
      });
      console.log(channel);
      
      await channel.save();
      }
  
  
    }

    // Save the new group to the database and return it
    const { id } = await newGroup.save();
    return Group.findOne({
      where: { id },
      relations: { owner: true, members: true },
    });
  }
}
