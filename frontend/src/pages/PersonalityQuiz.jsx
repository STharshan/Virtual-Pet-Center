import React, { useState } from 'react';
import { getAllPets } from '../services/api';
import PetCard from '../components/PetCard';
import { useNavigate } from 'react-router-dom';

const questions = [
  { q: 'Are you more calm or energetic?', options: ['Calm', 'Energetic'] },
  { q: 'Do you like independent or social pets?', options: ['Independent', 'Social'] },
  { q: 'Do you prefer playful or quiet companions?', options: ['Playful', 'Quiet'] }
];

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
  const navigate = useNavigate();

  const handleChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: value });
  };

  const handleSubmit = async () => {
    const allPets = await getAllPets();
    const selectedPersonalities = Object.values(answers).map(
      ans => answerToPersonality[ans]
    );
    const matches = allPets.filter(pet =>
      selectedPersonalities.includes(pet.personality)
    );
    setMatchedPets(matches);
  };

  const handleHome = () => navigate('/');

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Find Your Ideal Pet
        </h2>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md">
              <p className="font-medium text-gray-700 mb-2">{q.q}</p>
              <div className="flex flex-wrap gap-4">
                {q.options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm sm:text-base text-gray-800">
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={opt}
                      onChange={() => handleChange(index, opt)}
                      className="accent-blue-600"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Find Matches
          </button>
          <button
            onClick={handleHome}
            className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
          >
             Go To Home
          </button>
        </div>
      </div>

      {/* Matched Pets */}
      {matchedPets.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-gray-800">
            Matched Pets
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {matchedPets.map((pet) => (
              <PetCard key={pet._id} pet={pet} onRefresh={() => {}} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalityQuiz;
