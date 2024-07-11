import { NewMessageInputType, useCreateMessageMutation , useMessagesQuery, useNewMessageSubscription, useProfileQuery } from "@/graphql/generated/schema";
import { Box, Button, Center, Flex, FormControl, FormLabel, Heading, IconButton, Image, Input, Link, Text } from "@chakra-ui/react";
import { ArrowLeft, Target, Variable } from "lucide-react";
import { useRouter } from "next/router";
import { object } from "prop-types";
import { FormEvent, useEffect, useState } from "react";

const Message = () => {

  const {data:getMessages,refetch} = useMessagesQuery();
  // const queryMessages =  getMessages?.messages || [];
  // console.log(getMessages);
 
  const [createMessage]= useCreateMessageMutation();
  
  const {data:chatListener ,error ,loading}= useNewMessageSubscription({onData:(newMessage:any)=>{
    console.log(newMessage.data.data.newMessage);
    refetch();
    // return  newMessage.data.data.newMessage;
    // Object.assign(Target:getMessages,newMessage.data.data.newMessage)
    
  }});
  const chatMessage =  chatListener?.newMessage || [];


const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });




const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    // formJSON.price = parseFloat(formJSON.price);
    formJSON.writtenBy = {id: parseInt(formJSON.writtenBy, 10) };
    
    // formJSON.writtenBy = selectedTags.map((t) => ({ id: t.id }));
    // formJSO
    const res = await createMessage({variables: {data: formJSON}});
    // refetch();

    // formJSON
    // console.log(formJSON);
        // console.log(res);

  };
 
 
  // const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  // const handleDateTimeChange = () => {
  //   setDateTime(new Date().toLocaleString());
  // };
// console.log(messages);
const allMessages = getMessages?.messages || [];
  return (
    <>
    <div className="flex justify-center flex-col mt-5">

      <div className="   ">
          { <div className="flex flex-col h-screen bg-gray-100">
            <div className=" p-4 overflow-y-auto">
              {allMessages.map((message:any) => (
                <div
                  key={message.id}
                  className={`flex  'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-xs p-4 rounded-lg  'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                  >
                    <p className="font-semibold">{  message.writtenBy.firstName+': ' +  message.content}</p>
                    
                    {/* <p className="text-xs mt-1">{format(new Date(message.sent_at), 'p, MMM dd')}</p> */}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage}   className="p-4 border-t border-gray-200">
              <input
              name="sent_at"
                    type="hidden"
                    value={new Date().toLocaleString()}
              />

                <input name="writtenBy" value={currentUser?.profile.id} type="hidden" className="bg-slate-100 m-3"/>
                <input  
                placeholder="Type your message..."
                 name="content" 
                 type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>
                <button type="submit" className="bg-lime-200">send</button>
            </form>
            </div> }




      </div>
            {/* <form onSubmit={sendMessage}  className="p-4 border-t border-gray-200">
              <input
              name="sent_at"
                    type="hidden"
                    value={new Date().toLocaleString()}
              />

                <input name="writtenBy" value={currentUser?.profile.id} type="hidden" className="bg-slate-100 m-3"/>
                <input  
                 name="content" 
                 type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>
                <button type="submit" className="bg-lime-200">send</button>
            </form> */}
    </div>

    </>
);
}
export default Message;