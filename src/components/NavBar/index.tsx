import {
  Button,
  Flex,
  Image,
  HStack,
  VStack,
  Icon,
  Box,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
} from "@chakra-ui/react";
import { Input } from "../Input";
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import logo from "../../assets/Burguer Kenzie.png";
import { useAuth } from "../../contexts/users";
import { useHistory } from "react-router";
import { useCart } from "../../contexts/cart";

export const NavBar = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const { cart, removeFromCart, updateAddInCart, updateSubInCart, fullRemove } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justifyContent="space-between"
      borderBottom="1px"
      borderBottomColor="grey.100"
      w="100vw"
      h="80px"
      bg="grey.100"
    >
      <Image src={logo} alt="logo" h="22px" w="150px" mt="30px" ml="80px" />

      <HStack mr="5rem" spacing={5}>
        <Input
          placeholder="Digitar Pesquisa"
          bg="white"
          borderRadius="8px"
          icon={AiOutlineSearch}
        />
        <Box
          h="20px"
          w="20px"
          bg="primaryPalette.primary"
          position="absolute"
          borderRadius="15px"
          right="120px"
          top="20px"
          color="white"
          textAlign="center"
        >
          {cart.length}
        </Box>
        <Icon
          as={FaShoppingCart}
          color="grey.300"
          h="25px"
          w="25px"
          cursor="pointer"
          onClick={onOpen}
        />
        <Icon
          onClick={() => logout(history)}
          as={MdOutlineLogout}
          color="grey.300"
          h="25px"
          w="25px"
          cursor="pointer"
        />
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="primaryPalette.primary" color="white">
            Carrinho de Compras
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            {cart.length === 0 ? (
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                h="200px"
              >
                <Text as="h3" color="grey.600" fontWeight="bold">
                  Sua sacola está vazia
                </Text>
                <Text>Adicione itens</Text>
              </Flex>
            ) : (
              cart.map((item, index) => (
                <>
                  <HStack w="100%" mt="15px" key={index}>
                    <Box
                      borderRadius="8px"
                      bg="grey.100"
                      h="80px"
                      w="80px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image src={item.image} w="55px" h="55px" />
                    </Box>
                    <VStack w="70%">
                      <Text w="100%" fontWeight="bold" as="h3">
                        {item.title}
                      </Text>
                      <HStack w="100%" spacing={0}>
                        <Box>
                          <Text
                            textAlign="center"
                            w="30px"
                            h="34px"
                            bg="grey.100"
                            color="#EB5757"
                            cursor="pointer"
                            onClick={() => updateSubInCart(item)}
                          >
                            -
                          </Text>
                        </Box>
                        <Box>
                          <Text
                            as="h2"
                            textAlign="center"
                            w="45px"
                            h="34px"
                            border="2px"
                            borderColor="grey.100"
                          >
                            {item.quantity}
                          </Text>
                        </Box>
                        <Box>
                          <Text
                            textAlign="center"
                            w="30px"
                            h="34px"
                            bg="grey.100"
                            color="#EB5757"
                            cursor="pointer"
                            onClick={() => updateAddInCart(item)}
                          >
                            +
                          </Text>
                        </Box>
                      </HStack>
                    </VStack>
                    <Box position="relative" bottom="30px">
                      <Icon
                        color="grey.100"
                        as={FaTrash}
                        cursor="pointer"
                        onClick={() => removeFromCart(item.id)}
                      />
                    </Box>
                  </HStack>
                </>
              ))
            )}
          </ModalBody>
          <Divider />
          <ModalFooter>
            <VStack>
              <HStack spacing="310px">
                <Text as="h2" color="grey.600" fontWeight="bold">
                  Total
                </Text>
                <Text color="grey.300">
                  R$ {""}
                  {cart.reduce((acc, atual) => acc + atual.total, 0)}
                </Text>
              </HStack>
              <Button
                w="100%"
                bg="grey.100"
                color="grey.300"
                _hover={{ bg: "primaryPalette.primary", color: "white" }}
                cursor="pointer"
                onClick={() => fullRemove()}
              >
                Remover Todos
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
