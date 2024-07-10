import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import Group from "../entities/Group";
import { NewGroupInputType } from "../types/NewGroupInputType";
import { ContextType } from "../types/ContextType";
import { GraphQLError } from "graphql";

export default class GroupResolver {
  @Query(() => [Group])
  async groups() {
    return Group.find({
      relations: { owner: true },
    });
  }

  @Authorized()
  @Mutation(() => Group)
  async createGroup(
    @Arg("data", { validate: true }) data: NewGroupInputType,
    @Ctx() ctx: ContextType
  ) {
    if (!ctx.currentUser) return new GraphQLError("you need to be logged in");
    const newGroup = new Group();
    Object.assign(newGroup, data);
    newGroup.owner = ctx.currentUser;
    const { id } = await newGroup.save();
    return Group.findOne({
      where: { id },
      relations: { owner: true },
    });
  }
}
