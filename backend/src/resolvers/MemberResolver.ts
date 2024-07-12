import { Arg, Authorized, Ctx, Mutation } from "type-graphql";
import Group from "../entities/Group";
import { ContextType } from "../types/ContextType";
import { GraphQLError } from "graphql";
import User from "../entities/User";

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
    @Arg("userId") userId: number,
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

    // Find the user with the given ID
    const user = await User.findOneBy({ id: userId });

    // Throw an error if the user is not found
    if (!user) {
      throw new GraphQLError("User not found");
    }

    // Add the user to the group's members list and save the changes to the database
    group.members.push(user);
    await group.save();

    // Return the updated group
    return group;
  }
}
