document.addEventListener("DOMContentLoaded", function () {
    const circles = document.querySelectorAll(".progress-circle");
    const texts = document.querySelectorAll(".progress-text");

    circles.forEach((circle, index) => {
        let value = circle.getAttribute("data-value");
        let offset = 283 - (283 * value) / 100; // 283 is the full circumference
        circle.style.transition = "stroke-dashoffset 2.5s ease-in-out";
        circle.style.strokeDashoffset = offset;

        let count = 0;
        let interval = setInterval(() => {
            if (count >= value) {
                clearInterval(interval);
            }
            texts[index].textContent = `${count}%`;
            count++;
        }, 25);
    });
});