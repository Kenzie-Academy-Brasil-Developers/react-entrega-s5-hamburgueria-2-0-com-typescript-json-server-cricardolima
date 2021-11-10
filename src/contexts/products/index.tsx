import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import api from "../../services/api";

interface ProductsProps {
  children: ReactNode;
}

interface ProductsData {
  id: number;
  image: string;
  title: string;
  category: string;
  price: number;
}

interface ProductsContextData {
  products: ProductsData[];
  filteredProducts: ProductsData[];
  searchProducts: (str: string) => void;
}
const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export const ProductsProvider = ({ children }: ProductsProps) => {
  const [products, setProducts] = useState<ProductsData[]>(
    [] as ProductsData[]
  );
  const [filteredProducts, setFilteredProducts] = useState<ProductsData[]>(
    [] as ProductsData[]
  );

  useEffect(() => {
    api
      .get("products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const searchProducts = (str: string) => {
    const output = products.filter((item) =>
      item.title.toLowerCase().includes(str.toLowerCase())
    );
    if (output.length) {
      setFilteredProducts(output);
    }
  };

  return (
    <ProductsContext.Provider
      value={{ products, filteredProducts, searchProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
