import React, { useState, useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext"; 
import { useGlobalStateContext } from "../context/GlobalStateContext";


const CategorySelector = ({ onCategoryChange }) => {
  const { preferences, updatePreferences } = useNotificationContext();
  const { fetchNewsData } = useGlobalStateContext();
  const [selectedCategory, setSelectedCategory] = useState(preferences.categories[0]); 

  

 // Handle category change (via dropdown or button group)
 const handleCategoryChange = (category) => {
  setSelectedCategory(category);
  onCategoryChange(category); 
};
  

  return (
    <div className="p-4">
     

      {/* Button Group for Category Selection (alternative to dropdown) */}
      <div className="flex gap-4 flex-wrap">
        {["Sports", "Technology", "Business", "Entertainment"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
