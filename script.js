const currentStreak = document.querySelector('#current-streak');
const maxStreak = document.querySelector('#max-streak');
const updateBtn = document.querySelector('#update-streak');
const fireAnimation = document.querySelector('#fire-animation');
const shareBtn = document.querySelector('#share-streak');
const profileName = document.querySelector('#profile-name');

let currentStreakCount = 0;
let maxStreakCount = 0;
let lastUpdated = 0;

if (!localStorage.getItem('profileName')) {
  const name = prompt('Enter your name:');
  localStorage.setItem('profileName', name);
  profileName.textContent = name;
} else {
  profileName.textContent = localStorage.getItem('profileName');
}

updateBtn.addEventListener('click', function() {
  const now = Date.now();
  if (now - lastUpdated >= 24 * 60 * 60 * 1000) {
    fireAnimation.style.display = 'block';
    setTimeout(function() {
      fireAnimation.style.display = 'none';
      currentStreakCount += 1;
      if (currentStreakCount > maxStreakCount) {
        maxStreakCount = currentStreakCount;
      }
      currentStreak.textContent = currentStreakCount;
      maxStreak.textContent = maxStreakCount;
      lastUpdated = now;
    }, 1000);
  } else {
    alert('You can only update the streak once per day.');
  }
});


shareBtn.addEventListener('click', function() {
  const message = `My current streak is ${currentStreakCount} and my maximum streak is ${maxStreakCount}!`;
  if (navigator.share) {
    navigator.share({
      title: 'My Streak',
      text: message,
      url: window.location.href
    })
      .then(() => console.log('Successful share'))
      .catch(error => console.log('Error sharing:', error));
  } else {
    prompt('Share your streak:', message);
  }
});
