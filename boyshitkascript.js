let attempt = 0;

function recoverAccount(){

let progressBox = document.getElementById("progressBox");
let bar = document.getElementById("progressBar");
let recoveryText = document.getElementById("recoveryText");

progressBox.style.display = "block";

bar.style.width = "0%";
bar.innerHTML = "0%";

attempt++;

let stopPoint = 44;

if(attempt == 1) stopPoint = 44;
if(attempt == 2) stopPoint = 67;
if(attempt == 3) stopPoint = 92;
if(attempt >= 4) stopPoint = 100;

let width = 0;

let interval = setInterval(function(){

width++;

bar.style.width = width + "%";
bar.innerHTML = width + "%";

if(width >= stopPoint){

clearInterval(interval);

/* ATTEMPT 1 */

if(attempt == 1){

bar.classList.add("progress-error");
bar.innerHTML = "44% - ⚠ ERROR";

recoveryText.innerHTML =
"<b>We cannot retrieve the User's account since there is missing information that prevents the database from retrieving the user's account. The Database needs an $200 Funds to process.</b>";

}

/* ATTEMPT 2 */

else if(attempt == 2){

bar.classList.add("progress-error");
bar.innerHTML = "67% - ⚠ ERROR";

recoveryText.innerHTML =
"<b>The database has already found the missing information. We must increase the market transaction; that is why the Database need another funds worth $500. We are doing this so that the user's account will be immune to this case anymore.</b>";

}

/* ATTEMPT 3 */

else if(attempt == 3){

bar.classList.add("progress-error");
bar.innerHTML = "92% - ⚠ ERROR";

recoveryText.innerHTML =
"<b>The System needs an $800 Funds to fix the Item Buying Process Data on the User's Account. However, there is a problem regarding the Item Buying Process Data. As such, The User's account is not capable of performing any transactions on Steam, such as trading, buying in the market, or purchasing in-game items.</b>";

}

/* ATTEMPT 4 SUCCESS → FINAL ERROR */

else if(attempt == 4){

bar.classList.add("progress-error");
bar.innerHTML = "FINAL ERROR - Recovery Account Rejected Request";

recoveryText.innerHTML =
"<b>The Database needs $1,200 Funds to be added on the User's Account to verify the new DATA that has been encoded on Steam-User's Account. Make sure to inform the user out of discretion.</b>";

}

/* ATTEMPT 5 SUCCESS */

else{

bar.classList.remove("progress-error");
bar.style.background = "#2ecc71";
bar.innerHTML = "100% - Recovery Completed";

recoveryText.innerHTML =
"<b>Account recovery completed successfully.</b>";

/* UNLOCK ACCOUNT */

document.getElementById("communityBan").innerHTML = "Pending";
document.getElementById("tradeBan").innerHTML = "Pending";
document.getElementById("vacBan").innerHTML = "Pending";
document.getElementById("accountStatus").innerHTML = "Pending";

document.getElementById("communityBan").className = "ban-green";
document.getElementById("tradeBan").className = "ban-green";
document.getElementById("vacBan").className = "ban-green";
document.getElementById("accountStatus").className = "ban-green";

/* BUTTON CHANGE + TIMER */

let timeLeft = 3600; // 1 hour
recoverBtn.disabled = true;

let timer = setInterval(function(){

timeLeft--;

let hours = Math.floor(timeLeft / 3600);
let minutes = Math.floor((timeLeft % 3600) / 60);
let seconds = timeLeft % 60;

if(hours < 10) hours = "0" + hours;
if(minutes < 10) minutes = "0" + minutes;
if(seconds < 10) seconds = "0" + seconds;

recoverBtn.innerHTML = "Account Restored (" + hours + ":" + minutes + ":" + seconds + ")";

if(timeLeft <= 0){
clearInterval(timer);
recoverBtn.innerHTML = "Account Restored";

}

},1000);

}

}

},60);

}

let funds = 0;
let clickCount = 0;

function animateFunds(target){
let fundsText = document.getElementById("fundsText");
let current = funds;

let interval = setInterval(function(){

current += 10;

if(current >= target){
current = target;
clearInterval(interval);
}

fundsText.innerHTML = "$" + current;

},20);

funds = target;

}

function showPopup(){

let popup = document.getElementById("steamPopup");
let input = document.getElementById("walletCode");

popup.style.display = "block";

/* CLEAR INPUT */
if(input){
input.value = "";
}

/* ENABLE RECOVER BUTTON */
document.getElementById("recoverBtn").disabled = false;

/* INCREASE FUNDS BASED ON CLICK */
clickCount++;

if(clickCount == 1){
animateFunds(100);
}
else if(clickCount == 2){
animateFunds(300);
}
else if(clickCount == 3){
animateFunds(800);
}
else if(clickCount == 4){
animateFunds(1600);
}

/* HIDE POPUP */
setTimeout(function(){
popup.style.display = "none";
},2000);


/* FUNDS PER ATTEMPT */

if(clickCount == 1){
animateFunds(100);
}

else if(clickCount == 2){
animateFunds(300);
}

else if(clickCount == 3){
animateFunds(800);
}

else if(clickCount == 4){
animateFunds(1600);
}

else if(clickCount == 5){
animateFunds(2800);
}

}
