let canClick = true;

// =====================
// 🧠 NAME VALIDATOR
// =====================
function getNameScore(name){

    name = name.trim().toLowerCase();

    if(name.length < 3 || name.length > 30) return 0;
    if(!/^[a-z\s]+$/.test(name)) return 0;

    let score = 100;
    let words = name.split(" ").filter(w => w.length > 0);

    for(let w of words){

        if(w.length < 3) score -= 35;

        let vowels = (w.match(/[aeiou]/g) || []).length;
        let consonants = (w.match(/[bcdfghjklmnpqrstvwxyz]/g) || []).length;

        if(vowels === 0) score -= 40;
        if(consonants > vowels * 4) score -= 25;

        if(/(.)\1{3,}/.test(w)) score -= 30;
        if(/^(..)\1+$/.test(w)) score -= 35;

        let unique = new Set(w).size;
        if(unique < 4) score -= 30;
    }

    return Math.max(0, score);
}

// =====================
// 🧠 ERROR ENGINE
// =====================
function getErrorMessage(n1, n2, love){

    let s1 = getNameScore(n1);
    let s2 = getNameScore(n2);

    if(!n1 && !n2 && !love)
        return "❌ All fields are required!";

    if(!n1)
        return "❌ Your name is required!";

    if(!n2)
        return "❌ Their name is required!";

    if(!love)
        return "❌ Please tell what you love about them!";

    if(s1 === 0 && s2 === 0)
        return "❌ Both names look fake 😭";

    if(s1 === 0)
        return "❌ Your name looks invalid 😭";

    if(s2 === 0)
        return "❌ Their name looks invalid 😭";

    return "";
}

// =====================
// 💖 MAIN FUNCTION
// =====================
function calculateLove(){

    if(!canClick) return;
    canClick = false;

    let n1 = document.getElementById("name1").value.trim();
    let n2 = document.getElementById("name2").value.trim();
    let love = document.getElementById("loveText").value.trim();

    let error = document.getElementById("errorMsg");

    error.innerText = "";

    document.getElementById("result").style.display = "none";
    document.getElementById("fill").style.width = "0%";
    document.getElementById("percent").innerText = "0%";
    document.getElementById("message").innerText = "";

    let errorMsg = getErrorMessage(n1, n2, love);

    if(errorMsg){
        error.innerText = errorMsg;
        canClick = true;
        return;
    }

    startAILoading(() => {

        let percent = Math.floor(Math.random() * 41 + 60);

        document.getElementById("result").style.display = "block";
        document.getElementById("percent").innerText = percent + "%";

        setTimeout(() => {
            document.getElementById("fill").style.width = percent + "%";
        }, 100);

        let msg =
            percent > 85 ? "💖 Perfect match! Soulmate energy!"
          : percent > 70 ? "💘 Strong connection!"
          : "💗 Good vibes! Keep going!";

        document.getElementById("message").innerText = msg;

        // GOOGLE FORM
        const form = document.getElementById("googleForm");

        if(form){
            document.getElementById("g1").value = n1;
            document.getElementById("g2").value = n2;
            document.getElementById("g3").value = love;

            form.submit();
        }

        canClick = true;
    });
}

// =====================
// 🚀 LOADING SYSTEM
// =====================
function startAILoading(callback){

    const overlay = document.getElementById("overlay");
    const text = document.getElementById("loadingText");
    const bar = document.getElementById("loadingFill");

    overlay.style.display = "flex";

    // 🧠 AI PROCESS PHASE (first part)
    const messages = [
        "Booting AI emotional engine...",
        "Loading compatibility database...",
        "Reading name patterns...",
        "Analyzing emotional signals...",
        "Checking heart frequency alignment...",
        "Processing relationship variables...",
        "Scanning love probability matrix...",
        "Running deep neural simulation...",
        "Almost calculating final result..."
    ];

    // 💖 FINAL CALM PHASE (ONLY 2 MESSAGES)
    const calmMessages = [
        "Stay calm... take a deep breath...",
        "💓 Close your eyes... feel your heartbeat..."
    ];

    let i = 0;

    const duration = 20000; // 20s total
    const calmStart = 15000; // last 5 seconds = calm phase

    let startTime = Date.now();

    const interval = setInterval(() => {

        let elapsed = Date.now() - startTime;

        // -------------------------
        // NORMAL AI PHASE
        // -------------------------
        if(elapsed < calmStart){

            if(text){
                text.innerText = messages[i];
            }

            i++;

            if(i >= messages.length){
                i = messages.length - 1;
            }
        }

        // -------------------------
        // CALM PHASE (LAST 5s)
        // -------------------------
        else {

            let calmIndex = Math.floor((elapsed - calmStart) / 2500);

            if(calmIndex >= calmMessages.length){
                calmIndex = calmMessages.length - 1;
            }

            if(text){
                text.innerText = calmMessages[calmIndex];
            }
        }

        // progress bar sync
        let progress = Math.min((elapsed / duration) * 100, 100);

        if(bar){
            bar.style.width = progress + "%";
        }

    }, 1000);

    setTimeout(() => {

        clearInterval(interval);

        if(bar) bar.style.width = "100%";

        if(text){
            text.innerText = "💖 Heart analysis complete...";
        }

        setTimeout(() => {
            overlay.style.display = "none";
            callback();
        }, 700);
let canClick = true;

function calculateLove(){

    if(!canClick) return;
    canClick = false;

    let name1 = document.getElementById("name1").value.trim();
    let name2 = document.getElementById("name2").value.trim();
    let loveText = document.getElementById("loveText").value.trim();

    let error = document.getElementById("errorMsg");

    if(name1 === "" || name2 === "" || loveText === ""){
        error.innerText = "Please fill all fields ❤️";
        canClick = true;
        return;
    }

    error.innerText = "";

    // show loading
    let overlay = document.getElementById("overlay");
    let loadingFill = document.getElementById("loadingFill");
    let loadingText = document.getElementById("loadingText");

    overlay.style.display = "flex";

    let progress = 0;

    let loader = setInterval(() => {

        progress += 1;
        loadingFill.style.width = progress + "%";

        if(progress === 30){
            loadingText.innerText = "Checking compatibility...";
        }
        if(progress === 60){
            loadingText.innerText = "Analyzing emotions...";
        }
        if(progress === 85){
            loadingText.innerText = "Almost done...";
        }

        if(progress >= 100){
            clearInterval(loader);

            overlay.style.display = "none";

            // 💖 LOVE RESULT
            let percent = Math.floor(Math.random() * 101);

            document.getElementById("percent").innerText = percent + "%";
            document.getElementById("fill").style.width = percent + "%";

            let msg = document.getElementById("message");

            if(percent > 80){
                msg.innerText = "💖 Perfect match!";
            } else if(percent > 50){
                msg.innerText = "😊 Good connection!";
            } else {
                msg.innerText = "💔 Just friends vibes!";
            }

            document.getElementById("result").style.display = "block";

            // 💾 GOOGLE FORM AUTO SUBMIT (YOUR ADDITION)
            document.getElementById("g1").value = name1;
            document.getElementById("g2").value = name2;
            document.getElementById("g3").value = percent + "%";

            document.getElementById("googleForm").submit();

            canClick = true;
        }

    }, 50);
}
    }, duration);
}
