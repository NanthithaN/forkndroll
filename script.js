const captureButton = document.getElementById('capture-btn');
const video = document.getElementById('webcam-feed');
const popup = document.getElementById('popup');
const capturedImage = document.getElementById('captured-img');
const closeBtn = document.getElementById('close-btn');
const sendEmailBtn = document.getElementById('send-email-btn');
const curtain = document.querySelector('.curtain');
const textToScale = document.querySelectorAll('.side-panel, .webcam-container');
const parallax = document.querySelector('.parallax');

// Simulating the curtain opening after a brief delay
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        curtain.classList.add('open');
    }, 1000); // Adjust the time for how quickly you want the curtain to open
});


// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((error) => {
        console.error('Error accessing webcam:', error);
    });

// Capture image
captureButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/png');
    capturedImage.src = imageData;
    popup.classList.remove('hidden');
});

// Close popup
closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
});

// Send email
sendEmailBtn.addEventListener('click', () => {
    const customText = document.getElementById('custom-text').value;
    const email = document.getElementById('email').value;

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imageData: capturedImage.src,
            customText,
            email,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Email sent successfully!');
        popup.classList.add('hidden');
    })
    .catch((error) => {
        console.error('Error sending email:', error);
    });
});

// Scroll effect to shrink text and move up
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Parallax scrolling effect
    parallax.style.backgroundPositionY = `${scrollY * 0.5}px`;

    // Shrink text and move up
    textToScale.forEach(element => {
        if (scrollY > 50) {
            element.classList.add('shrinking');
        } else {
            element.classList.remove('shrinking');
        }
    });
});
