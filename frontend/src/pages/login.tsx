import { useLoginMutation } from "@/graphql/generated/schema";
import { Button, Card, Center, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

import { FormEvent, useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const [error, setError] = useState("");
  const [login]= useLoginMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    try {
      const res = await login({ variables: { data: formJSON } });
      console.log({ res });
    } catch (e: any) {
     setError(`une erreur est survenue: ${e}`);
    }
  };

  return (
    <>
      <Center>
        <Card>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Adresse email</FormLabel>
              <Input isRequired placeholder="Enter your email" autoComplete="" type="email" id="email" name="email"/>

              <FormLabel>Mot de passe</FormLabel>
               <InputGroup size='md'>
                <Input
                  name="password" id="password" isRequired
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            <Button type="submit">
              Se connecter
            </Button>
            </FormControl>
          </form>
        </Card>
      </Center>
    </>
);
}
export default Login;