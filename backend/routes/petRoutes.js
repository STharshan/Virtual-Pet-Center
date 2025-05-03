const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController.js');

router.post('/', petController.addPet);
router.get('/', petController.getAllPets);
router.get('/filter', petController.filterMood);
router.get('/:id', petController.getPet);
router.put('/:id', petController.updatePet);
router.patch('/:id/adopt', petController.adoptPet);
router.delete('/:id', petController.deletePet);
router.get('/check-moods', petController.checkPetMoods);

module.exports = router;
