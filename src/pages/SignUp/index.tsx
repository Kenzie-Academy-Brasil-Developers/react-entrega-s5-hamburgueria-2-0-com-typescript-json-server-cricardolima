import {
  Stack,
  Text,
  Box,
  Button,
  Heading,
  Flex,
  HStack,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../../components/Input";
import { LogoContainer } from "../../components/LogoContainer";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/users";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const history = useHistory()

  const {signIn} = useAuth()

  const schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
    passwordConfirm: yup
      .string()
      .required("Confirmação de senha obrigatória")
      .oneOf([yup.ref("password")], "Senhas diferentes"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleForm = (data: SignUpData) => {
    signIn(data, history);
  };

  const goTo = (path: string) => {
    history.push(path)
  }

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Box mr="8rem" w="500px">
        <LogoContainer />
      </Box>
      <Stack
        w="500px"
        h="600px"
        as="form"
        onSubmit={handleSubmit(handleForm)}
        spacing="4"
        boxSizing="border-box"
        border="2px"
        borderColor="grey.100"
        borderRadius="8px"
        p={["30px", "30px", "30px"]}
      >
        <HStack spacing="230px">
          <Heading as="h3" fontSize="xl">
            Cadastro
          </Heading>
          <Link onClick={() => goTo("/")} fontSize="xs" textDecoration="underline">
            Retornar para o login
          </Link>
        </HStack>
        <Input
          placeholder="Nome"
          label="Nome"
          type="name"
          error={errors.name}
          {...register("name")}
        />
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
        <Input
          placeholder="Confirme a senha"
          label="Confirme a senha"
          type="password"
          error={errors.passwordConfirm}
          {...register("passwordConfirm")}
        />
        <Box>
          <Button
            w="100%"
            bg="grey.100"
            color="grey.300"
            size="lg"
            _hover={{ bgColor: "primaryPalette.primary", color: "grey.0" }}
            type="submit"
          >
            Cadastrar
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
};
