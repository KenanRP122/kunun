// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Fungsi Login
window.login = async function() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Refresh data pengguna untuk mendapatkan status terbaru dari server
        await user.reload();
        
        if (user.emailVerified) {
            alert("Login berhasil! Anda akan diarahkan ke halaman utama.");
            window.location.href = "Home.html"; // Redirect ke halaman utama
        } else {
            alert("Email Anda belum diverifikasi! Silakan cek email Anda dan verifikasi terlebih dahulu.");
            await sendEmailVerification(user); // Kirim ulang email verifikasi
            alert("Email verifikasi telah dikirim ulang. Silakan periksa kotak masuk Anda.");
            await auth.signOut(); // Logout otomatis agar tidak masuk ke halaman utama
        }
    } catch (error) {
        alert("Gagal login: " + error.message);
    }
};

// Fungsi Register
window.register = async function() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);

        alert("Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi sebelum login.");
        
        // Pindah otomatis ke halaman login
        toggleForm('login');
    } catch (error) {
        alert("Gagal daftar: " + error.message);
    }
};
