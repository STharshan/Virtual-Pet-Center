const Pet = require('../models/petModel.js');
const calculateMood = require('../utils/moodLogic.js');

exports.getAllPets = async () => {
  const pets = await Pet.find();

  const updatedPets = await Promise.all(pets.map(async (pet) => {
    const newMood = calculateMood(pet.createdAt);
    if (pet.mood !== newMood) {
      pet.mood = newMood;
      await pet.save(); // Update DB
    }
    return pet.toObject();
  }));

  return updatedPets;
};


exports.filterByMood = async (mood) => {
  const pets = await this.getAllPets();
  return pets.filter(pet => pet.mood === mood);
};
