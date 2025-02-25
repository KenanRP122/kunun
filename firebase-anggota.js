import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

async function loadAnggota() {
    const q = query(collection(db, "anggota"), where("verified", "==", true));
    const querySnapshot = await getDocs(q);
    const anggotaList = document.getElementById("anggota-list");

    anggotaList.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        anggotaList.innerHTML += `
            <li>
                <strong>Username:</strong> ${data.username} <br>
                <strong>Email:</strong> ${data.email} <br>
                <strong>No Telepon:</strong> ${data.phone}
            </li>
        `;
    });
}

// 📌 **Logout User**
document.getElementById("logout-btn").addEventListener("click", async function () {
    try {
        await signOut(auth);
        alert("Logout berhasil!");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Logout gagal:", error);
    }
});

// 📌 **Cek Status Login**
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("logout-btn").classList.remove("hidden");
        loadAnggota(); // Load anggota setelah login
    } else {
        document.getElementById("logout-btn").classList.add("hidden");
    }
});
