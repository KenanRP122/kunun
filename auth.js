import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://iasygmfiitbhmtxetscy.supabase.co";
const supabaseKey = "ANON_KEY_KAMU"; // Hati-hati, ini bisa dilihat publik!
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
