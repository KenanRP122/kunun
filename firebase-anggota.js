import { db } from "./firebase-config.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

async function loadAnggota() {
    const anggotaContainer = document.getElementById("anggota-container");
    anggotaContainer.innerHTML = "<h3>Memuat anggota...</h3>";

    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let anggotaHTML = "<ul>";

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            anggotaHTML += `<li><b>${data.username}</b> - ${data.email} (${data.phone})</li>`;
        });

        anggotaHTML += "</ul>";
        anggotaContainer.innerHTML = anggotaHTML;
    } catch (error) {
        console.error("Gagal mengambil data anggota:", error);
        anggotaContainer.innerHTML = "<p>Gagal memuat data anggota.</p>";
    }
}

// Panggil fungsi saat halaman dimuat
window.onload = loadAnggota;
