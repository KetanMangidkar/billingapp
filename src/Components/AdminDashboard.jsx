import {
  Box,
  Center,
  Button,
  SimpleGrid,
  Stack,
  Input,
  InputGroup,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  let adminToken = JSON.parse(localStorage.getItem("token")) || "";

  const [data, setData] = useState([]);
  //   console.log(data);

  const [userdata, setuserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  let name, value;
  const handle = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuserData({ ...userdata, [name]: value });
  };

  const displayData = () => {
    axios
      .get("http://localhost:9555/users", {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log({ err: error.message });
      });
  };

  useEffect(() => {
    displayData();
  }, []);

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:9555/users/${e._id}`, {
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        displayData();
        // setData(res.data);
      })
      .catch((error) => {
        console.log({ err: error.message });
      });
  };

  // add user functionality
  const handleSubmit = (e) => {
    console.log(userdata);
    axios
      .post("http://localhost:9555/users/create", userdata)
      .then((r) => {
        alert("add user successfully");
        displayData();
      })
      .catch((err) => {
        console.log({ err: err.message });
      });
  };

  return (
    <div>
      <Box className="topbox">
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel fontFamily={"cursive"}>Name</FormLabel>
            <Input type="text" name="name" onChange={handle} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel fontFamily={"cursive"}>Email address</FormLabel>
            <Input type="email" name="email" onChange={handle} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel fontFamily={"cursive"}>Password</FormLabel>
            <InputGroup>
              <Input type="text" name="password" onChange={handle} />
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              onClick={handleSubmit}
              _hover={{
                bg: "blue.500",
              }}
              fontFamily={"cursive"}
            >
              Add User
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Box className="bottombox">
        <Box>
          {data.map((elem) => {
            return (
              <Box className="boxer">
                <SimpleGrid columns={[2, null, 3]} spacing="40px">
                  <Center>
                    <Box fontSize={"2xl"}>{elem.name}</Box>
                  </Center>
                  <Center>
                    <Box fontSize={"2xl"}>{elem.email}</Box>
                  </Center>
                  <Center>
                    <Box>
                      <Button onClick={() => handleDelete(elem)}>Delete</Button>
                    </Box>
                  </Center>
                </SimpleGrid>
              </Box>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
