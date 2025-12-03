import { useEffect, useState } from "react";
import { getCart, updateCartItem, removeCartItem, checkout } from "../api/cartApi";
import Layout from "./Layout";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const userId = Number(localStorage.getItem("userId"));

  const loadCart = () => {
    if (!userId) return;

    getCart(userId)
      .then((data) => setCart(data))
      .catch(() => alert("Failed to load cart"));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleUpdateQuantity = async (cartItemId: number, newQty: number) => {
    if (newQty < 1) return;

    try {
      await updateCartItem(cartItemId, newQty);
      loadCart();
    } catch {
      alert("Failed to update item");
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      loadCart();
    } catch {
      alert("Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout(userId, cart);
      alert("Order completed!");
      setCart([]);
    } catch {
      alert("Checkout failed");
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  return (
    <Layout>
      <Box sx={{
    width: "100%", minHeight: "100vh", paddingX: 4, paddingY: 2}}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Shopping Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <>
            {cart.map((item) => (
              <Card
                key={item.id}
                sx={{ display: "flex", mb: 2, alignItems: "center" }}
              >
                <CardMedia
                  component="img"
                  image={item.product.image_url}
                  sx={{ width: 140, height: 140, objectFit: "cover" }}
                />

                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{item.product.name}</Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    ${item.product.price} per unit
                  </Typography>

                  {/* כמות */}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>

                    <IconButton
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </CardContent>

                {/* הסרה */}
                <IconButton
                  sx={{ mr: 2 }}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Card>
            ))}

            <Divider sx={{ my: 3 }} />

            {/* סיכום */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Total: ${totalPrice}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
}
