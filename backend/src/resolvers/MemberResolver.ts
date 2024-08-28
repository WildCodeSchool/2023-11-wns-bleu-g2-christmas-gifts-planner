import { Arg, Authorized, Ctx, Int, Mutation, Query } from "type-graphql";
import Group from "../entities/Group";
import { ContextType } from "../types/ContextType";
import { GraphQLError } from "graphql";
import { findOrCreateUserByEmail, sendAnEmail } from "../services/userService";
import { AddMembersInputType } from "../types/MemberTypes";
import Channel from "../entities/Channel";

/**
 * Resolver class for handling member-related operations.
 */
export default class MemberResolver {

  @Authorized()
  @Query(() => [User])
  async getMembersByGroupId(
    @Arg("groupId") groupId: number,
    @Ctx() ctx: ContextType
  ) {
    // Check if the current user is logged in
    if (!ctx.currentUser) {
      throw new GraphQLError("You need to be logged in");
    }

    // Find the group with the given ID and load its members
    const group = await Group.findOne({
      where: { id: groupId },
      relations: { members: true },
    });

    // Throw an error if the group is not found
    if (!group) {
      throw new GraphQLError("Group not found");
    }

    // Iterate over the members and create a channel for each member
    for (const member of group.members) {
      // Check if a channel already exists for this member in this group
      const existingChannel = await Channel.findOne({
        where: { name: `${member.lastName} ${member.firstName}'s channel`, group: { id: groupId } },
      });

      // If the channel doesn't exist, create a new one
      if (!existingChannel) {
        const channel = new Channel();
        Object.assign(channel, {
          name: `${member.lastName} ${member.firstName}'s channel`,
          group: group,
        });
        await channel.save();
      }
    }

    // Return the list of members
    return group.members;
  }

  /**
   * Adds a member to a group.
   */
  @Authorized()
  @Mutation(() => Group)
  async addMemberToGroup(
    @Arg("groupId", () => Int) id: number,
    @Arg("data", { validate: true }) data: AddMembersInputType,
    @Ctx() ctx: ContextType
  ) {
    // Check if the current user is logged in
    if (!ctx.currentUser) {
      throw new GraphQLError("You need to be logged in");
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

    // Validate emails and fetch users
    if (data.members && data.members.length > 0) {
      for (const memberInput of data.members) {
        const user = await findOrCreateUserByEmail(memberInput.email);
        // Check if the user is already a member of the group
        if (groupToUpdate.members.some((member) => member.id === user.id)) {
          throw new GraphQLError(
            `User with email ${memberInput.email} is already a member`
          );
        }
        // Send an email to the user informing them that they have been added to a group.
        sendAnEmail(groupToUpdate, user, id);
        // Add the user to the group
        groupToUpdate.members.push(user);
      }
    }

    await groupToUpdate.save();

    // Return the updated group
    return Group.findOne({
      where: { id },
    });
  }
}
