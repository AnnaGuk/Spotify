import { useState } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { auth } from "../../lib/mutations";
import type { AuthProps } from "./types";

const AuthForm = ({ mode }: AuthProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: {
    preventDefault: () => void;
  }): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    await auth({ mode, body: { email, password } });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <Image src="/logo.png" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              color="white"
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              color="white"
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
