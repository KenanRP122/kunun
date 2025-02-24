import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://iasygmfiitbhmtxetscy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhc3lnbWZpaXRiaG10eGV0c2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MTc2NDIsImV4cCI6MjA1NDk5MzY0Mn0.5P7Xnb42nuK-5uM6b-uPhY25pwdbkNxDAT9DnBQjrQo"; // Hati-hati, ini bisa dilihat publik!
const supabase = createClient(supabaseUrl, supabaseKey);

window.register = async function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        alert("Gagal daftar: " + error.message);
    } else {
        alert("Berhasil daftar, silakan login!");
        window.location.href = "Home.html"; // Redirect ke Home setelah daftar
    }
};

window.login = async function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert("Gagal login: " + error.message);
    } else {
        alert("Login berhasil!");
        window.location.href = "Home.html"; // Redirect ke Home setelah login
    }
};
