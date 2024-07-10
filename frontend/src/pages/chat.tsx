import { useCreateMessageMutation , useNewMessageSubscription, useProfileQuery } from "@/graphql/generated/schema";
import { Box, Button, Center, Flex, FormControl, FormLabel, Heading, IconButton, Image, Input, Link, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const Message = () => {

  const [createMessage]= useCreateMessageMutation();
  const {data:chatListener ,error}= useNewMessageSubscription();
  const chatMessages =  chatListener?.newMessage || [];
//   const chatMessages = readMessages? [];
//   const { data } = useRecentAdsQuery();

const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });
// console.log(error);
// console.log(chatMessages || error);




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
    // console.log(formJSON.writtenBy);
        console.log(res);

  };
 
 
  // const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  // const handleDateTimeChange = () => {
  //   setDateTime(new Date().toLocaleString());
  // };

  return (
    <>
    <form onSubmit={sendMessage}  className="m-3">
    <input
    name="sent_at"
          type="hidden"
          value={new Date().toLocaleString()}
        />

        <input name="writtenBy" value={currentUser?.profile.id} type="hidden" className="bg-slate-100 m-3"/>
        <input  name="content" type="text" className="bg-slate-100 m-3"/>
        <button type="submit" className="bg-lime-200">send</button>
    </form>
<ul>
    
</ul>
    </>
);
}
export default Message;