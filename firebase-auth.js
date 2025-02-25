import { auth, db } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 📌 **Registrasi Pengguna + OTP**
document.getElementById("register-btn").addEventListener("click", async () => {
    const username = document.getElementById("register-username").value;
    const phone = document.getElementById("register-phone").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        // Daftarkan pengguna
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Kirim verifikasi email (OTP)
        await sendEmailVerification(user);
        alert("Kode OTP telah dikirim ke email Anda. Silakan verifikasi sebelum login.");

        // Simpan data ke Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            phone: phone,
            verified: false // Status awal belum terverifikasi
        });

    } catch (error) {
        console.error("Error: ", error.message);
        alert("Pendaftaran gagal: " + error.message);
    }
});

// 📌 **Login Pengguna (Harus Verifikasi Dulu)**
document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user.emailVerified) {
            alert("Login berhasil! Anda akan diarahkan ke halaman utama.");
            window.location.href = "Home.html"; // Redirect ke halaman utama
        } else {
            alert("Harap verifikasi email terlebih dahulu.");
        }

    } catch (error) {
        console.error("Error: ", error.message);
        alert("Login gagal: " + error.message);
    }
});
