import { getProviders, signIn, ClientSafeProvider } from "next-auth/client";
import {
  Button,
  Center,
  Stack,
  Text,
  Heading,
  Link,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { SiFacebook } from "react-icons/si";
import { GetServerSideProps } from "next";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

interface props {
  providers: Record<string, ClientSafeProvider>;
}

const IconMap = {
  google: <FcGoogle />,
  facebook: <SiFacebook />,
  github: <BsGithub />,
};

export default function SignIn({ providers }: props) {
  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
            {Object.values(providers).map(({ id, name }) => {
              let Icon;
              if (id === "google") Icon = IconMap["google"];
              if (id === "github") Icon = IconMap["github"];
              if (id === "facebook") Icon = IconMap["facebook"];

              return (
                <Button
                  key={name}
                  w={240}
                  variant="outline"
                  colorScheme={id}
                  leftIcon={Icon}
                  onClick={() => signIn(id, { callbackUrl: "localhost:3000" })}
                >
                  <Center>
                    <Text>Sign in with {name}</Text>
                  </Center>
                </Button>
              );
            })}
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
