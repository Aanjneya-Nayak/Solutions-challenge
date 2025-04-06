
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


document.addEventListener("DOMContentLoaded", function () {
    let hamburger = document.querySelector(".hamburger");
    let closeBtn = document.querySelector(".close-btn");
    let menu = document.getElementById("sideMenu");

    hamburger.addEventListener("click", function () {
        console.log("Hamburger Clicked!"); // Debugging check
        menu.classList.toggle("active");
    });

    closeBtn.addEventListener("click", function () {
        console.log("Close Button Clicked!"); // Debugging check
        menu.classList.remove("active");
    });
});

// index.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ... other config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const loginBtn = document.getElementById("loginBtn");
const userInfo = document.getElementById("userInfo");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginBtn.style.display = "none";
    userInfo.style.display = "inline";

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        userInfo.textContent = `Hi, ${data.name || user.email}`;
      } else {
        userInfo.textContent = `Hi, ${user.email}`;
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      userInfo.textContent = `Hi, ${user.email}`;
    }
  } else {
    loginBtn.style.display = "inline";
    userInfo.style.display = "none";
  }
});

