import { Query } from "type-graphql";
import Group from "../entities/Group";

export default class GroupResolver {
  @Query(() => [Group])
  async groups() {
    return Group.find({
      relations: { owner: true },
    });
  }
}
