import React, { useState } from 'react';
import { getAllPets } from '../services/api';
import PetCard from '../components/PetCard';

const questions = [
  {
    q: 'Are you more calm or energetic?',
    options: ['Calm', 'Energetic']
  },
  {
    q: 'Do you like independent or social pets?',
    options: ['Independent', 'Social']
  },
  {
    q: 'Do you prefer playful or quiet companions?',
    options: ['Playful', 'Quiet']
  }
];

// Simple mapping: answer -> pet personality
const answerToPersonality = {
  Calm: 'Shy',
  Energetic: 'Playful',
  Independent: 'Reserved',
  Social: 'Friendly',
  Quiet: 'Lazy',
  Playful: 'Playful'
};

const PersonalityQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [matchedPets, setMatchedPets] = useState([]);

  const handleChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: value });
  };

  const handleSubmit = async () => {
    const allPets = await getAllPets();
    const selectedPersonalities = Object.values(answers).map(ans => answerToPersonality[ans]);

    const matches = allPets.filter(pet =>
      selectedPersonalities.includes(pet.personality)
    );

    setMatchedPets(matches);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Find Your Ideal Pet</h2>

      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold">{q.q}</p>
          <div className="flex gap-4 mt-1">
            {q.options.map((opt) => (
              <label key={opt} className="flex items-center gap-1">
                <input
                  type="radio"
                  name={`q${index}`}
                  value={opt}
                  onChange={() => handleChange(index, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Find Matches
      </button>

      {matchedPets.length > 0 && (
        <>
          <h3 className="text-xl mt-6 mb-2 font-bold">Matched Pets</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {matchedPets.map((pet) => (
              <PetCard key={pet._id} pet={pet} onRefresh={() => {}} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalityQuiz;
