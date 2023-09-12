// Filter.js
import React, { useState } from 'react';

function Filter({ onFilter }) {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const handleFilter = () => {
    // Call the onFilter function with the selected criteria
    onFilter(priceRange);
  };

  return (
    <div>
      <h2>Filter Products</h2>
      <div>
      
        <label><b>Minimum Price:</b></label>
        <input
          type="number"
          placeholder="Minimum Price:"
          value={priceRange.min}
          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
        />
      </div>
      <br></br>
      <div>
        <label><b>Maximum Price:</b></label>
        <input
          type="number"
          placeholder="Maximum Price:"
          value={priceRange.max}
          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
        />
      </div>
      <br></br>
      
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
}

export default Filter;
