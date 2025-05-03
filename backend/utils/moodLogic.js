function calculateMood(createdAt) {
    const now = new Date();
    const timeDiff = (now - createdAt) / (1000 * 60 * 60 * 24);
  
    if (timeDiff < 1) return 'Happy';
    if (timeDiff <= 3) return 'Excited';
    return 'Sad';
  }
  
  module.exports = calculateMood;
  