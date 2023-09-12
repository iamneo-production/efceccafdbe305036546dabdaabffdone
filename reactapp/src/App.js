// App.js
import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Filter from './components/Filter';
import productsData from './data/products';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
  };

  const handleRemoveFromCart = (product) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
  };

  const handleFilter = (priceRange) => {
    // Filter products based on price range
    const filtered = productsData.filter((product) => {
      const price = parseFloat(product.price);
      const min = parseFloat(priceRange.min);
      const max = parseFloat(priceRange.max);
      return (!min || price >= min) && (!max || price <= max);
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="App">
      <h1>E-Commerce Store</h1>
      <div className="container">
        <div className="left-panel" data-testid="product-details" >
          <Filter onFilter={handleFilter} />
          <ProductList products={filteredProducts} onProductSelect={handleProductSelect} />
        </div>
        <div className="right-panel" data-testid="cart-details" >
          <ProductDetail product={selectedProduct} />
          <Cart cartItems={cartItems} onRemoveItem={handleRemoveFromCart} />
        </div>
      </div>
    </div>
  );
}

export default App;
