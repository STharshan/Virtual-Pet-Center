import React, { useState } from 'react';
import { updatePet } from '../services/api';

const EditPetForm = ({ pet, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    name: pet.name,
    species: pet.species,
    age: pet.age,
    personality: pet.personality
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePet(pet._id, { ...form, age: parseInt(form.age) });
    onUpdate();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Pet</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="species"
            value={form.species}
            onChange={handleChange}
            placeholder="Species"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full border p-2 [appearance:textfield] rounded"
            required
          />
          <input
            name="personality"
            value={form.personality}
            onChange={handleChange}
            placeholder="Personality"
            className="w-full border p-2 rounded"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPetForm;
