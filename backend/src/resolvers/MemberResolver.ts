import { Arg, Authorized, Ctx, Int, Mutation } from "type-graphql";
import Group from "../entities/Group";
import { ContextType } from "../types/ContextType";
import { GraphQLError } from "graphql";
import { findOrCreateUserByEmail, sendAnEmail } from "../services/userService";
import { AddMembersInputType } from "../types/MemberTypes";

/**
 * Resolver class for handling member-related operations.
 */
export default class MemberResolver {
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

    
    const groupToUpdate = await Group.findOne({
      where: { id },
    });

    
    if (!groupToUpdate) {
      throw new GraphQLError("Group not found");
    }

    
    if (groupToUpdate.owner.id !== ctx.currentUser.id) {
      throw new GraphQLError("You are not the owner of this group");
    }

    
    if (data.members && data.members.length > 0) {
      for (const memberInput of data.members) {
        const user = await findOrCreateUserByEmail(memberInput.email);
       
        if (groupToUpdate.members.some((member) => member.id === user.id)) {
          throw new GraphQLError(
            `User with email ${memberInput.email} is already a member`
          );
        }
        
        sendAnEmail(groupToUpdate, user, id);
        
        groupToUpdate.members.push(user);
      }
    }

    await groupToUpdate.save();

    
    return Group.findOne({
      where: { id },
    });
  }
}
