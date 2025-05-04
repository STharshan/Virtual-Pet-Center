const Pet = require('../models/petModel.js');
const petService = require('../services/petService.js');
const calculateMood = require('../utils/moodLogic.js')

exports.addPet = async (req, res) => {
  const newPet = await Pet.create(req.body);
  res.status(201).json(newPet);
};

exports.getAllPets = async (req, res) => {
  const pets = await petService.getAllPets();
  res.json(pets);
};

exports.getPet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) return res.status(404).send('Pet not found');
  const mood = require('../utils/moodLogic')(pet.createdAt);
  res.json({ ...pet.toObject(), mood });
};

exports.updatePet = async (req, res) => {
  const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!pet) return res.status(404).send('Pet not found');
  res.json(pet);
};

exports.adoptPet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) return res.status(404).send('Pet not found');
  pet.adopted = true;
  pet.adoption_date = new Date();
  pet.mood = calculateMood(pet.createdAt); // Optional if you want mood saved immediately
  await pet.save();
  res.json(pet);
};

exports.deletePet = async (req, res) => {
  const pet = await Pet.findByIdAndDelete(req.params.id);
  if (!pet) return res.status(404).send('Pet not found');
  res.send('Pet deleted');
};

exports.filterMood = async (req, res) => {
  const mood = req.query.mood;
  const filteredPets = await petService.filterByMood(mood);
  res.json(filteredPets);
};

exports.checkPetMoods = async (req, res) => {
  try {
    const pets = await Pet.find({ mood: 'Happy', adoption_date: null });

    const now = new Date();
    const thresholdMinutes = 1; 

    for (const pet of pets) {
      const created = new Date(pet.createdAt);
      const diffMinutes = (now - created) / (1000 * 60);

      if (diffMinutes >= thresholdMinutes) {
        pet.mood = 'Sad';
        await pet.save();
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error checking moods:', error);
    res.status(500).json({ error: 'Mood check failed' });
  }
};
