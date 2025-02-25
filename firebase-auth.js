import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDR4g7ZiTagykRbHVB8kMBSSjrj9AJvLAI",
  authDomain: "kunun-6135a.firebaseapp.com",
  projectId: "kunun-6135a",
  storageBucket: "kunun-6135a.appspot.com",
  messagingSenderId: "1001222263976",
  appId: "1:1001222263976:web:88c6f6c4b054ab37aade9d",
  measurementId: "G-7ERLY66H9K"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fungsi Register
document.getElementById("register-btn").addEventListener("click", async () => {
    const username = document.getElementById("register-username").value;
    const phone = document.getElementById("register-phone").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Kirim Email Verifikasi OTP
        await sendEmailVerification(user);

        // Simpan Data ke Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            phone: phone
        });

        alert("Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.");
    } catch (error) {
        alert(error.message);
    }
});

// Fungsi Login
document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user.emailVerified) {
            window.location.href = "Home.html"; // Redirect ke Home setelah login
        } else {
            alert("Silakan verifikasi email Anda terlebih dahulu.");
        }
    } catch (error) {
        alert(error.message);
    }
});
