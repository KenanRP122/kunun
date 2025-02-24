// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDR4g7ZiTagykRbHVB8kMBSSjrj9AJvLAI",
  authDomain: "kunun-6135a.firebaseapp.com",
  projectId: "kunun-6135a",
  storageBucket: "kunun-6135a.firebasestorage.app",
  messagingSenderId: "1001222263976",
  appId: "1:1001222263976:web:88c6f6c4b054ab37aade9d",
  measurementId: "G-7ERLY66H9K"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Fungsi Login
window.login = async function() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            alert("Email belum diverifikasi. Silakan cek email Anda untuk verifikasi.");
        } else {
            alert("Login berhasil!");
            window.location.href = "Home.html"; // Redirect ke halaman Home
        }
    } catch (error) {
        alert("Gagal login: " + error.message);
    }
};

// Fungsi Daftar
window.register = async function() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        alert("Berhasil daftar! Cek email Anda untuk verifikasi sebelum login.");
        window.location.href = "Home.html"; // Redirect ke halaman login
    } catch (error) {
        alert("Gagal daftar: " + error.message);
    }
};
