const countdown = () => {
  const targetDate = new Date("January 1, 2025 00:00:00").getTime();
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    // Countdown is over
    clearInterval(interval);
    const calendarDesign = document.querySelector(".calendar-design");

    // Clear the text content of the specific elements
    calendarDesign.querySelector("h1").textContent = "";
    calendarDesign.querySelector(".subtitle").textContent = "";
    calendarDesign.querySelector(".message").textContent = "";

    // Update the countdown div with the new centered text
    const countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = `
      <h2>Happy New Year 2025!</h2>
      <p>Wishing you a year full of joy, success, and happiness!</p>
    `;
    countdownElement.style.display = "flex";
    countdownElement.style.justifyContent = "center";
    countdownElement.style.alignItems = "center";
    countdownElement.style.textAlign = "center";
    countdownElement.style.width = "100%";
    countdownElement.style.height = "100%";

    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Keep the confetti going for a few seconds
    const duration = 5 * 1000; // 5 seconds
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
};

const interval = setInterval(countdown, 1000);

// Goodbye 2024 Section
const images = [
  "./src/assets/2024-1.jpg",
  "./src/assets/2024-2.jpg",
  "./src/assets/2024-3.jpg",
  "./src/assets/2024-4.jpg",
  "./src/assets/2024-5.jpg",
  "./src/assets/2024-6.jpg",
  "./src/assets/2024-7.jpg",
  "./src/assets/2024-8.jpg",
  "./src/assets/2024-9.jpg",
  "./src/assets/2024-10.jpg",
  "./src/assets/2024-11.jpg",
  "./src/assets/2024-12.png",
  "./src/assets/2024-13.png",
  "./src/assets/2024-14.png",
  "./src/assets/2024-15.png",
  "./src/assets/2024-16.png",
  "./src/assets/2024-17.png",
  "./src/assets/2024-18.png",
  "./src/assets/2024-19.png",
  "./src/assets/2024-20.jpg",
];

const imageGrid = document.getElementById("image-grid");

// Function to check if a new position overlaps with existing images
function isOverlapping(newX, newY, size, existingPositions) {
  for (const pos of existingPositions) {
    const distance = Math.sqrt((newX - pos.x) ** 2 + (newY - pos.y) ** 2);
    if (distance < (size + pos.size) / 1.5) {
      // Increased spacing
      return true; // Overlapping
    }
  }
  return false; // Not overlapping
}

const existingPositions = []; // Stores positions of already placed images

// Function to generate random positions with more spread and higher placement
function generatePosition() {
  const x = Math.random() * 70 + 15; // Random position between 15% and 85% (horizontal)
  const y = Math.random() * 40 + 10; // Random position between 10% and 50% (vertical)
  return { x, y };
}

images.forEach((src) => {
  const img = document.createElement("img");
  img.src = src;

  // Random size (between 100px and 200px)
  const size = Math.floor(Math.random() * 100) + 100;
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;

  // Random position (with more spread and higher placement)
  let x, y;
  let attempts = 0;
  do {
    const pos = generatePosition();
    x = pos.x;
    y = pos.y;
    attempts++;
  } while (isOverlapping(x, y, size, existingPositions) && attempts < 200); // More attempts to avoid overlapping

  img.style.left = `${x}%`;
  img.style.top = `${y}%`;
  img.style.transform = `translate(-50%, -50%)`; // Center the image

  // Store the position to avoid overlapping
  existingPositions.push({ x, y, size });

  // Random animation delay (0s to 4s)
  img.style.animationDelay = `${Math.random() * 4}s`;

  imageGrid.appendChild(img);
});
