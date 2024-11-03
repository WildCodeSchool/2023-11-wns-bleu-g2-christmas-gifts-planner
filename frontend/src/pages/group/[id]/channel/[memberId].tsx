import { ErrorContextProvider } from "@/contexts/ErrorContext";
import {
  MessagesDocument,
  useChannelQuery,
  useCreateDelteLikeMutation,
  useCreateMessageMutation,
  useLikesQuery,
  useMessagesQuery,
  useNewLikeSubscription,
  useNewMessageSubscription,
  useProfileQuery,
} from "@/graphql/generated/schema";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  useColorMode,
} from "@chakra-ui/react";
import { Heart, SendHorizontal } from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Message = () => {
  const [messageInput, setMessageInput] = useState("");
  const { colorMode } = useColorMode();

  const router = useRouter();
  const channelMemberId: any = router.query?.memberId;
  const GroupId: any = router.query.id;

  const { data: getMembers } = useChannelQuery({
    variables: {
      channelId: parseInt(channelMemberId),
      groupId: parseInt(GroupId),
    },
  });
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  let { data: getRatings } = useLikesQuery({
    variables: {
      channelId: parseInt(channelMemberId as string),
      groupId: parseInt(GroupId as string),
    },
  });

  function getTopLikedMessages(likesArray: any[]): any[] {
    const messageLikes: { [key: number]: { content: string; count: number } } =
      {};

    likesArray.forEach((like: any) => {
      const messageId = like.likedMessageId.id;
      const messageContent = like.likedMessageId.content;

      if (!messageLikes[messageId]) {
        messageLikes[messageId] = {
          content: messageContent,
          count: 0,
        };
      }

      messageLikes[messageId].count += 1;
    });

    const topMessages = Object.values(messageLikes).sort(
      (a, b) => b.count - a.count
    );
    return topMessages.slice(0, 3);
  }
  const topLikedMessages = getTopLikedMessages(getRatings?.Likes || []);
  let {
    data: getMessages,
    loading,
    error: messagesErr,
  } = useMessagesQuery({
    variables: {
      channelId: parseInt(channelMemberId as string),
      groupId: parseInt(GroupId as string),
    },
  });
  console.log(messagesErr?.graphQLErrors);
  const [createMessage] = useCreateMessageMutation();
  const [CreateDelteLike] = useCreateDelteLikeMutation();

  const oldMessages = getMessages?.messages || [];
  useNewMessageSubscription({
    variables: {
      channelId: parseInt(channelMemberId, 10),
      groupId: parseInt(GroupId, 10),
    },
    onData: async (newMessage: any) => {
      try {
        const getMessages = client.readQuery({
          query: MessagesDocument,
          variables: {
            channelId: parseInt(channelMemberId, 10),
            groupId: parseInt(GroupId, 10),
          },
        });
        const oldMessages = getMessages?.messages || [];
        const newMsgObj = newMessage.data.data.newMessage;
        console.log("oldMsgObj", oldMessages);

        client.writeQuery({
          query: MessagesDocument,
          data: { messages: [...oldMessages, newMsgObj] },
          variables: {
            channelId: parseInt(channelMemberId, 10),
            groupId: parseInt(GroupId, 10),
          },
        });
        const objDiv = document.getElementById("chatBox");
        if (objDiv) {
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      } catch (error) {
        console.error("Error reading or writing cache:", error);
      }
    },
  });
  useNewLikeSubscription({
    variables: {
      channelId: parseInt(channelMemberId, 10),
      groupId: parseInt(GroupId, 10),
    },

    onData: async (newLike: any) => {
      try {
        const getMessages = client.readQuery({
          query: MessagesDocument,
          variables: {
            channelId: parseInt(channelMemberId, 10),
            groupId: parseInt(GroupId, 10),
          },
        });
        const oldLikes = getMessages?.messages || [];
        const newLikeObj = newLike.data.data;
        client.writeQuery({
          query: MessagesDocument,
          data: { messages: [...oldLikes, newLikeObj] },
          variables: {
            channelId: parseInt(channelMemberId, 10),
            groupId: parseInt(GroupId, 10),
          },
        });
      } catch (error) {
        console.error("Error reading or writing cache:", error);
      }
    },
  });
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    if (formJSON.content === "") {
      return null;
    }

    formJSON.writtenBy = {
      id: parseInt(formJSON.writtenBy, 10),
      firstName: currentUser?.profile.firstName,
      lastName: currentUser?.profile.lastName,
    };
    formJSON.channelId = {
      id: parseInt(channelMemberId, 10),
    };
    formJSON.groupId = {
      id: parseInt(GroupId, 10),
    };
    const res = await createMessage({ variables: { data: formJSON } });

    setMessageInput("");
  };

  const addDeleteLike = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.LikedBy = { id: parseInt(currentUser?.profile.id as string) };
    formJSON.likedMessageId = {
      id: parseInt(formJSON.likedMessageId),
    };
    formJSON.channelId = {
      id: parseInt(channelMemberId, 10),
    };
    formJSON.groupId = {
      id: parseInt(GroupId, 10),
    };
    console.log("formJSON", formJSON);
    const res = await CreateDelteLike({
      variables: { data: formJSON },
    });
  };

  const sortedMessages = [...oldMessages];

  sortedMessages.sort((a, b) => {
    const dateA = a.sent_at ? new Date(a.sent_at).getTime() : 0; // Handle null/undefined
    const dateB = b.sent_at ? new Date(b.sent_at).getTime() : 0;

    return dateA - dateB;
  });
  // in caase that user is not authorized or recive any kind if error in the chat, he will be redirected aoutmaticlly
  if (messagesErr) {
    router.push("/dashboard");
  }
  console.log("messagesErr", messagesErr);
  return (
    <>
      <h1 className="text-center font-extrabold">Top Gifts! 🎁</h1>
      <div className="flex justify-center ">
        <Accordion
          allowToggle
          className="md:w-1/2 bg-primary-lowest text-white "
        >
          {topLikedMessages.map((m, idx) => (
            <AccordionItem key={idx} className="">
              <h2>
                <AccordionButton className="text-center">
                  {idx === 0 ? (
                    <h1 className="flex gap-2 font-bold">
                      Top cadeau! 🥇{m.count}
                      {/* You can include an optional icon or component here */}
                    </h1>
                  ) : idx === 1 ? (
                    <h1 className="flex gap-2 font-bold">
                      Deuxième cadeau 🥈{m.count}
                    </h1>
                  ) : idx === 2 ? (
                    <h1 className="flex gap-2 font-bold">
                      Troisième cadeau 🥉 {m.count}
                    </h1>
                  ) : (
                    <h1 className="flex gap-2 font-bold">
                      Cadeau non défini 🎁
                    </h1> // Fallback for any other value
                  )}

                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Message - {m.content}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className=" flex justify-center ">
        <div className="md:w-1/2">
          <div
            className={
              (colorMode === "light" ? " bg-white" : "bg-dark-surface10") +
              " p-3 h-[60vh] overflow-y-auto"
            }
            id="chatBox"
          >
            {sortedMessages.map((message: any) => (
              <div key={message.id} className="mt-6  ">
                {message.writtenBy.firstName ==
                  currentUser?.profile.firstName &&
                message.writtenBy.lastName == currentUser?.profile.lastName ? (
                  <>
                    <div className="flex justify-end">
                      <form onSubmit={addDeleteLike}>
                        <button
                          type="submit"
                          className=" transition ease-in-out delay-150 text-black hover:-translate-y-1 hover:scale-110  duration-300"
                        >
                          <div className="flex mr-2 mt-3">
                            <input
                              type="hidden"
                              name="likedMessageId"
                              value={parseInt(message.id, 10)}
                            />

                            <h1>
                              {message.likes.length !== 0
                                ? message.likes.length
                                : null}
                            </h1>
                            <Heart
                              className={
                                message.likes.length !== 0
                                  ? "text-red-600"
                                  : colorMode === "light"
                                    ? "text-black"
                                    : "text-white"
                              }
                            />
                          </div>
                        </button>
                      </form>
                      <div
                        key={message.id}
                        className="  bg-primary-lower  px-3   rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl gap-3   "
                      >
                        <p className="text-m font-normal py-2.5 text-white ">
                          {message.content}
                        </p>
                      </div>
                    </div>
                    <p className=" mr-2 text-end  ">{message.sent_at}</p>
                  </>
                ) : (
                  <>
                    <div className="flex justify-start gap-3  items-center">
                      <Avatar
                        className=""
                        title={`${message.writtenBy.firstName} ${message.writtenBy.lastName}`}
                        name={`${message.writtenBy.firstName} ${message.writtenBy.lastName}`}
                        _hover={{
                          cursor: "pointer",
                        }}
                      />
                      <div
                        key={message.id}
                        className={
                          "flex border-solid   p-2   rounded-tl-2xl rounded-tr-2xl rounded-br-2xl  " +
                          (colorMode === "light"
                            ? " bg-zinc-200"
                            : "bg-dark-surface20")
                        }
                      >
                        <p
                          className={
                            "text-m font-normal py-2.5 " +
                            (colorMode === "light"
                              ? " text-gray-900"
                              : "text-white")
                          }
                        >
                          {message.content}
                        </p>
                      </div>
                      <form action="" onSubmit={addDeleteLike}>
                        <button
                          type="submit"
                          className=" transition ease-in-out delay-150 text-black hover:-translate-y-1 hover:scale-110  duration-300"
                        >
                          <input
                            type="hidden"
                            name="likedMessageId"
                            value={parseInt(message.id, 10)}
                          />

                          <div className="flex">
                            <h1>
                              {message.likes.length !== 0
                                ? message.likes.length
                                : null}
                            </h1>
                            <Heart
                              className={
                                message.likes.length !== 0
                                  ? "text-red-600"
                                  : colorMode === "light"
                                    ? "text-black"
                                    : "text-white"
                              }
                            />
                          </div>
                        </button>
                      </form>
                    </div>
                    <p className="ml-16  ">{message.sent_at}</p>
                  </>
                )}
              </div>
            ))}
            <div className=" h-24 text-center "></div>
          </div>

          <form
            onSubmit={sendMessage}
            className="  border-2 border-green-950 rounded-lg relative"
          >
            <input
              name="sent_at"
              type="hidden"
              value={new Date().toLocaleString()}
            />

            <input
              name="writtenBy"
              value={currentUser?.profile.id}
              type="hidden"
              className="bg-slate-100 m-3"
            />
            <input
              placeholder="message..."
              name="content"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button
              type="submit"
              className="text-gray-900 absolute  right-3 bottom-1/4"
            >
              {" "}
              <SendHorizontal
                color={colorMode === "light" ? " black" : "white"}
              />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Message;
