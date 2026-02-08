// ==========================================
// 1. SHAQAHA XAQIIJINTA (VALIDATION)
// ==========================================

// Magaca: Waa inuu xarfo (A-Z) keliya yahay (Ma ogola nambarro)
function isValidName(name) {
  return /^[A-Za-z\s]+$/.test(name);
}

// Password (Codsigaaga): Waa inuu nambarro keliya yahay (6 ama ka badan)
function isValidPassword(password) {
  // \d macnaheedu waa nambar, {6,} macnaheedu waa 6 ama ka badan
  return /^\d{6,}$/.test(password);
}

// ==========================================
// 2. SIGNUP LOGIC (Diiwaangelinta)
// ==========================================
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  const signupSuccess = document.getElementById("signupSuccess");
  if (signupSuccess) signupSuccess.style.display = "none";

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Hubinta Magaca
    if (!isValidName(name)) {
      return alert("❌ Magaca waa inuu xarfo keliya noqdaa (Ma ogola nambarro)!");
    }

    // Hubinta Password-ka (Nambarada & 6 dhibcood)
    if (!isValidPassword(password)) {
      return alert("❌ Password-ka waa inuu nambarro keliya yahay (ugu yaraan 6 nambar)!");
    }

    // Kaydi xogta User-ka (LocalStorage)
    const user = { name, email, password };
    localStorage.setItem("userData", JSON.stringify(user));

    // Muuji farriinta guusha
    if (signupSuccess) {
      signupSuccess.style.display = "block";
      signupForm.style.display = "none";
    }
  });
}

// ==========================================
// 3. LOGIN LOGIC (Galka)
// ==========================================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  const loginSuccess = document.getElementById("loginSuccess");
  if (loginSuccess) loginSuccess.style.display = "none";

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (!savedUser) {
      return alert("❌ Account ma jiro! Fadlan marka hore is-diiwaangeli (Signup).");
    }

    // Hubinta Email-ka iyo Password-ka
    if (email === savedUser.email && password === savedUser.password) {
      if (loginSuccess) loginSuccess.style.display = "block";

      // U gudubka Dashboard-ka 1.5 ilbiriqsi kadib
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } else {
      alert("❌ Email ama Password waa khalad!");
    }
  });
}

// ==========================================
// 4. DASHBOARD LOGIC (Bogga User-ka)
// ==========================================
const welcomeUser = document.getElementById("welcomeUser");
if (welcomeUser) {
  const user = JSON.parse(localStorage.getItem("userData"));

  if (user) {
    // Muuji magaca qofka
    welcomeUser.textContent = `Welcome, ${user.name}!`;
    const dashboardMsg = document.getElementById("dashboardMsg");
    if (dashboardMsg) {
      dashboardMsg.textContent = "🎉 Waad ku guuleysatay inaad gasho Dashboard-ka.";
    }
  } else {
    // Haddii uusan qofku login ahayn, dib u celi
    window.location.href = "login.html";
  }
}

// LOGOUT: Ka bixidda nidaamka