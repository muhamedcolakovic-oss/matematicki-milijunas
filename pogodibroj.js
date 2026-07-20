/* ==================================
   POGODI BROJ - PREMIUM JAVASCRIPT
================================== */


const RANGES = {
    "25":25,
    "100":100,
    "1000":1000
};



let selectedLevel = null;
let leaderboardLevel = "25";

let target = 0;
let attempts = 0;

let inProgress = false;

let startTime = null;
let timerInterval = null;
let playerName = "";



let records = JSON.parse(
    localStorage.getItem("pogodiBrojRezultati")
) || [];



const setupScreen = document.getElementById("setup-screen");
const gameScreen = document.getElementById("game-screen");

const nameInput = document.getElementById("player-name");
const setupFeedback = document.getElementById("setup-feedback");

const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");

const feedback = document.getElementById("feedback");
const history = document.getElementById("history");

const attemptsDisplay = document.getElementById("attempts-display");

const timerDisplay = document.getElementById("timer-display");

const rangeTitle = document.getElementById("game-range-title");

const newGameBtn = document.getElementById("new-game-btn");





/* ===============================
 PORUKE
================================ */


function message(element,text,type=""){

    element.textContent=text;

    element.className="";

    if(type){
        element.classList.add(
            "feedback-"+type
        );
    }

}





/* ===============================
 ODABIR NIVOA
================================ */


document.querySelectorAll(".level-tile")
.forEach(button=>{


button.addEventListener("click",()=>{


document.querySelectorAll(".level-tile")
.forEach(b=>b.classList.remove("active"));


button.classList.add("active");


selectedLevel = button.dataset.level;


});


});






/* ===============================
 START
================================ */


document.getElementById("start-btn")
.addEventListener("click",()=>{


playerName = nameInput.value.trim();



if(!playerName){


    const names = [

        "Brojolovac",
        "Matematičar",
        "Srećko",
        "Brzi Mozak",
        "Pogađač",
        "Number Master",
        "Logičar"

    ];


    playerName =
    names[
        Math.floor(
            Math.random()*names.length
        )
    ];


}



if(!selectedLevel){

message(
setupFeedback,
"Izaberi težinu.",
"warn"
);

return;

}



target =
Math.floor(
Math.random()*RANGES[selectedLevel]
)+1;



attempts=0;

inProgress=true;



setupScreen.classList.add("hidden");

gameScreen.classList.remove("hidden");



rangeTitle.textContent =
"1 - "+RANGES[selectedLevel];



attemptsDisplay.textContent =
"Pokušaji: 0";


history.innerHTML="";

feedback.textContent="";


guessInput.value="";


startTimer();



});






/* ===============================
 TIMER
================================ */


function startTimer(){

clearInterval(timerInterval);


startTime=Date.now();


timerDisplay.textContent="0s";


timerInterval=setInterval(()=>{


let sec =
Math.floor(
(Date.now()-startTime)/1000
);


timerDisplay.textContent =
sec+"s";


},1000);


}




function getSeconds(){

return Math.floor(
(Date.now()-startTime)/1000
);

}






/* ===============================
 POGAĐANJE
================================ */


function checkGuess(){


if(!inProgress)
return;



let value =
Number(guessInput.value);



let max =
RANGES[selectedLevel];



if(!value){

message(
feedback,
"Unesi broj.",
"warn"
);

return;

}



if(value<1 || value>max){


message(
feedback,
"Broj mora biti između 1 i "+max,
"warn"
);

return;

}




attempts++;


attemptsDisplay.textContent =
"Pokušaji: "+attempts;


if(value===target){

    inProgress=false;

    clearInterval(timerInterval);

    let sec=getSeconds();


    addChip(value,"ok");


    showVictory(

        "BRAVO! 🏆",

        "Pogodili ste tačan broj!",

        [
            {
                icon:"🎯",
                label:"Broj",
                value:target
            },
            {
                icon:"🔢",
                label:"Pokušaji",
                value:attempts
            },
            {
                icon:"⏱",
                label:"Vrijeme",
                value:sec+" s"
            }
        ]

    );

    message(
    feedback,
    "🎉 Bravo! "+attempts+" pokušaja • "+sec+"s",
    "ok"
    );


    saveResult(
	playerName,
    selectedLevel,
    attempts,
    sec
    );


    newGameBtn.classList.remove("hidden");

}



else if(value<target){


addChip(value,"low");


message(
feedback,
"Veći broj ⬆",
"low"
);


}



else{


addChip(value,"high");


message(
feedback,
"Manji broj ⬇",
"high"
);


}



guessInput.value="";

guessInput.focus();


}





