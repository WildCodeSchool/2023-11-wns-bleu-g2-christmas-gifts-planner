import {
  Arg,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import Like from "../entities/Like";
import { NewLikeType } from "../types/LikeType";
import { GraphQLError } from "graphql";
import { In } from "typeorm";

@Resolver(Like)
export default class LikeResolver {
  @Query(() => [Like])
  async Likes(
    @Arg("userId", { nullable: true }) id?: number,
    @Arg("likedMessageId", () => Int, { nullable: true })
    @Arg("channelId", () => Int, { nullable: true })
    likedMessageId?: number,
    LikedBy?: number,
    channelId?: number
  ) {
    return Like.find({
      relations: { likedMessageId: true, LikedBy: true, channelId: true },
      where: {
        likedMessageId: {
          id: likedMessageId,
        },
        LikedBy: {
          id: LikedBy,
        },
        channelId: {
          id: channelId,
        },
      },
    });
  }

  @Mutation(() => Like)
  async createDelteLike(
    @Arg("data") data: NewLikeType,
    @PubSub() pubsub: PubSubEngine
  ) {
    const existingLike = await Like.findOne({
      where: {
        channelId: data.channelId,
        likedMessageId: data.likedMessageId,
        LikedBy: data.LikedBy,
      },
    });
    console.log("data information:", data.likedMessageId.id);
    if (existingLike) {
      await existingLike.remove();
      // throw new GraphQLError(`Like removed`);
      return "like removed";
    }
    const newLike = new Like();
    // newMessage.channelId = data.channelId;
    Object.assign(newLike, data);
    await newLike.save();
    await pubsub.publish(`NewLike_${data.channelId.id}`, newLike);
    // await pubsub.publish(`NewMessage`, newMessage);
    // console.log("data.likedMessageId", data.likedMessageId.id);
    return newLike;
  }

  @Subscription(() => Like, {
    topics: ({ args }) => {
      // console.log(`NewLike_${args.likedMessageId}`);
      return `NewLike_${args.channelId}`;
    },
    // filter: ({ payload, args }) => payload.channelId === args.channelId,
  })
  newLike(
    @Root() newLike: Like,
    @Arg("channelId", () => Int) channelId: number
  ): Like {
    return newLike;
  }
}
