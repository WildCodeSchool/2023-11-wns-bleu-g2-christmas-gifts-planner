import {
  MessagesDocument,
  useCreateMessageMutation,
  useMessagesQuery,
  useNewMessageSubscription,
  useProfileQuery,
} from "@/graphql/generated/schema";
import { Avatar } from "@chakra-ui/react";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const Message = () => {
  const router = useRouter();
  const channelMemberId: any = router.query?.memberId;
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });
  let { data: getMessages } = useMessagesQuery({
    variables: { channelId: parseInt(channelMemberId as string) },
  });
  const [createMessage] = useCreateMessageMutation();
  console.log("native getmessages", getMessages?.messages);
  // const oldMessages = getMessages?.messages || [];
  //working function to recive the data
  // const { data, loading, error }: any = useNewMessageSubscription({
  //   variables: {
  //     channelId: parseInt(channelMemberId, 10), // Converts to an integer
  //   },
  // });
  // console.log(data || loading);

  // useNewMessageSubscription({
  //   variables: {
  //     channelId: parseInt(channelMemberId, 10), // Converts to an integer
  //   },
  //   onData: async (newMessage: any) => {
  //     const getMessages = await client.readQuery({ query: MessagesDocument });
  //     const oldMessages = getMessages.messages;
  //     // console.log(oldMessages);

  //     const newMsgObj = newMessage.data.data.newMessage;

  //     client.writeQuery({
  //       query: MessagesDocument,

  //       data: { messages: [...oldMessages, newMsgObj] },
  //     });
  //     console.log(newMsgObj);
  //   },
  // });

  const oldMessages = getMessages?.messages || [];

  useNewMessageSubscription({
    variables: {
      channelId: parseInt(channelMemberId, 10),
    },
    onData: async (newMessage: any) => {
      try {
        // Read the current messages from the Apollo cache
        const getMessages = client.readQuery({
          query: MessagesDocument,
          variables: {
            channelId: parseInt(channelMemberId, 10),
          },
        });
        const oldMessages = getMessages?.messages || []; // Ensure default is an empty array

        console.log("Old Messages from Cache:", oldMessages); // Debugging line

        // Extract the new message from the subscription
        const newMsgObj = newMessage.data.data.newMessage;

        // Write the updated list (old + new message) back to the cache
        client.writeQuery({
          query: MessagesDocument,
          data: { messages: [...oldMessages, newMsgObj] },
          variables: {
            channelId: parseInt(channelMemberId, 10),
          },
        });

        console.log("New message added:", newMsgObj);

        // Confirm the cache update
        const updatedMessages = client.readQuery({ query: MessagesDocument });
        console.log("Updated Messages from Cache:", updatedMessages?.messages);
      } catch (error) {
        console.error("Error reading or writing cache:", error);
      }
      return oldMessages;
    },
  });
  // console.log("old messages", oldMessages);

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
  };

  return (
    <>
      <div className="flex  just flex-col">
        <div className="  h-[75vh] overflow-y-auto">
          <div className=" p-4 ">
            {oldMessages.map((message: any) => (
              <div
                key={message.id}
                className="flex   'justify-start' mb-4 bg-white  p-3 border-solid border-2 border-green-950 rounded-lg gap-3"
              >
                <Avatar
                  name={`${message.writtenBy.firstName} ${message.writtenBy.lastName}`}
                  // src='https://bit.ly/dan-abramov'
                  size="sm"
                  _hover={{
                    cursor: "pointer",
                  }}
                />
                {/* <p className="font-semibold">{ ' firstName:'+ message.writtenBy.firstName +' lastname:'+message.writtenBy.lastName}</p> */}

                <p className="font-semibold">{message.content}</p>
                {/* <p className="text-xs mt-1">{message.sent_at}</p> */}
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={sendMessage} className="  mt-4 ">
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
          />
          <button
            type="submit"
            className="text-gray-900 absolute  right-5 mt-2"
          >
            {" "}
            <SendHorizontal />
          </button>
        </form>
      </div>
    </>
  );
};
export default Message;
