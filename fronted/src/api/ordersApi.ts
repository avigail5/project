export async function createOrder(userId: number, productId: number, quantity: number = 1) {
      console.log("Adding to cart:", { userId, productId, quantity });

  const response = await fetch(`http://localhost:3000/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  
      user_id: userId,
      items: [{ product_id: productId, quantity }],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to place order');
  }

  return response.json();
}

export async function getOrdersByUser(userId: number) {
  const response = await fetch(`http://localhost:3000/orders/user/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }

  return response.json();
}
