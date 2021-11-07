import { useState } from "react";
import { useQuery } from "react-query";

// componetns
import Item from "./Item/item";
import Cart from "./Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCard from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
//styles
import { Wrapper, StyledButton } from "./App.styles";
import { NumericLiteral } from "typescript";

//types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const getProducts = async (): Promise<CartItemType[]> => {
  await delay();
  return await (await fetch("https://fakestoreapi.com/products")).json();
};

const App = () => {
  const [cartIsOPen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItmes] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItmes((prev) => {
      //1. is the item already added in the cart
      const isAlreadyExist = prev.find((item) => item.id === clickedItem.id);

      if (isAlreadyExist) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // first Time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something is Wrong ....</div>;

  return (
    <Wrapper>
      <Drawer
        anchor="right"
        open={cartIsOPen}
        onClose={() => setCartIsOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartIsOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCard />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
