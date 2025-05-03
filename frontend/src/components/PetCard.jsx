import React from 'react';
import { deletePet, adoptPet } from '../services/api';
import { generateAdoptionCertificate } from '../utils/generateCertificate';

const moodColors = {
  Happy: 'bg-green-100 text-green-800',
  Excited: 'bg-yellow-100 text-yellow-800',
  Sad: 'bg-red-100 text-red-800',
};

const PetCard = ({ pet, onRefresh, onEdit }) => {
  const handleEditOpen = () => {
    onEdit(pet);
  };

  const handleAdopt = async () => {
    await adoptPet(pet._id);
    generateAdoptionCertificate(pet);
    onRefresh();
  };

  const handleDelete = async () => {
    await deletePet(pet._id);
    onRefresh();
  };

  return (
    <div className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow bg-white mb-4">
      {/* Pet Header */}
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3">{pet.name}</h2>
      
      {/* Pet Info */}
      <dl className="space-y-2 mb-4">
        <div className="flex items-start">
          <dt className="text-xs md:text-sm text-gray-600 w-24 min-w-24 flex-shrink-0">Species:</dt>
          <dd className="text-xs md:text-sm font-medium flex-1">{pet.species}</dd>
        </div>
        
        <div className="flex items-start">
          <dt className="text-xs md:text-sm text-gray-600 w-24 min-w-24 flex-shrink-0">Age:</dt>
          <dd className="text-xs md:text-sm font-medium flex-1">{pet.age}</dd>
        </div>
        
        <div className="flex items-start">
          <dt className="text-xs md:text-sm text-gray-600 w-24 min-w-24 flex-shrink-0">Personality:</dt>
          <dd className="text-xs md:text-sm font-medium flex-1 break-words">{pet.personality}</dd>
        </div>
        
        <div className="flex items-start">
          <dt className="text-xs md:text-sm text-gray-600 w-24 min-w-24 flex-shrink-0">Mood:</dt>
          <dd className="flex-1">
            <span className={`px-2 py-0.5 rounded text-xs font-medium inline-block ${moodColors[pet.mood] || 'bg-gray-100 text-gray-800'}`}>
              {pet.mood}
            </span>
          </dd>
        </div>
        
        <div className="flex items-start">
          <dt className="text-xs md:text-sm text-gray-600 w-24 min-w-24 flex-shrink-0">Status:</dt>
          <dd className="flex-1">
            {pet.adopted ? 
              <span className="text-xs md:text-sm text-gray-500 font-medium">Adopted</span> : 
              <span className="text-xs md:text-sm text-green-500 font-medium">Available</span>
            }
          </dd>
        </div>
      </dl>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {!pet.adopted && (
          <button 
            onClick={handleAdopt} 
            className="px-3 py-1 text-xs md:text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex-1 md:w-auto"
          >
            Adopt
          </button>
        )}
        <button 
          onClick={handleEditOpen} 
          className="px-3 py-1 text-xs md:text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors flex-1 md:w-auto"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="px-3 py-1 text-xs md:text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex-1 md:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PetCard;