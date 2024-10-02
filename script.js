window.addEventListener('scroll', function () {
    const scrollPos = window.scrollY; // Current scroll position
    const windowHeight = window.innerHeight; // Height of the viewport
    const totalHeight = document.body.scrollHeight; // Total height of the document

    // Calculate the fade-out effect for the first video
    const video1 = document.getElementById('video1');
    const fadeOutStart = windowHeight * 0.4; // When the fade-out starts
    const fadeOutEnd = windowHeight; // When the first video should be fully faded out

    // Calculate the opacity for the first video
    if (scrollPos > fadeOutStart && scrollPos < fadeOutEnd) {
        const opacity = 1 - (scrollPos - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        video1.style.opacity = opacity; // Fade out the first video
    } else if (scrollPos >= fadeOutEnd) {
        video1.style.opacity = 0; // Fully transparent
    } else {
        video1.style.opacity = 1; // Fully visible
    }

    // Calculate the fade-in effect for the second video
    const video2 = document.getElementById('video2');
    const fadeInStart = fadeOutEnd; // Start fading in the second video after the first one fades out
    const fadeInEnd = fadeInStart + windowHeight * 0.5; // When the second video should be fully visible

    // Calculate the opacity for the second video
    if (scrollPos > fadeInStart && scrollPos < fadeInEnd) {
        const opacity = (scrollPos - fadeInStart) / (fadeInEnd - fadeInStart);
        video2.style.opacity = opacity; // Fade in the second video
    } else if (scrollPos >= fadeInEnd) {
        video2.style.opacity = 1; // Fully visible
    } else {
        video2.style.opacity = 0; // Fully transparent
    }

    // Parallax effect
    video1.style.transform = `translateY(${scrollPos * 0.2}px)`; // First video moves slower
    video2.style.transform = `translateY(${scrollPos * 0.4}px)`; // Second video moves faster
});
