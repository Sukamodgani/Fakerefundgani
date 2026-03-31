// 🔐 PROTECT THIS PAGE
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "https://fakerefundgani.vercel.app/Loginsite.html"; // change this
}
let attempt = 0;
let completedRun = false;

function positionPopup(){
    const input = document.getElementById("cardholderName");
    const popup = document.getElementById("cardPopup");
    const rect = input.getBoundingClientRect();
    popup.style.top = (rect.bottom + 8) + "px";
    popup.style.left = rect.left + "px";
}

function showPopup(){
    const popup = document.getElementById("cardPopup");
    popup.style.display = "block";
    positionPopup();
}

window.addEventListener("resize", positionPopup);
window.addEventListener("scroll", positionPopup);

const cardInput = document.getElementById("cardholderName");
const popup = document.getElementById("cardPopup");

cardInput.addEventListener("input", ()=> popup.style.display="none");
cardInput.addEventListener("focus", ()=> popup.style.display="none");

document.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        submitRefund();
    }
});

function addFundsOnly(){
    const amountInput = document.getElementById("refundAmount");
    const fundsDisplay = document.getElementById("fundsAmount");

    let amount = parseFloat(amountInput.value);
    if(isNaN(amount) || amount <= 0) return;

    let fundsBalance = parseFloat(fundsDisplay.innerText);
    fundsBalance += amount;
    fundsDisplay.innerText = fundsBalance.toFixed(2);
}

function addRefundOnly(){
    const amountInput = document.getElementById("refundAmount");
    const balanceDisplay = document.getElementById("balanceAmount");
    const pendingLine = document.getElementById("pendingRefundLine");

    let refundAmount = parseFloat(amountInput.dataset.lastAmount);
    if(isNaN(refundAmount) || refundAmount <= 0) return;

    pendingLine.style.display = "block";

    let currentBalance = parseFloat(balanceDisplay.innerText);
    currentBalance += refundAmount;
    balanceDisplay.innerText = currentBalance.toFixed(2);

    amountInput.value = "";
}

let cooldownActive = false;
let cooldownTime = 3600; // 1 hour

function submitRefund(){

    const cardholderGroup = document.getElementById("cardholderGroup");
    const cardholderName = document.getElementById("cardholderName");

    if(cardholderGroup.style.display === "block"){
        if(!cardholderName.value.trim()){
            showPopup();
            return;
        }
    }

    const spinner = document.getElementById("spinner");
    const errorBox = document.getElementById("errorBox");
    const progressBar = document.getElementById("progressBar");
    const amountInput = document.getElementById("refundAmount");

    /* ✅ COOLDOWN STATE */
    if(cooldownActive){

    errorBox.style.display = "block";

    const formatTime = (sec)=>{
        let h = Math.floor(sec / 3600);
        let m = Math.floor((sec % 3600) / 60);
        let s = sec % 60;

        return (
            String(h).padStart(2,'0') + ":" +
            String(m).padStart(2,'0') + ":" +
            String(s).padStart(2,'0')
        );
    };

    if(!window.cooldownInterval){

        window.cooldownInterval = setInterval(()=>{

            errorBox.textContent =
            "⏳ ERROR: Please wait " + formatTime(cooldownTime) + " before next activation attempt.";

            cooldownTime--;

            if(cooldownTime < 0){
                clearInterval(window.cooldownInterval);
                window.cooldownInterval = null;
                cooldownActive = false;
                cooldownTime = 3600; // reset for next success
            }

        },1000);

    }

    return;
}
    if(!amountInput.value || parseFloat(amountInput.value) <= 0){
        return;
    }

    amountInput.dataset.lastAmount = amountInput.value;

    addFundsOnly();

    attempt++;

    spinner.style.display = "block";
    errorBox.style.display = "none";

    progressBar.classList.remove("progress-stop");
    progressBar.style.width = "0%";
    progressBar.innerText = "0%";

    let progress = 0;
    let stopPoint = null;

    if(attempt === 1) stopPoint = 38;
    else if(attempt === 2) stopPoint = 61;
    else if(attempt === 3) stopPoint = 87;

    const errorMessages = [
        "⚠ ERROR: We cannot retrieve the User's account since there is missing information that prevents the database from retrieving the user's account. The Database needs an $200 Funds to process.",
        "⚠ ERROR: The database has already found the missing information. We must increase the market transaction; that is why the Database need another funds worth $500. We are doing this so that the user's account will be immune to this case anymore.",
        "⚠ ERROR: Security confirmation required. The System needs an $800 Funds to fix the Item Buying Process Data on the User's Account. However, there is a problem regarding the Item Buying Process Data. As such, The User's account is not capable of performing any transactions on Steam, such as trading, buying in the market, or purchasing in-game items."
    ];
    
    function updateProgress(){

        /* STOP PROGRESS */
        if(stopPoint !== null && progress >= stopPoint){

            spinner.style.display = "none";

            progressBar.classList.add("progress-stop");
            progressBar.style.width = stopPoint + "%";
            progressBar.innerText = stopPoint + "%";

            errorBox.textContent = errorMessages[attempt - 1];
            errorBox.style.display = "block";

            addRefundOnly();
            return;
        }

        /* 4TH ATTEMPT FAIL */
        if(attempt === 4 && progress >= 100){

            spinner.style.display = "none";

            progressBar.classList.add("progress-stop");
            progressBar.style.width = "98%";
            progressBar.innerText = "FAILED";

            errorBox.textContent = "❌ FINAL ERROR: The Database needs $1,200 Funds to be added on the User's Account to verify the new DATA that has been encoded on Steam-User's Account. Make sure to inform the user out of discretion.";
            errorBox.style.display = "block";

            setTimeout(()=>{
                progressBar.style.width = "92%";
                progressBar.innerText = "92%";
            },800);

            addRefundOnly();
            return;
        }
        
        /* ⭐ 5TH ATTEMPT SUCCESS */
        if(attempt === 5 && progress >= 100){

            spinner.style.display = "none";

            progressBar.classList.remove("progress-stop");
            progressBar.classList.add("progress-complete");
    
            progressBar.style.width = "100%";
            progressBar.innerText = "COMPLETED";

            cooldownActive = true;

            // Immediately trigger cooldown message
            submitRefund();

           return;
        }

        progress++;
        progressBar.style.width = progress + "%";
        progressBar.innerText = progress + "%";

        setTimeout(updateProgress,20);
    }

    updateProgress();
}

function toggleCardholder(){
    const method = document.getElementById("refundMethod").value;
    const cardholder = document.getElementById("cardholderGroup");

    if(method === "Visa" || method === "MasterCard" || method === "Discover" || method === "American Express"){ 
        cardholder.style.display = "block";
    } else {
        cardholder.style.display = "none";
    }
}
