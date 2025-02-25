import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 🔥 Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDR4g7ZiTagykRbHVB8kMBSSjrj9AJvLAI",
    authDomain: "kunun-6135a.firebaseapp.com",
    projectId: "kunun-6135a",
    storageBucket: "kunun-6135a.appspot.com",
    messagingSenderId: "1001222263976",
    appId: "1:1001222263976:web:88c6f6c4b054ab37aade9d",
    measurementId: "G-7ERLY66H9K"
};

// 🔥 Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 📌 **Daftar User Baru & Simpan ke Firestore**
document.getElementById("register-btn").addEventListener("click", async function () {
    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const phone = document.getElementById("reg-phone").value;
    const password = document.getElementById("reg-password").value;

    if (!username || !email || !phone || !password) {
        alert("Semua kolom harus diisi!");
        return;
    }

    try {
        // **Buat akun di Firebase Authentication**
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // **Kirim email verifikasi**
        await sendEmailVerification(user);
        alert("Verifikasi email telah dikirim!");

        // **Simpan data pengguna ke Firestore (Koleksi: anggota)**
        await setDoc(doc(db, "anggota", user.uid), {
            username: username,
            email: email,
            phone: phone
        });

        // Arahkan ke halaman login
        window.location.href = "index.html";
    } catch (error) {
        alert("Error: " + error.message);
    }
});
