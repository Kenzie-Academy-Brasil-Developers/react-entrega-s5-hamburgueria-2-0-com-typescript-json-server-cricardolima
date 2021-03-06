import { Stack, Text, Box, Button, Heading, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../../components/Input";
import { LogoContainer } from "../../components/LogoContainer";
import { useAuth } from "../../contexts/users";
import { Redirect, useHistory } from "react-router";

interface LoginData {
  email: string;
  password: string;
}

export const Login = () => {
  const history = useHistory();

  const { login, token } = useAuth();

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleForm = (data: LoginData) => {
    login(data, history);
  };

  const pathTo = (path: string) => {
    history.push(path)
  }

  if (token !== "") {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Stack
        h="520px"
        as="form"
        onSubmit={handleSubmit(handleForm)}
        spacing="4"
        boxSizing="border-box"
        border="2px"
        borderColor="grey.100"
        borderRadius="8px"
        p={["30px", "30px", "30px"]}
      >
        <Heading as="h3" fontSize="xl">
          Login
        </Heading>
        <Input
          placeholder="Email"
          label="Email"
          type="email"
          error={errors.email}
          {...register("email")}
        />
        {!errors.email && (
          <Text ml="1" mt="1" color="gray.300">
            {" "}
            Exemplo: nome@email.com
          </Text>
        )}
        <Input
          placeholder="Senha"
          label="Senha"
          type="password"
          error={errors.password}
          {...register("password")}
        />
        <Box>
          <Button
            w="100%"
            bg="primaryPalette.primary"
            color="grey.0"
            size="lg"
            _hover={{ bgColor: "grey.100", color: "grey.300" }}
            type="submit"
          >
            Logar
          </Button>
          <Text textAlign="center" color="grey.300" mt="1rem">
            {" "}
            Crie sua conta para saborear muitas delícias e matar sua fome!{" "}
          </Text>
          <Button
          onClick={() => pathTo("/signUp")}
            w="100%"
            bg="grey.100"
            color="grey.300"
            size="lg"
            _hover={{ bgColor: "primaryPalette.primary", color: "grey.0" }}
            mt="1rem"
          >
            Cadastrar
          </Button>
        </Box>
      </Stack>
      <Box ml="3rem" w="500px">
        <LogoContainer />
      </Box>
    </Flex>
  );
};
