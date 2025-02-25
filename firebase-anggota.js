import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
const db = getFirestore(app);

// **Ambil Data Anggota dari Firestore**
async function loadAnggota() {
    const anggotaList = document.getElementById("anggota-list");
    anggotaList.innerHTML = ""; // Kosongkan daftar

    const querySnapshot = await getDocs(collection(db, "anggota"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `${data.username} - ${data.email} - ${data.phone}`;
        anggotaList.appendChild(li);
    });
}

// **Panggil fungsi saat halaman dimuat**
window.onload = loadAnggota;
