import { useEffect, useState } from 'react';
import { getCart, updateCartItem, removeCartItem, checkout } from '../api/cartApi';

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
  };
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;

      if (!userId) {
        setError('Please log in to view your cart');
        setLoading(false);
        return;
      }

      const data = await getCart(userId);
      setCartItems(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await updateCartItem(cartItemId, newQuantity);
      
      setCartItems(prev =>
        prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error('Failed to update quantity:', err);
      alert('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
    } catch (err) {
      console.error('Failed to remove item:', err);
      alert('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    ).toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;

      await checkout(userId);
      alert('Order placed successfully!');
      setCartItems([]);
    } catch (err) {
      console.error('Failed to checkout:', err);
      alert('Failed to place order');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ fontSize: '18px', color: '#f44336' }}>{error}</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        minHeight: '60vh', 
        justifyContent: 'center', 
        gap: '16px' 
      }}>
        <h2 style={{ color: '#666', fontSize: '28px' }}>Your cart is empty</h2>
        <a 
          href="/" 
          style={{ 
            padding: '12px 24px', 
            backgroundColor: '#1976d2', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ marginBottom: '24px', fontWeight: 'bold', fontSize: '32px' }}>Your Cart</h1>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* Cart Items */}
        <div style={{ flex: '2 1 600px', minWidth: '300px' }}>
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                display: 'flex', 
                marginBottom: '16px', 
                backgroundColor: 'white', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={item.product.image_url}
                alt={item.product.name}
                style={{ width: '160px', height: '160px', objectFit: 'cover' }}
              />
              <div style={{ 
                flex: 1, 
                padding: '16px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between' 
              }}>
                <div>
                  <h3 style={{ marginBottom: '8px', fontSize: '20px' }}>{item.product.name}</h3>
                  <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
                    {item.product.description}
                  </p>
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginTop: '16px' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      style={{ 
                        padding: '4px 8px', 
                        border: '1px solid #ddd', 
                        backgroundColor: item.quantity <= 1 ? '#f5f5f5' : 'white',
                        cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                        borderRadius: '4px',
                        fontSize: '18px'
                      }}
                    >
                      −
                    </button>
                    <span style={{ minWidth: '30px', textAlign: 'center', fontSize: '16px' }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      style={{ 
                        padding: '4px 8px', 
                        border: '1px solid #ddd', 
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '18px'
                      }}
                    >
                      +
                    </button>
                  </div>

                  <h4 style={{ fontWeight: 'bold', fontSize: '20px', margin: '0' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </h4>

                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    style={{ 
                      padding: '8px 12px', 
                      backgroundColor: '#f44336', 
                      color: 'white', 
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
          <div style={{ 
            position: 'sticky', 
            top: '20px',
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>Order Summary</h2>
            <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '8px',
              fontSize: '16px'
            }}>
              <span>Subtotal</span>
              <span>${calculateTotal()}</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '16px',
              fontSize: '16px'
            }}>
              <span>Shipping</span>
              <span style={{ color: '#4caf50', fontWeight: 'bold' }}>FREE</span>
            </div>
            
            <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '24px' 
            }}>
              <h3 style={{ fontSize: '20px', margin: '0' }}>Total</h3>
              <h3 style={{ fontWeight: 'bold', fontSize: '20px', margin: '0' }}>
                ${calculateTotal()}
              </h3>
            </div>

            <button 
              onClick={handleCheckout}
              style={{ 
                width: '100%',
                padding: '16px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1565c0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}