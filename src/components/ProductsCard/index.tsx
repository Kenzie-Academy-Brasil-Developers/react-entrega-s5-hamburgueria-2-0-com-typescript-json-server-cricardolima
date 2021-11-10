import { Flex, Image, Text, Box, VStack, Button } from "@chakra-ui/react";
import { useCart } from "../../contexts/cart";

interface ProductsData {
  title: string;
  type: string;
  price: number;
  image: string;
  quantity: number;
  userId: number;
  id: number;
}

interface ProductsCardProps {
  item: ProductsData;
}

export const ProductsCard = ({ item }: ProductsCardProps) => {
  const { addToCart } = useCart()

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      borderRadius="8px"
      border="2px"
      borderColor="grey.100"
      _hover={{ borderColor: "primaryPalette.primary" }}
      pb="18px"
    >
      <Box h="150px" w="298px" bg="grey.100" borderRadius="8px">
        <Image src={item.image} alt="title" m="0 auto" />
      </Box>
      <VStack spacing={2} alignItems="flex-start" ml="12px" pt="18px">
        <Text fontSize="lg" color="grey.600">
          {item.title}
        </Text>
        <Text fontSize="sm" color="grey.300">
          {item.type}
        </Text>
        <Text fontSize="md" color="primaryPalette.primary">
          R$ {item.price}
        </Text>
        <Button
          w="106px"
          h="40px"
          color="white"
          bg="grey.100"
          _hover={{ bg: "primaryPalette.primary", color: "white" }}
          onClick={() => addToCart({...item, quantity: 1, total: item.price})}
        >
          Adicionar
        </Button>
      </VStack>
    </Flex>
  );
};
