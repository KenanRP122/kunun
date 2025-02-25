import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// === DAFTAR ===
document.getElementById("register-btn").addEventListener("click", async () => {
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const phone = document.getElementById("register-phone").value;
    const password = document.getElementById("register-password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Simpan data ke Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            phone: phone
        });

        // Kirim email verifikasi
        await sendEmailVerification(user);
        alert("Pendaftaran berhasil! Periksa email untuk verifikasi.");

        // Redirect ke login
        window.location.href = "index.html";
    } catch (error) {
        alert("Gagal daftar: " + error.message);
    }
});

// === LOGIN ===
document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            alert("Verifikasi email dulu sebelum login!");
            return;
        }

        alert("Login berhasil!");
        window.location.href = "Home.html";
    } catch (error) {
        alert("Login gagal: " + error.message);
    }
});
