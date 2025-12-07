import React, { useState } from "react";
import { createProduct } from "../api/productsApi";

export default function CreateProductForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);

try {
  const result = await createProduct(data);
  console.log("Product created:", result);
  alert("product created")
} catch (error) {
  console.error("Error creating product:", error);
}  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Product Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Price:</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <input type="text" name="description" value={form.description} onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
