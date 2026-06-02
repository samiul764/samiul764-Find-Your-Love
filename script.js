\let canClick = true;

// 🧠 GOD MODE NAME VALIDATOR
function getNameScore(name){

    name = name.trim().toLowerCase();

    let score = 100;

    if(name.length < 3 || name.length > 30) return 0;
    if(!/^[a-z\s]+$/.test(name)) return 0;

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

// validation
function isValidName(name){
    return getNameScore(name) >= 75;
}

// smart error system
function getErrorMessage(n1, n2){

    let s1 = getNameScore(n1);
    let s2 = getNameScore(n2);

    if(s1 >= 75 && s2 >= 75) return "";

    if(s1 < 30 && s2 < 30)
        return "❌ Both names look fake 😭";

    if(s1 < 75 && s2 < 75)
        return "❌ Both names are invalid 😭";

    if(s1 < 75)
        return "❌ Your name looks invalid 😭";

    if(s2 < 75)
        return "❌ Their name looks invalid 😭";

    return "❌ Invalid input";
}

function calculateLove(){

    if(!canClick) return;
    canClick = false;

    let n1 = document.getElementById("name1").value.trim();
    let n2 = document.getElementById("name2").value.trim();
    let love = document.getElementById("loveText").value.trim();

    let error = document.getElementById("errorMsg");

    // reset
    error.innerText = "";

    if(!n1 || !n2 || !love){
        error.innerText = "❌ Please fill all fields!";
        canClick = true;
        return;
    }

    // smart validation message
    let customError = getErrorMessage(n1, n2);
    if(customError){
        error.innerText = customError;
        canClick = true;
        return;
    }

    document.getElementById("overlay").style.display = "flex";

    setTimeout(() => {

        let percent = Math.floor(Math.random() * 41 + 60);

        document.getElementById("overlay").style.display = "none";

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
