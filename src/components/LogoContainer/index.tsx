import { Image, Box, Stack, HStack, Icon, Text, Grid } from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";
import logo from "../../assets/Burguer Kenzie.png";

export const LogoContainer = () => {
  return (
    <>
      <Image src={logo} alt="logo" />
      <Box
        mt="2rem"
        border="2px"
        borderColor="grey.100"
        borderRadius="8px"
        p={["15px"]}
      >
        <HStack spacing={6}>
          <Stack
            h="60px"
            w="60px"
            bg="grey.0"
            borderRadius="8px"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              h="24px"
              w="24px"
              color="primaryPalette.primary"
              as={FiShoppingBag}
            />
          </Stack>
          <Text w="280px" color="grey.300">
            A vida é como um sanduíche, é preciso recheá-la com os melhores
            ingredientes.
          </Text>
        </HStack>
      </Box>
      <Grid templateColumns="repeat(6, 3fr)" gap={6} mt="2rem" w="50%">
        {Array.from({ length: 18 }).map((_, index) => (
          <Box
            borderRadius="10px"
            bg="grey.100"
            h="10.9px"
            w="10.9px"
            key={index}
          />
        ))}
      </Grid>
    </>
  );
};
