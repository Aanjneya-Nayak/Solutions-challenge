import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCDIE-3U5cvM924c_joRphBQngGToZOSyw",
  authDomain: "surplus2serve-tech.firebaseapp.com",
  projectId: "surplus2serve-tech",
  storageBucket: "surplus2serve-tech.firebasestorage.app",
  messagingSenderId: "521830560684",
  appId: "1:521830560684:web:847383b10c2d901e96c009",
  measurementId: "G-GVBBTFLV5J"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Panel animation
const container = document.getElementById('container');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});
signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

// Sign Up
document.querySelector('.sign-up-container form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Save name to Firestore
    await setDoc(doc(db, "users", uid), {
      name: name,
      email: email
    });

    alert("✅ Account created and saved!");
    e.target.reset();
  } catch (error) {
    alert("❌ Signup Error: " + error.message);
  }
});

// Sign In
document.querySelector('.sign-in-container form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.username.value;
  const password = e.target.password.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Get user name from Firestore
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const name = userDoc.data().name;
      alert(`👋 Welcome, ${name}!`);
      // Example redirect
      window.location.href = "home.html";
    }
  } catch (error) {
    alert("❌ Login Error: " + error.message);
  }
});

// Optional Logout Example (if you have a logout button elsewhere)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("👋 Logged out successfully!");
    window.location.href = "index.html"; // redirect to login page
  });
}
