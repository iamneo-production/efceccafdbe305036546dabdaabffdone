// ProductDetail.js
import React from 'react';

function ProductDetail({ product }) {
  if (!product) {
    return <div>Select a product to view details.</div>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <p>Name: {product.name}</p>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <img src={product.imageUrl} alt={product.name} />
    </div>
  );
}

export default ProductDetail;
