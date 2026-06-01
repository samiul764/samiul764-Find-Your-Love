let canClick = true;

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

// validate function
function isValidName(name){
    return getNameScore(name) >= 75;
}

// error system
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
}
function calculateLove(){

    let n1 = document.getElementById("name1").value.trim();
    let n2 = document.getElementById("name2").value.trim();
    let love = document.getElementById("loveText").value.trim();

    let error = document.getElementById("errorMsg");

    // empty check
    if(!n1 || !n2 || !love){
        error.innerText = "❌ Please fill all fields!";
        return;
    }

    // name validation
    if(!isValidName(n1) || !isValidName(n2)){
        error.innerText = "❌ Please enter real-looking names!";
        return;
    }

    error.innerText = "";

    // show loader
    document.getElementById("overlay").style.display = "flex";

    setTimeout(() => {

        // love percentage (controlled randomness)
        let percent = Math.floor(Math.random() * 41 + 60); // 60–100

        document.getElementById("overlay").style.display = "none";

        document.getElementById("result").style.display = "block";
        document.getElementById("percent").innerText = percent + "%";
        document.getElementById("fill").style.width = percent + "%";

        let msg = "";

        if(percent > 85){
            msg = "💖 Perfect match! Soulmate energy!";
        } else if(percent > 70){
            msg = "💘 Strong connection!";
        } else {
            msg = "💗 Good vibes! Keep going!";
        }

        document.getElementById("message").innerText = msg;

    }, 1500);
}
