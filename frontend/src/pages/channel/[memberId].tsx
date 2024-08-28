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
  console.log(channelMemberId);
  let { data: getMessages } = useMessagesQuery({
    variables: { channelId: parseInt(channelMemberId as string) },
  });
  const [createMessage] = useCreateMessageMutation();

  const oldMessages = getMessages?.messages || [];
  useNewMessageSubscription({
    onData: async (newMessage: any) => {
      const getMessages = await client.readQuery({ query: MessagesDocument });
      const oldMessages = getMessages.messages;
      console.log(oldMessages);

      const newMsgObj = newMessage.data.data.newMessage;

      client.writeQuery({
        query: MessagesDocument,

        data: { messages: [...oldMessages, newMsgObj] },
      });
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

    const res = await createMessage({ variables: { data: formJSON } });
  };

  return (
    <>
      <h1>{channelMemberId}</h1>
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