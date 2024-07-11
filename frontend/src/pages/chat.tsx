import { useCreateMessageMutation , useMessagesQuery, useNewMessageSubscription, useProfileQuery } from "@/graphql/generated/schema";
import { Box, Button, Center, Flex, FormControl, FormLabel, Heading, IconButton, Image, Input, Link, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const Message = () => {

  const {data:getMessages} = useMessagesQuery();
  const queryMessages =  getMessages?.messages || [];

  const [createMessage]= useCreateMessageMutation();
  const {data:chatListener ,error ,loading}= useNewMessageSubscription();
  const chatMessages:any =  chatListener?.newMessage || [];
  // console.log(chatListener|| 'error = '+error|| 'loading = ' + loading);
  console.log( chatMessages?.content);
//   const chatMessages = readMessages? [];
//   const { data } = useRecentAdsQuery();


const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });
// console.log(currentUser);




const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    // formJSON.price = parseFloat(formJSON.price);
    formJSON.writtenBy = {id: parseInt(formJSON.writtenBy, 10) };
    
    // formJSON.writtenBy = selectedTags.map((t) => ({ id: t.id }));
    // formJSO
    const res = await createMessage({variables: {data: formJSON}})
    // formJSON
    // console.log(formJSON);
        // console.log(res);

  };
 
 
  // const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  // const handleDateTimeChange = () => {
  //   setDateTime(new Date().toLocaleString());
  // };

  return (
    <>
    <div className="flex justify-center flex-col mt-5">

      <div className="   ">
          { <div className="flex flex-col h-screen bg-gray-100">
            <div className=" p-4 overflow-y-auto">
              {queryMessages?.map((message) => (
                <div
                  key={message.id}
                  className={`flex  'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-xs p-4 rounded-lg  'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                  >
                    <p className="font-semibold">{message.content}</p>
                    
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