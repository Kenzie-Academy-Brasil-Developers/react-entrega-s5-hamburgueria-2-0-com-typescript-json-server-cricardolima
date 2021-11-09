import { Flex, Grid, Box, Text, VStack, Heading } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Input } from "../../components/Input";

interface LoginData {
    email: string;
    password: string;
}

export const Login = () => {

    const schema = yup.object().shape({
        email: yup.string().email("Email inválido").required("Email obrigatório"),
        password: yup.string().required("Senha obrigatória")
    })

    const { register, handleSubmit, formState: {errors}} = useForm({ resolver: yupResolver(schema)})

    const handleForm = (data: LoginData) => {
        console.log(data)
    }

    return (
        <Flex 
            alignItem="center"
            height="100vh"
        >
            <Flex
                w="100%"
                justifyContent="center"
                alignItems="center"
            >
            <Grid
                onSubmit={handleSubmit(handleForm)}
                as="form"
            >
            <Heading size="md">Login</Heading>
            <VStack mt="6" spacing="5">
            <Box w="100%">
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
            </Box>
            </VStack>
            <VStack mt="4">
            <Box>
            </Box>
            </VStack>
            </Grid>

            </Flex>
        </Flex>
    )
}