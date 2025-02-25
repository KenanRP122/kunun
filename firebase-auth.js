import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 🔹 Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDR4g7ZiTagykRbHVB8kMBSSjrj9AJvLAI",
  authDomain: "kunun-6135a.firebaseapp.com",
  projectId: "kunun-6135a",
  storageBucket: "kunun-6135a.appspot.com",
  messagingSenderId: "1001222263976",
  appId: "1:1001222263976:web:88c6f6c4b054ab37aade9d",
  measurementId: "G-7ERLY66H9K"
};

// 🔹 Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// === 🔹 REGISTER USER ===
document.getElementById("register-btn").addEventListener("click", async function () {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value.trim();

    if (!username || !email || !password || !phone) {
        alert("Semua data harus diisi!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 🔹 Simpan ke Firestore
        await addDoc(collection(db, "anggota"), {
            uid: user.uid,
            username: username,
            email: email,
            phone: phone
        });

        // 🔹 Kirim Email Verifikasi
        await sendEmailVerification(user);
        alert("Kode OTP telah dikirim ke email. Silakan verifikasi sebelum login.");
        window.location.href = "index.html"; // Kembali ke halaman login
    } catch (error) {
        alert("Gagal mendaftar: " + error.message);
    }
});

// === 🔹 LOGIN USER ===
document.getElementById("login-btn").addEventListener("click", function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Email dan password harus diisi!");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            if (user.emailVerified) {
                alert("Login berhasil!");
                window.location.href = "home.html"; // Redirect ke halaman utama
            } else {
                alert("Silakan verifikasi email Anda terlebih dahulu.");
            }
        })
        .catch((error) => {
            alert("Login gagal: " + error.message);
        });
});

// === 🔹 CEK STATUS LOGIN ===
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user.email);
    } else {
        console.log("User not logged in.");
    }
});
