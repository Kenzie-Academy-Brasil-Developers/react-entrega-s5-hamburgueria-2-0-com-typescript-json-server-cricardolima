import { Grid, useToast } from "@chakra-ui/react";
import { Redirect } from "react-router";
import { NavBar } from "../../components/NavBar";
import { ProductsCard } from "../../components/ProductsCard";
import { useProducts } from "../../contexts/products";
export const Dashboard = () => {
  const toast = useToast();

  const {products} = useProducts();

  if (!localStorage.getItem("@KenzieBurguer:token")) {
    toast({
      position: "top",
      title: "Eita!",
      description: "Possua uma conta logada antes de comer",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return <Redirect to="/" />;
  }

  return (
    <>
      <NavBar />
      <Grid
        templateColumns="repeat(4, 2fr)"
        gap={12}
        mt="4rem"
        justifyItems="center"
      >
        {products.map((item, index) => (
          <ProductsCard key={index} item={item as any} />
        ))}
      </Grid>
    </>
  );
};
