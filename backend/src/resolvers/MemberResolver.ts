import { Arg, Authorized, Ctx, Mutation } from "type-graphql";
import Group from "../entities/Group";
import { ContextType } from "../types/ContextType";
import { GraphQLError } from "graphql";
import { UpdateGroupInputType } from "../types/UpdateGroupInputType";
import { findUserByEmail } from "../services/userService";

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
    @Arg("groupId") groupId: number,
    @Arg("data") data: UpdateGroupInputType,
    @Ctx() ctx: ContextType
  ) {
    // Check if the current user is logged in
    if (!ctx.currentUser) {
      throw new GraphQLError("You need to be logged in");
    }

    // Find the group with the given ID
    const group = await Group.findOne({
      where: { id: groupId },
      relations: { owner: true, members: true },
    });

    // Throw an error if the group is not found
    if (!group) {
      throw new GraphQLError("Group not found");
    }

    // Check if the current user is the owner of the group
    if (group.owner.id !== ctx.currentUser.id) {
      throw new GraphQLError("You are not the owner of this group");
    }

    // Validate emails and fetch users
    if (data.members && data.members.length > 0) {
      const members = [];
      for (const email of data.members) {
        const user = await findUserByEmail(email);
        if (!user) {
          throw new GraphQLError(`User with email ${email} not found`);
        }
        members.push(user);
      }
      group.members = members; // Add the members to the group
    }

    await group.save();

    // Return the updated group
    return group;
  }
}
