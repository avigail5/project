export async function getAllProducts() {
  const response = await fetch('http://localhost:3000/products');
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

export async function getProductById(productId: number) {
  const response = await fetch(`http://localhost:3000/products/${productId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return response.json();
}

export async function createProduct(data: FormData) {

  const response = await fetch(`http://localhost:3000/products/create`, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) throw new Error("Failed to add product");
  return response.json();
}

export async function deleteProduct(productId: number) {

  const response = await fetch(`http://localhost:3000/products/${productId}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error("Failed to remove product");
  return response.json();
}