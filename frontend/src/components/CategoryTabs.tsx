import React from 'react';
import { categories } from '../data/menuData';
import './CategoryTabs.css';

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-tabs">
      <button
        className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => onSelectCategory('all')}
      >
        전체
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs; 