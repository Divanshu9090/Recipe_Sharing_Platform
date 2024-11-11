import React from 'react';
import '../css/category.css';

function Category({ clickHandle }) {
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];

  return (
    <div className="category">
      <h1>Select a Category</h1>
      <ul className="category-list">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => clickHandle(category)}
            style={{ cursor: 'pointer' }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
