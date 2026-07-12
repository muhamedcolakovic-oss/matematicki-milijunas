/* ==================================
   POGODI BROJ - JAVASCRIPT
================================== */


const RANGES = {
    "50":50,
    "100":100,
    "1000":1000
};



let selectedLevel = null;

let target = 0;

let attempts = 0;

let inProgress = false;

let startTime = null;

let timerInterval = null;



// UČITAVANJE REZULTATA IZ BROWSERA

let records = JSON.parse(
    localStorage.getItem("pogodiBrojRezultati")
) || [];




const setupScreen =
document.getElementById("setup-screen");


const gameScreen =
document.getElementById("game-screen");


const nameInput =
document.getElementById("player-name");


const setupFeedback =
document.getElementById("setup-feedback");


const guessInput =
document.getElementById("guess-input");


const guessBtn =
document.getElementById("guess-btn");


const feedback =
document.getElementById("feedback");


const history =
document.getElementById("history");


const attemptsDisplay =
document.getElementById("attempts-display");


const timerDisplay =
document.getElementById("timer-display");


const rangeTitle =
document.getElementById("game-range-title");


const newGameBtn =
document.getElementById("new-game-btn");





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
 NIVOI
================================ */


document.querySelectorAll(".level-tile")
.forEach(button=>{


    button.addEventListener("click",()=>{


        document
        .querySelectorAll(".level-tile")
        .forEach(b=>
            b.classList.remove("active")
        );


        button.classList.add("active");


        selectedLevel =
        button.dataset.level;


    });


});






/* ===============================
 START IGRE
================================ */


document
.getElementById("start-btn")
.addEventListener("click",()=>{


    const name =
    nameInput.value.trim();



    if(!name){

        message(
            setupFeedback,
            "Unesi ime igrača.",
            "warn"
        );

        return;

    }



    if(!selectedLevel){


        message(
            setupFeedback,
            "Izaberi interval.",
            "warn"
        );


        return;

    }




    target =
    Math.floor(
        Math.random() *
        RANGES[selectedLevel]
    ) + 1;



    attempts=0;

    inProgress=true;



    setupScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");



    rangeTitle.textContent =
    "1 - " + RANGES[selectedLevel];



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



    timerInterval =
    setInterval(()=>{


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
 POKUŠAJ
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



        addChip(value,"ok");



        let sec=getSeconds();



        message(
            feedback,
            "🎉 Bravo! "+attempts+
            " pokušaja • "+sec+"s",
            "ok"
        );



        saveResult(
            nameInput.value.trim(),
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


let span =
document.createElement("span");


span.className =
"chip ";


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
 SPREMANJE
================================ */


function saveResult(
name,
level,
attempts,
seconds
){



records.push({

name:name,

level:"1-"+RANGES[level],

attempts:attempts,

seconds:seconds,

date:new Date().toISOString()

});





records.sort((a,b)=>{


if(a.attempts!==b.attempts)

return a.attempts-b.attempts;


return a.seconds-b.seconds;


});




records =
records.slice(0,10);





localStorage.setItem(

"pogodiBrojRezultati",

JSON.stringify(records)

);





renderLeaderboard();


}






/* ===============================
 RANG LISTA
================================ */


function renderLeaderboard(){


const list =
document.getElementById("lb-list");


const empty =
document.getElementById("lb-empty");



list.innerHTML="";



if(records.length===0){


empty.style.display="";


return;

}



empty.style.display="none";





records.forEach((r,i)=>{


let li =
document.createElement("li");



li.innerHTML = `

<strong>${i+1}.</strong>

<span style="flex:1">
${r.name}
</span>

<span>
${r.level}
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






// odmah prikaži stare rezultate

renderLeaderboard();

function goBack(){

    window.location.href="minigames.html";

}