guessBtn.addEventListener(
"click",
checkGuess
);



guessInput.addEventListener(
"keydown",
e=>{

if(e.key==="Enter")
checkGuess();

});






/* ===============================
 HISTORIJA
================================ */


function addChip(number,type){


let span=document.createElement("span");


span.className="chip";


let icon="";


if(type==="ok"){

span.classList.add("chip-ok");

icon="✓";

}

else if(type==="low"){

span.classList.add("chip-low");

icon="⬆";

}

else{

span.classList.add("chip-high");

icon="⬇";

}



span.textContent =
number+" "+icon;



history.appendChild(span);


}







/* ===============================
 SAVE REZULTATA
================================ */


function saveResult(
name,
level,
attempts,
seconds
){



records.push({

name:name,

level:level,

attempts:attempts,

seconds:seconds,

date:new Date().toISOString()

});



records.sort((a,b)=>{

if(a.attempts !== b.attempts)
return a.attempts - b.attempts;

return a.seconds - b.seconds;

});



localStorage.setItem(
"pogodiBrojRezultati",
JSON.stringify(records)
);



renderLeaderboard();


}







/* ===============================
 TABOVI
================================ */


document.querySelectorAll(".tab")
.forEach(tab=>{


tab.addEventListener("click",()=>{


document.querySelectorAll(".tab")
.forEach(t=>t.classList.remove("active"));


tab.classList.add("active");


leaderboardLevel =
tab.dataset.level;



renderLeaderboard();



});


});






/* ===============================
 RANG LISTA
================================ */


function renderLeaderboard(){



const list =
document.getElementById("lb-list");


const empty =
document.getElementById("lb-empty");



list.innerHTML="";



let filtered =
records.filter(r=>
r.level===leaderboardLevel
);



if(filtered.length===0){


empty.style.display="";


return;


}



empty.style.display="none";



filtered
.slice(0,10)
.forEach((r,i)=>{


let li=document.createElement("li");



if(i===0)
li.classList.add("rank-gold");


if(i===1)
li.classList.add("rank-silver");


if(i===2)
li.classList.add("rank-bronze");




let place =
i===0 ? "🥇" :
i===1 ? "🥈" :
i===2 ? "🥉" :
(i+1)+".";



li.innerHTML=`

<strong>${place}</strong>

<span style="flex:1">
${r.name}
</span>

<span>
${r.attempts} pokušaja
</span>

<span>
${r.seconds}s
</span>

`;



list.appendChild(li);



});


}







/* ===============================
 NOVA IGRA
================================ */


newGameBtn.addEventListener(
"click",
()=>{


clearInterval(timerInterval);


gameScreen.classList.add("hidden");


setupScreen.classList.remove("hidden");


newGameBtn.classList.add("hidden");


message(feedback,"");


});






renderLeaderboard();



function goBack(){

window.location.href="minigames.html";

}
function showVictory(title,text,stats=[]){

    document
    .getElementById("victory-title")
    .textContent=title;


    document
    .getElementById("victory-text")
    .textContent=text;


    const box =
    document.getElementById("victory-stats");


    box.innerHTML="";


    stats.forEach(item=>{

        const div=document.createElement("div");

        div.className="victory-item";


        div.innerHTML=`

            <span>
            ${item.icon} ${item.label}
            </span>

            <strong>
            ${item.value}
            </strong>

        `;


        box.appendChild(div);


    });



    document
    .getElementById("victory-overlay")
    .classList
    .add("show");


}



function closeVictory(){

    document
    .getElementById("victory-overlay")
    .classList
    .remove("show");

}