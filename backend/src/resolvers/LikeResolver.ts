import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import Like from "../entities/Like";
import { NewLikeType } from "../types/LikeType";
import { GraphQLError } from "graphql";

@Resolver(Like)
export default class LikeResolver {
  @Query(() => [Like])
  async Likes(
    @Arg("userId", { nullable: true }) id?: number,
    @Arg("messageId", () => Int, { nullable: true }) likedMessageId?: number
  ) {
    return Like.find({
      relations: { likedMessageId: true, LikedBy: true },
      where: {
        likedMessageId: {
          id: likedMessageId,
        },
        LikedBy: {
          id: id,
        },
      },
    });
  }

  @Query(() => [Like])
  async AllLikes() {
    return Like.find();
  }

  @Mutation(() => Like)
  async createDelteLike(
    @Arg("data") data: NewLikeType
    // @PubSub() pubsub: PubSubEngine
  ) {
    const existingLike = await Like.findOne({
      where: {
        likedMessageId: data.likedMessageId,
        LikedBy: data.LikedBy,
      },
    });
    console.log("data information:", data.likedMessageId);
    if (existingLike) {
      await existingLike.remove();
      // throw new GraphQLError(`Like removed`);
      return "like removed";
    }
    const newLike = new Like();
    // newMessage.channelId = data.channelId;
    Object.assign(newLike, data);
    await newLike.save();
    // await pubsub.publish(`NewMessage_${data.channelId.id}`, newMessage);
    // await pubsub.publish(`NewMessage`, newMessage);

    return newLike;
  }

  // @Subscription(() => Like, {
  //   topics: ({ args }) => {
  //     console.log(`NewMessage_${args.channelId}`);
  //     return `NewMessage_${args.channelId}`;
  //   },
  //   // filter: ({ payload, args }) => payload.channelId === args.channelId,
  // })
  // newMessage(
  //   @Root() newMessagePayload: Like,
  //   @Arg("channelId", () => Int) channelId: number
  // ): Like {
  //   return newMessagePayload;
  // }
}
