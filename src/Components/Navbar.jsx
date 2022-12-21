import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Center,
  VStack,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  let userData = JSON.parse(localStorage.getItem("login")) || [];
  //   console.log(userData);

  const handledelete = () => {
    localStorage.removeItem("login");
    window.location.reload();
    navigate("/");
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"80%"}
          margin="auto"
        >
          <Link to="/">
            <Box>
              <Heading as="h5" size="sm" marginTop={"4px"}>
                Recovero
              </Heading>
            </Box>
          </Link>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={4}>
              <Link to="/billing">
                <Heading as="h5" size="sm" marginTop={"4px"}>
                  Billing
                </Heading>
              </Link>
              <Link to="/dashboard">
                <Heading as="h5" size="sm" marginTop={"4px"}>
                  Dashboard
                </Heading>
              </Link>
              <Link to={userData.length === 0 ? "/login" : "/"}></Link>

              <Menu>
                <MenuButton
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <BsFillPersonFill size="25px" />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <Center>
                    {userData.length !== 0 ? (
                      <>
                        {userData.user.role === "admin" ? (
                          <Link to="/admindashboard">
                            <Heading as="h2" size="sm" marginTop={"4px"}>
                              Admin Dashboard
                            </Heading>
                          </Link>
                        ) : (
                          <>
                            <VStack>
                              <h2>Welcome, {userData.user.firstname}</h2>
                              <br />
                              <Link to="/">go to home</Link>
                            </VStack>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </Center>
                  <br />
                  <MenuDivider />
                  {userData.length === 0 ? (
                    <Link to="/login">
                      <MenuItem>Login</MenuItem>
                    </Link>
                  ) : (
                    <Button onClick={handledelete}>Logout</Button>
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
