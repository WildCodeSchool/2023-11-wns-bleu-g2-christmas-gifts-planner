import {
  MessagesDocument,
  useCreateMessageMutation,
  useMessagesQuery,
  useNewMessageSubscription,
  useProfileQuery,
} from "@/graphql/generated/schema";
import { Avatar, useBoolean } from "@chakra-ui/react";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent, HtmlHTMLAttributes, useRef, useState } from "react";
// const objDiv = document.getElementById("chatBox");

const Message = () => {
  const [flagName, setFlagName] = useBoolean();

  const [messageInput, setMessageInput] = useState("");
  const chatContainerRef = useRef(null);

  const router = useRouter();
  const channelMemberId: any = router.query?.memberId;
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  let { data: getMessages } = useMessagesQuery({
    variables: { channelId: parseInt(channelMemberId as string) },
  });
  const [createMessage] = useCreateMessageMutation();

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

        // console.log("Old Messages from Cache:", oldMessages);

        const newMsgObj = newMessage.data.data.newMessage;

        client.writeQuery({
          query: MessagesDocument,
          data: { messages: [...oldMessages, newMsgObj] },
          variables: {
            channelId: parseInt(channelMemberId, 10),
          },
        });

        // console.log("New message added:", newMsgObj);
        // console.log("scrollHeight", objDiv.scrollHeight);
        // if (objDiv) {
        //   objDiv.scrollTop = objDiv.scrollHeight;
        // }
        // console.log("scrollTop", objDiv.scrollTop);

        // console.log("top", objDiv.scrollHeight);

        const updatedMessages = client.readQuery({ query: MessagesDocument });
        // console.log("Updated Messages from Cache:", updatedMessages?.messages);q
      } catch (error) {
        console.error("Error reading or writing cache:", error);
      }
      // return oldMessages;
    },
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

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

  const sortedMessages = [...oldMessages]; // Create a copy of the array

  sortedMessages.sort((a, b) => {
    const dateA = a.sent_at ? new Date(a.sent_at).getTime() : 0; // Handle null/undefined
    const dateB = b.sent_at ? new Date(b.sent_at).getTime() : 0;

    return dateA - dateB; // Sort by date
  });

  console.log(sortedMessages);
  return (
    <>
      {/* <div className=" flex flex-col   bg-red-600 "> */}
      {/* <div className="  h-[75vh] overflow-y-auto   "> */}
      <div className=" p-3  h-[75vh] overflow-y-auto" id="chatBox">
        {sortedMessages.map((message: any) => (
          <div className="mt-3 ">
            {message.writtenBy.firstName == currentUser?.profile.firstName &&
            message.writtenBy.lastName == currentUser?.profile.lastName ? (
              <>
                <div className="flex justify-end">
                  <div
                    key={message.id}
                    className="  bg-sky-300  px-3   rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl gap-3   "
                  >
                    {/* <Avatar
                      title={`${message.writtenBy.firstName} ${message.writtenBy.lastName}`}
                      name={`${message.writtenBy.firstName} ${message.writtenBy.lastName}`}
                      size="sm"
                      _hover={{
                        cursor: "pointer",
                      }}
                    /> */}
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
                    // className="flex     bg-white  p-3 border-solid border-2 border-green-950 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl gap-3 "
                    className="flex  bg-slate-200  p-2 border-solid border-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl  "
                  >
                    <p className="text-m font-normal py-2.5 text-gray-900 dark:text-white">
                      {message.content}
                    </p>
                  </div>
                </div>
                <p className="ml-16  ">{message.sent_at}</p>
              </>
            )}
            {/* <p className=" text-center mb-5">{message.sent_at}</p> */}
          </div>
        ))}
      </div>
      {/* </div> */}
      <form
        onSubmit={sendMessage}
        className="  border-2 border-green-950 rounded-lg"
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
        <button type="submit" className="text-gray-900 absolute  right-3">
          {" "}
          <SendHorizontal />
        </button>
      </form>
      {/* </div> */}
    </>
  );
};
export default Message;
