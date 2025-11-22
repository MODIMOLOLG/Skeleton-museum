const stepsloop = new Audio("sounds/steps loop.mp3");
stepsloop.loop = true;
stepsloop.volume = 0;

const imageContainer = document.getElementById('image-container');
const imageNumbers = Array.from({ length: 23 }, (_, i) => i + 1);

document.addEventListener('DOMContentLoaded', () => {
    for (let i = imageNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imageNumbers[i], imageNumbers[j]] = [imageNumbers[j], imageNumbers[i]];
    }

    imageNumbers.forEach(imageNumber => {
        const img = document.createElement('img');
        img.src = `media/${imageNumber}.jpg`;
        imageContainer.appendChild(img);
    });

    let position = 0;
    let velocity = 0;
    setInterval(() => {
        imageContainer.style.transform = "translateX(-" + position + "px)";
        position += velocity;
        velocity *= 0.999;
        document.getElementById('velocity').textContent = `Velocity: ${velocity.toFixed(2)}`;
        stepsloop.volume = velocity*0.3;
        stepsloop.playbackRate = 0.5 + velocity*0.5;
    }, 1);
    
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            velocity += velocity * 0.1 + 0.02;
        }
        else {
            velocity -= velocity * 0.04;
        }
    });
});

document.addEventListener('click', () => {
    stepsloop.play();
});