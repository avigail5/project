import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Layout from "./Layout";
import { addToCart } from "../api/cartApi";
import { getAllProducts } from "../api/productsApi";
import { InputBase } from "@mui/material";

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
return {
src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
};
}

export default function CustomImageList() {
const [products, setProducts] = useState<any[]>([]);
const [userId, setUserId] = useState<number | null>(null);
const [searchInput, setSearchInput] = useState('');
const [filteredProducts, setFilteredProducts] =useState<any[]>([]);

useEffect(() => {
const userString = localStorage.getItem("user");
if (userString) {
try {
const user = JSON.parse(userString);
setUserId(user.id);
console.log("User ID:", user.id);
} catch (err) {
console.error("Failed to parse user from localStorage", err);
}
} else {
console.log("No user found in localStorage");
}
}, []);

// משיכת כל המוצרים
useEffect(() => {
getAllProducts()
.then((data) => {
      setProducts(data);
      setFilteredProducts(data);})
.catch((err) => console.error(err));
}, []);

const handleSearch = (value: string) => {
  setSearchInput(value);
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(value.toLowerCase())
  );
  setFilteredProducts(filtered);
};

// פונקציה להוספה לעגלה
const handleAddToCart = async (productId: number) => {
if (!userId) {
alert("Please sign in to add products to cart");
return;
}

try {
  await addToCart(userId, productId, 1);
  alert("Product added to cart!");
} catch (err) {
  console.error("Failed to add product to cart:", err);
  alert("Failed to add product to cart");
}

};

return ( 
  
<Box
sx={{
display: "flex",
justifyContent: "center",
flexDirection: "column",
width: "100vw",
overflowX: "auto",
padding: 2,
}}
>
<div style={{ marginBottom: '20px' ,display: "flex" ,justifyContent: "center"}}>
                <input
    type="text"
    placeholder="Search product..."
    value={searchInput}
    onChange={(e) => handleSearch(e.target.value)}
    style={{ padding: '10px', width: '300px' }}
                />
            </div>
<ImageList
sx={{
width: "100%",
maxWidth: "1200px",
transform: "translateZ(0)",
}}
rowHeight={250}
gap={16}
cols={3}
>
{filteredProducts.map((item) => (
<ImageListItem key={item.id} sx={{ position: "relative" }}>
<img
{...srcset(item.image_url, 350, 250)}
alt={item.name}
loading="lazy"
style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
<Box
sx={{
position: "absolute",
bottom: 0,
width: "100%",
height: "70px",
background:
"linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
display: "flex",
justifyContent: "space-between",
alignItems: "flex-end",
padding: "8px",
boxSizing: "border-box",
}}
>
<Box sx={{ color: "white", display: "flex", flexDirection: "column" }}>
<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
{item.name} </Typography> <Typography variant="caption">{item.description}</Typography> </Box>
<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
<Typography variant="subtitle2" sx={{ color: "white", fontWeight: "bold" }}>
${item.price} </Typography>
<IconButton
sx={{
color: "white",
backgroundColor: "rgba(0,0,0,0.4)",
padding: "6px 10px",
borderRadius: "8px",
"&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
}}
onClick={() => handleAddToCart(item.id)}
> <AddIcon /> </IconButton> </Box> </Box> </ImageListItem>
))} </ImageList> </Box>
);
}
