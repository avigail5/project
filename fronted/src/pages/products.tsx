import { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const addToCart = (item: any) => {
  console.log("Added to cart:", item);
  alert(`${item.name} added to cart!`);
};

export default function CustomImageList() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // מרכז את ImageList
        width: '100vw', // רוחב כל המסך
        overflowX: 'auto', // אם צריך גלילה אופקית
        padding: 2,
      }}
    >
      <ImageList
        sx={{
          width: '100%', // כל רוחב המסך
          maxWidth: '1200px', // מגבלה אם רוצים
          transform: 'translateZ(0)',
        }}
        rowHeight={250} // אפשר לשנות גובה תמונה
        gap={16}
        cols={3} // מספר עמודות (מתאים למסך רחב)
      >
        {products.map((item) => {
          return (
            <ImageListItem key={item.id} sx={{ position: 'relative' }}>
              <img
                {...srcset(item.image_url, 350, 250)}
                alt={item.name}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Gradient overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: '70px',
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  padding: '8px',
                  boxSizing: 'border-box',
                }}
              >
                {/* שם ותיאור - צד שמאל */}
                <Box sx={{ color: 'white', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption">{item.description}</Typography>
                </Box>

                {/* מחיר + כפתור - צד ימין */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'white', fontWeight: 'bold' }}
                  >
                    ${item.price}
                  </Typography>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
                    }}
                    onClick={() => addToCart(item)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}
