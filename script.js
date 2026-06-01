function isValidName(name){

    name = name.trim().toLowerCase();

    // ❌ must be 3–30 chars total
    if(name.length < 3 || name.length > 30) return false;

    // ❌ only letters + spaces
    if(!/^[a-z\s]+$/.test(name)) return false;

    // split words
    let words = name.split(" ").filter(w => w.length > 0);

    // ❌ no empty or weird spacing
    if(words.length === 0) return false;

    for(let w of words){

        // ❌ each word must be 3+ letters
        if(w.length < 3) return false;

        // ❌ must contain at least 1 vowel
        if(!/[aeiou]/.test(w)) return false;

        let vowels = w.match(/[aeiou]/g);
        let consonants = w.match(/[bcdfghjklmnpqrstvwxyz]/g);

        // ❌ no pure nonsense patterns
        if(!vowels || !consonants) return false;

        // ❌ too many consonants = fake word
        if(consonants.length > vowels.length * 3) return false;

        // ❌ repeating spam like "aaaaa", "bbbb"
        if(/(.)\1{3,}/.test(w)) return false;

        // ❌ no alternating random junk like "asdasd"
        if(/^(..)\1+$/.test(w)) return false;
    }

    return true;
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
