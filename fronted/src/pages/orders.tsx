import { useEffect, useState } from "react";
import { getOrdersByUser, getAllOrders } from "../api/ordersApi";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

export default function OrdersPage() {
  const [Order, setOrder] = useState<any[]>([]);
  const userId = Number(localStorage.getItem("userId"));
  const isAdmin = localStorage.getItem("is_admin") === "true";

  const loadOrder = () => {
    if (!userId) return;

    if (isAdmin) {
      getAllOrders()
        .then((data) => setOrder(data))
        .catch(() => alert("Failed to load all orders"));
    } else {
      getOrdersByUser(userId)
        .then((data) => setOrder(data))
        .catch(() => alert("Failed to load user orders"));
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <>
      <Box sx={{ background: "#6acced", width: "100%", minHeight: "100vh", paddingX: 4, paddingY: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Orders History
        </Typography>

        {Order.length === 0 ? (
          <Typography>Your Order History is empty.</Typography>
        ) : (
          <>
            {Order.map((order) => {
              const totalItems = order.items?.reduce(
                (sum: any, item: any) => sum + item.quantity,
                0
              );

              return (
                <Card
                  key={order.id}
                  sx={{
                    background: "#0e7ad4",
                    paddingTop: "80px",
                    flexDirection: "column",
                    width: "90%",
                    alignItems: "right",
                    mb: 2,
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Order #{order.id}
                    </Typography>

                    <Typography sx={{ color: "white" }}>
                      User ID: {order.user?.id}
                    </Typography>

                    <Typography sx={{ color: "white" }}>
                      Status: {order.status}
                    </Typography>

                    <Typography sx={{ color: "white" }}>
                      Created at: {order.createdAt}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="h6">
                      ${order.total_price}
                    </Typography>

                    <Typography sx={{ color: "white" }}>
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
