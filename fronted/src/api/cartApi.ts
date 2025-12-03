export async function addToCart(userId: number, productId: number, quantity: number = 1) {
      console.log("Adding to cart:", { userId, productId, quantity });

  const response = await fetch(`http://localhost:3000/cart/add/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to add to cart');
  }

  return response.json();
}

export async function getCart(userId: number) {
  const response = await fetch(`http://localhost:3000/cart/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }

  return response.json();
}

export async function updateCartItem(cartItemId: number, quantity: number) {
  const response = await fetch(`http://localhost:3000/cart/item/${cartItemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to update cart item');
  }

  return response.json();
}

export async function removeCartItem(cartItemId: number) {
  const response = await fetch(`http://localhost:3000/cart/item/${cartItemId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to remove cart item');
  }

  return response.json();
}

export async function checkout(userId: number, cartItems: any[]) {
  const items = cartItems.map(item => ({
    product_id: item.product.id,
    quantity: item.quantity,
  }));

  const response = await fetch(`http://localhost:3000/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      items,
    }),
  });

  if (!response.ok) throw new Error("Failed to place order");
  return response.json();
}
