import { useEffect, useState } from "react";
import { getOrdersByUser, createOrder } from "../api/ordersApi";
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

export default function OrdersPage() {
  const [Order, setOrder] = useState<any[]>([]);
  const userId = Number(localStorage.getItem("userId"));

  const loadOrder = () => {
    if (!userId) return;

    getOrdersByUser(userId)
      .then((data) => setOrder(data))
      .catch(() => alert("Failed to load Order"));
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <>
      <Box sx={{
    width: "100%", minHeight: "100vh", paddingX: 4, paddingY: 2}}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Orders History
        </Typography>

        {Order.length === 0 ? (
          <Typography>Your Order History is empty.</Typography>
        ) : (
          <>
          {Order.map((order) => {
  const totalItems = order.items.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );

  return (
    <Card
      key={order.id}
      sx={{ mb: 2, p: 2, display: "flex", justifyContent: "space-between" }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Order #{order.id}
        </Typography>

        <Typography sx={{ color: "gray" }}>
          Status: {order.status || "Pending"}
        </Typography>

        <Typography sx={{ color: "gray" }}>
          created at: {order.createdAt || "Pending"}
        </Typography>
      </Box>

      <Box sx={{ textAlign: "right" }}>
        <Typography variant="h6">
          ${order.total_price}
        </Typography>

        <Typography sx={{ color: "gray" }}>
          {totalItems} items
        </Typography>
      </Box>
    </Card>
  );
})}
            <Divider sx={{ my: 3 }} />
          </>
        )}
      </Box>
    </>
  );
}
