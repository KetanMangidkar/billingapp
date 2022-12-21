import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

let login = JSON.parse(localStorage.getItem("login")) || [];
export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  let name, value;

  const handle = (e) => {
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const submit = (e) => {
    console.log(data);
    axios
      .post("http://localhost:9555/login", data)
      .then((r) => {
        console.log(r);
        localStorage.setItem("token", JSON.stringify(r.data.token))
        alert("Login Succesfull");
        navigate("/");
        login.push(JSON.stringify(r.data));
        localStorage.setItem("login", login);
        window.location.reload();
      })
      .catch((err) => {
        console.log({ err: err.message });
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.1000")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack></HStack>
            <FormControl id="email" isRequired>
              <FormLabel fontFamily={"cursive"}>Email address</FormLabel>
              <Input type="email" name="email" onChange={handle} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel fontFamily={"cursive"}>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handle}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                onClick={submit}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"} fontFamily={"cursive"}>
                Not Registered yet?{" "}
                <Link to="/signup">
                  <Text color={"blue"}>Register</Text>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
