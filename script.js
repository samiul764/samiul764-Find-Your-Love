function isValidName(name){

    name = name.trim();

    // at least 3 characters
    if(name.length < 3) return false;

    // no numbers allowed
    if(/[0-9]/.test(name)) return false;

    // must contain at least one vowel
    if(!/[aeiouAEIOU]/.test(name)) return false;

    // must contain letters only (basic safety)
    if(!/^[a-zA-Z\s]+$/.test(name)) return false;

    let vowels = name.match(/[aeiouAEIOU]/g);
    let consonants = name.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g);

    if(!vowels || !consonants) return false;

    // too many consonants = likely fake word
    if(consonants.length > vowels.length * 4) return false;

    return true;
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
