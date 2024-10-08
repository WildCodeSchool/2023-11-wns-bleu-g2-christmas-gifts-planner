import { Arg, Authorized, Ctx, Int, Mutation, Query } from "type-graphql";
import Group from "../entities/Group";
import { ContextType } from "../types/ContextType";
import { GraphQLError } from "graphql";
import { findOrCreateUserByEmail, sendAnEmail } from "../services/userService";
import { AddMembersInputType } from "../types/MemberTypes";
import Channel from "../entities/Channel";
import User from "../entities/User";

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

    for (const member of group.members) {
      const existingChannel = await Channel.findOne({
        where: { name: `${member.lastName} ${member.firstName}'s channel`, group: { id: groupId } },
      });

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
   
    if (!ctx.currentUser) {
      throw new GraphQLError("You need to be logged in");
    }

    // Verify if data contains members
    if (!data.members || data.members.length === 0) {
      throw new GraphQLError("No members provided");
    }

    // Verify if data contains members
    if (!data.members || data.members.length === 0) {
      throw new GraphQLError("No members provided");
    }

    
    const groupToUpdate = await Group.findOne({
      where: { id },
    });

    
    if (!groupToUpdate) {
      throw new GraphQLError("Group not found");
    }

    
    if (groupToUpdate.owner.id !== ctx.currentUser.id) {
      throw new GraphQLError("You are not the owner of this group");
    }

  

    const existingMembersErrors: string[] = [];

    
    if (data.members && data.members.length > 0) {
      for (const memberInput of data.members) {
        const user = await findOrCreateUserByEmail(memberInput.email);
       
        if (groupToUpdate.members.some((member) => member.id === user.id)) {
          existingMembersErrors.push(
            `User with email ${memberInput.email} is already a member`
          );
        }
        
        sendAnEmail(groupToUpdate, user, id);
        
        groupToUpdate.members.push(user);
      }
    }
    if (existingMembersErrors.length > 0) {
      throw new GraphQLError(existingMembersErrors.join(", "));
    }

    await groupToUpdate.save();

    
    return Group.findOne({
      where: { id },
    });
  }
}
