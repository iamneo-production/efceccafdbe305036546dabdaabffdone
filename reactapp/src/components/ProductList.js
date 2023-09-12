import React from 'react';

function ProductList({ products, onProductSelect }) {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            onClick={() => onProductSelect(product)}
            data-testid={`product-item-${product.id}`} // Unique test ID based on product ID
          >
            <span className="product-name">{product.name}</span>
            <span className="product-price" data-testid={`product-price-${product.id}`}> 
              ${product.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
