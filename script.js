function isValidName(name){

    name = name.trim();

    if(name.length < 2) return false;

    if(!/^[A-Za-z\s]+$/.test(name)) return false;

    const spam = [
        "asdf","qwerty","zxcv","poiuy",
        "akdhwoi","ahdoish","abcdef","testtest"
    ];

    return !spam.some(w => name.toLowerCase().includes(w));
}
const name1 = document.getElementById("name1").value.trim();
const name2 = document.getElementById("name2").value.trim();
const loveText = document.getElementById("loveText").value.trim();

const error = document.getElementById("errorMsg");
error.textContent = "";

// 🔴 HARD REQUIRED CHECK (ALL FIELDS)
if(!name1 || !name2 || !loveText){
    error.textContent = "All fields are required ❤️";
    return;
}

// 🔴 NAME VALIDATION
if(!isValidName(name1)){
    error.textContent = "Please enter a valid first name.";
    return;
}

if(!isValidName(name2)){
    error.textContent = "Please enter a valid second name.";
    return;
}
    document.getElementById("overlay").style.display = "flex";

    setTimeout(()=>{

        document.getElementById("overlay").style.display = "none";

        let combined = (name1 + name2 + loveText).toLowerCase();
        let total = 0;

        for(let i=0;i<combined.length;i++){
            total += combined.charCodeAt(i);
        }

        let percent = (total % 41) + 60;

        document.getElementById("result").style.display = "block";
        document.getElementById("percent").innerText = percent + "%";

        setTimeout(()=>{
            document.getElementById("fill").style.width = percent + "%";
        },100);

        let msg =
            percent >= 95 ? "Deep emotional love 💍"
          : percent >= 85 ? "Strong connection ❤️"
          : percent >= 75 ? "Growing feelings 💕"
          : "There is potential 🥰";

        document.getElementById("message").innerText = msg;

        document.getElementById("g1").value = name1;
        document.getElementById("g2").value = name2;
        document.getElementById("g3").value = loveText;

        document.getElementById("googleForm").submit();

    },1200);
}
