import {
  MessagesDocument,
  useCreateMessageMutation,
  useMessagesQuery,
  useNewMessageSubscription,
  useProfileQuery,
  useCreateDelteLikeMutation,
  useNewLikeSubscription,
} from "@/graphql/generated/schema";
import { Avatar, useBoolean } from "@chakra-ui/react";
import { Heart, SendHorizontal } from "lucide-react";
import { useRouter } from "next/router";
import {
  FormEvent,
  HtmlHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
// import { NewLikeType } from "../types/LikeType";

const Message = () => {
  const [flagName, setFlagName] = useBoolean();

  const [messageInput, setMessageInput] = useState("");
  const chatContainerRef = useRef(null);

  const router = useRouter();
  const channelMemberId: any = router.query?.memberId;
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  let { data: getMessages, refetch } = useMessagesQuery({
    variables: { channelId: parseInt(channelMemberId as string) },
  });
  const [createMessage] = useCreateMessageMutation();
  const [CreateDelteLike] = useCreateDelteLikeMutation();

  const oldMessages = getMessages?.messages || [];
  useNewMessageSubscription({
    variables: {
      channelId: parseInt(channelMemberId, 10),
    },
    onData: async (newMessage: any) => {
      try {
        const getMessages = client.readQuery({
          query: MessagesDocument,
          variables: {
            channelId: parseInt(channelMemberId, 10),
          },
        });
        const oldMessages = getMessages?.messages || [];

        const newMsgObj = newMessage.data.data.newMessage;

        client.writeQuery({
          query: MessagesDocument,
          data: { messages: [...oldMessages, newMsgObj] },
          variables: {
            channelId: parseInt(channelMemberId, 10),
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
    },

    onData: async (newLike: any) => {
      console.log("newLike", newLike.data.data);
      // refetch();

      try {
        const oldLikes = getMessages?.messages || [];

        const newLikeObj = newLike.data.data;
        console.log("subscribtion newMsgObj", newLikeObj);
        client.writeQuery({
          query: MessagesDocument,
          data: { messages: [...oldLikes, newLikeObj] },
          variables: {
            channelId: parseInt(channelMemberId, 10),
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
    console.log("ff", formJSON);
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
    const res = await createMessage({ variables: { data: formJSON } });

    setMessageInput("");
  };

  const addDeleteLike = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.LikedBy = { id: parseInt(currentUser?.profile.id, 10) };
    formJSON.likedMessageId = { id: parseInt(formJSON.likedMessageId, 10) };
    formJSON.channelId = { id: parseInt(channelMemberId, 10) };

    // console.log("form json", formJSON);
    // formJSON.channelId = {
    //   id: parseInt(channelMemberId, 10),
    // };
    const res = await CreateDelteLike({
      variables: { data: formJSON },
    });
    // console.log("res", res);
    // setMessageInput("");
  };

  const sortedMessages = [...oldMessages]; // Create a copy of the array

  sortedMessages.sort((a, b) => {
    const dateA = a.sent_at ? new Date(a.sent_at).getTime() : 0; // Handle null/undefined
    const dateB = b.sent_at ? new Date(b.sent_at).getTime() : 0;

    return dateA - dateB; // Sort by date
  });
  // console.log("s.messages", sortedMessages);
  // console.log("sorted messages", sortedMessages);

  return (
    <>
      <div className=" flex justify-center ">
        <div className="md:w-1/2">
          <div className=" p-3 h-[75vh] overflow-y-auto bg-white" id="chatBox">
            {sortedMessages.map((message: any) => (
              <div className="mt-6  ">
                {message.writtenBy.firstName ==
                  currentUser?.profile.firstName &&
                message.writtenBy.lastName == currentUser?.profile.lastName ? (
                  <>
                    <div className="flex justify-end">
                      <form onSubmit={addDeleteLike}>
                        <button
                          type="submit"
                          className=" transition ease-in-out delay-150 text-black hover:-translate-y-1 hover:scale-110  duration-300"
                          // className=" transition ease-in-out delay-150 text-black hover:-translate-y-1 hover:scale-110 hover:text-red-600 duration-300"
                        >
                          <div className="flex mr-2 mt-3">
                            <input
                              type="hidden"
                              name="channelId"
                              value={parseInt(message.channelId, 10)}
                            />
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
                                  : "text-black"
                              }
                            />
                          </div>
                        </button>
                      </form>
                      <div
                        key={message.id}
                        className="  bg-sky-300  px-3   rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl gap-3   "
                      >
                        <p className="text-m font-normal py-2.5 text-gray-900 ">
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
                        className="flex  bg-slate-200  p-2 border-solid border-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl  "
                      >
                        <p className="text-m font-normal py-2.5 text-gray-900 dark:text-white">
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
                            name="channelId"
                            value={parseInt(message.channelId, 10)}
                          />
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
                                  : "text-black"
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
              <SendHorizontal />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Message;
