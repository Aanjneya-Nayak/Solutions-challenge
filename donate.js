let currentStep = 1;
const totalSteps = 5;

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentStep < totalSteps) {
        document.getElementById(`step${currentStep}`).classList.remove("active");
        document.querySelectorAll(".step")[currentStep - 1].classList.remove("active");
        currentStep++;
        document.getElementById(`step${currentStep}`).classList.add("active");
        document.querySelectorAll(".step")[currentStep - 1].classList.add("active");
    }
    updateButtons();
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentStep > 1) {
        document.getElementById(`step${currentStep}`).classList.remove("active");
        document.querySelectorAll(".step")[currentStep - 1].classList.remove("active");
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add("active");
        document.querySelectorAll(".step")[currentStep - 1].classList.add("active");
    }
    updateButtons();
});

function updateButtons() {
    document.getElementById("prevBtn").classList.toggle("hidden", currentStep === 1);
    document.getElementById("nextBtn").textContent = currentStep === totalSteps ? "Submit" : "Continue";
}

document.addEventListener("DOMContentLoaded", function () {
    const pickupSelect = document.getElementById("pickup-time");
    const interval = 30; // Set interval in minutes (e.g., 30 minutes)
    
    function getUpcomingTimes() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const nextAvailableTimes = [];

        for (let i = 0; i < 10; i++) { // Limit to next 10 slots
            let nextMinutes = Math.ceil(minutes / interval) * interval + i * interval;
            let nextHour = hours + Math.floor(nextMinutes / 60);
            nextMinutes %= 60;

            if (nextHour >= 24) break; // Stop when reaching the next day
            
            let formattedTime = `${String(nextHour).padStart(2, '0')}:${String(nextMinutes).padStart(2, '0')}`;
            nextAvailableTimes.push(formattedTime);
        }

        return nextAvailableTimes;
    }

    function populateDropdown() {
        pickupSelect.innerHTML = ""; // Clear previous options
        let times = getUpcomingTimes();
        times.forEach(time => {
            let option = document.createElement("option");
            option.value = time;
            option.textContent = time;
            pickupSelect.appendChild(option);
        });
    }

    populateDropdown(); // Initial population
});
