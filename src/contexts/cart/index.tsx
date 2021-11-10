import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToast } from "@chakra-ui/react";
import api from "../../services/api";
import { useAuth } from "../users";

interface CartProps {
  children: ReactNode;
}

interface CartProductData {
  title: string;
  type: string;
  price: number;
  image: string;
  quantity: number;
  userId: number;
  id: number;
  total: number;
}

interface CartProviderData {
  cart: CartProductData[];
  addToCart: (product: CartProductData) => void;
  removeFromCart: (id: number) => void;
  updateAddInCart: (item: CartProductData) => void;
  updateSubInCart: (item: CartProductData) => void;
  fullRemove: () => void;
}

export const CartContext = createContext<CartProviderData>(
  {} as CartProviderData
);

export const CartProvider = ({ children }: CartProps) => {
  const toast = useToast();
  const { userId, token } = useAuth();
  const [cart, setCart] = useState<CartProductData[]>([] as CartProductData[]);

  const getCart = useCallback(() => {
    api
      .get(`cart/?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setCart(resp.data);
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line
  }, [userId]);

  const addToCart = (product: CartProductData) => {
    const input = { ...product, userId: userId };
    if (cart.every((item) => item.id !== product.id)) {
      api
        .post("/cart", input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          getCart();
          toast({
            position: "top",
            description: "Produto adicionado com sucesso",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => console.log(err));
    } else {
      toast({
        position: "top",
        description: "Produto já adicionado",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const removeFromCart = (id: number) => {
    api
      .delete(`cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        getCart();
        toast({
          position: "top",
          description: "Produto removido com sucesso",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((e) => console.log(e));
  };

  const updateAddInCart = (item: CartProductData) => {
    api
      .patch(
        `cart/${item.id}`,
        { quantity: item.quantity + 1, total: item.total + item.price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        getCart();
      })
      .catch((e) => console.log(e));
  };

  const updateSubInCart = (item: CartProductData) => {
    if (item.quantity > 1) {
      api
        .patch(
          `cart/${item.id}`,
          { quantity: item.quantity - 1, total: item.total - item.price },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((resp) => {
          getCart();
        })
        .catch((e) => console.log(e));
    } else {
      removeFromCart(item.id)
    }
  };

  const fullRemove = () => {
    cart.map( async (item) => {
      await api
        .delete(`cart/${item.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          getCart()
        })
        .catch(e => console.log(e))
    })
    toast({
      position: "top",
      description: "Produtos removidos com sucesso",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  }

  useEffect(() => {
    getCart();
  }, [getCart]);

  console.log(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateAddInCart,
        updateSubInCart,
        fullRemove
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
