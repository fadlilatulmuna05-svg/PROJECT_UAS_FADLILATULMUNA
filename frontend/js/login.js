/* TOGGLE PASSWORD */
function togglePassword() {

    const password =
        document.getElementById("password");

    const button =
        document.querySelector(".toggle-password");

    if (password.type === "password") {

        password.type = "text";
        button.innerHTML = "🙈";

    } else {

        password.type = "password";
        button.innerHTML = "👁️";

    }

}

/* LOGIN */
document
    .getElementById("loginForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const username =
            document.getElementById("username")
                .value
                .trim();

        const password =
            document.getElementById("password")
                .value
                .trim();

        // AKUN LOGIN
        const userBenar =
            "Fadila Muna";

        const passBenar =
            "12345";

        if (
            username === userBenar &&
            password === passBenar
        ) {

            localStorage.setItem(
                "login",
                "true"
            );

            localStorage.setItem(
                "user",
                username
            );

            alert(
                "Login berhasil!"
            );

            window.location.href =
                "menulis.html";

        } else {

            alert(
                "Username atau password salah!"
            );

        }

    });