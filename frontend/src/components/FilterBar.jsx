import React from 'react';

const FilterBar = ({ onFilter }) => (
  <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
    {['Happy', 'Excited', 'Sad'].map((mood) => (
      <button
        key={mood}
        onClick={() => onFilter(mood)}
        className="px-4 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300 transition-colors"
      >
        {mood}
      </button>
    ))}
    <button
      onClick={() => onFilter('')}
      className="px-4 py-1 text-lg bg-blue-200 rounded hover:bg-blue-300 transition-colors"
    >
      All
    </button>
  </div>
);

export default FilterBar;
