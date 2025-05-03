import React, { useEffect, useState } from 'react';
import { getAllPets, filterPetsByMood } from '../services/api';
import AddPetForm from '../components/AddPetForm';
import PetList from '../components/PetList';
import FilterBar from '../components/FilterBar';
import EditPetForm from '../components/EditPetForm';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  const fetchPets = async () => {
    const data = await getAllPets();
    setPets(data);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleMoodFilter = async (mood) => {
    const data = await filterPetsByMood(mood);
    setPets(data);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-full lg:w-102 bg-gray-100 border-r border-gray-200 flex-shrink-0 overflow-y-auto p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Pet Controls</h2>
        <FilterBar onFilter={handleMoodFilter} />
        <div className="mt-6">
          <AddPetForm onAdd={fetchPets} />
        </div>
        <Link 
          to="/quiz" 
          className="mt-8 block py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          Take the Pet Personality Quiz →
        </Link>
      </div>

      {/* Main content */}
      <div className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ${editingPet ? 'blur-sm' : ''}`}>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Virtual Pet Adoption Center
        </h1>
        <PetList pets={pets} onRefresh={fetchPets} onEdit={setEditingPet} />
      </div>

      {/* Edit Modal */}
      {editingPet && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4">
            <EditPetForm
              pet={editingPet}
              onClose={() => setEditingPet(null)}
              onUpdate={fetchPets}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
