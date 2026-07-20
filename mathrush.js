/* ==================================
   MATH RUSH PREMIUM JS
================================== */


let selectedLevel = null;

let leaderboardLevel = "easy";
let gameOver = false;

let score = 0;
let combo = 0;
let maxCombo = 0;
let correct = 0;


let timeLeft = 60;
let timerInterval = null;


let currentAnswer = 0;

let playerName = "";

const correctEl =
document.getElementById("correct");
const newGameBtn =
document.getElementById("new-game-btn");



// ===============================
// BACK
// ===============================


function goBack(){

    window.location.href="minigames.html";

}






// ===============================
// ELEMENTI
// ===============================


const levels =
document.querySelectorAll(".level-tile");


const startBtn =
document.getElementById("start-btn");


const setup =
document.getElementById("setup-screen");


const game =
document.getElementById("game-screen");


const question =
document.getElementById("question");


const answerInput =
document.getElementById("answer");


const answerBtn =
document.getElementById("answer-btn");


const timer =
document.getElementById("timer");


const scoreEl =
document.getElementById("score");


const comboEl =
document.getElementById("combo");






// ===============================
// ODABIR NIVOA
// ===============================


levels.forEach(level=>{


    level.onclick=()=>{


        levels.forEach(x=>{

            x.classList.remove("active");

        });



        level.classList.add("active");


        selectedLevel =
        level.dataset.level;


        leaderboardLevel =
        selectedLevel;


    };


});







// ===============================
// START
// ===============================


startBtn.onclick=function(){


playerName =
document.getElementById("player-name").value.trim();


if(!playerName){

    const names = [
        "Matematičar",
        "Genije",
        "Brzi Proračun",
        "Math Master",
        "Raketa",
        "Kalkulator"
    ];


    playerName =
    names[
        Math.floor(
            Math.random()*names.length
        )
    ];

}



if(!selectedLevel){


document
.getElementById("setup-feedback")
.innerHTML=
"⚠️ Izaberi težinu igre";


return;


}



setup.classList.add("hidden");


game.classList.remove("hidden");



score=0;

combo=0;

maxCombo=0;

correct=0;



updateStats();


startTimer();


generateQuestion();



};









// ===============================
// TIMER
// ===============================


function startTimer(){


clearInterval(timerInterval);



if(selectedLevel==="easy")

timeLeft=30;



if(selectedLevel==="medium")

timeLeft=60;



if(selectedLevel==="hard")

timeLeft=90;



timer.textContent =
timeLeft+"s";



timerInterval =
setInterval(()=>{


timeLeft--;


timer.textContent =
timeLeft+"s";



if(timeLeft<=0){


clearInterval(timerInterval);


endGame();


}



},1000);



}









// ===============================
// GENERISANJE PITANJA
// ===============================


function generateQuestion(){


let a,b,op;



if(selectedLevel==="easy"){


a=random(1,20);

b=random(1,20);



if(Math.random()<0.5){


op="+";

currentAnswer=a+b;


}

else{


op="-";

currentAnswer=a-b;


}



}







if(selectedLevel==="medium"){


let type=random(1,3);



if(type===1){


a=random(2,50);

b=random(2,50);


op="+";

currentAnswer=a+b;


}


if(type===2){


a=random(2,50);

b=random(2,50);


op="-";

currentAnswer=a-b;


}



if(type===3){


b=random(2,12);


currentAnswer=random(2,12);


a=currentAnswer*b;


op="÷";


}



}








if(selectedLevel==="hard"){



a=random(10,200);

b=random(5,50);



let r=random(1,3);



if(r===1){


op="+";

currentAnswer=a+b;


}


if(r===2){


op="-";

currentAnswer=a-b;


}


if(r===3){


op="×";

currentAnswer=a*b;


}


}







question.innerHTML =
`${a} ${op} ${b} = ?`;



answerInput.value="";


answerInput.focus();


}








// ===============================
// ODGOVOR
// ===============================


answerBtn.onclick =
checkAnswer;



answerInput.addEventListener(
"keydown",
e=>{


if(e.key==="Enter" && !gameOver)

checkAnswer();


});


function checkAnswer(){

    if(gameOver)
        return;


    if(answerInput.value==="")
        return;



    let value = Number(answerInput.value);



    if(value===currentAnswer){


        correct++;


        combo++;


        if(combo>maxCombo)

            maxCombo=combo;



        score += 10 + combo*2;



        showMessage(
            "🔥 BRAVO! TAČNO!",
            "#15803d"
        );


        screenEffect("correct");


        questionEffect("correct-pop");



    }

    else{


        combo=0;



        showMessage(
            "❌ NETAČNO! Odgovor je "+currentAnswer,
            "#dc2626"
        );


        screenEffect("wrong");


        questionEffect("wrong-shake");



    }




    updateStats();


    generateQuestion();



}



function updateStats(){


scoreEl.textContent =
score;


comboEl.textContent =
combo;

correctEl.innerHTML = correct;

}
// ===============================
// KRAJ IGRE
// ===============================


function endGame(){


clearInterval(timerInterval);


// 🔒 ZAKLJUČAJ IGRU
gameOver = true;


answerInput.disabled = true;
answerBtn.disabled = true;


// skloni fokus
answerInput.blur();


// sačuvaj rezultat
saveScore();


// pokaži kraj
showVictory();


}







// ===============================
// LOCAL STORAGE
// ===============================


function getRecords(){


return JSON.parse(

localStorage.getItem("mathrushRezultati")

)

||

[];


}







function saveScore(){



let data =
getRecords();




data.push({

    name:playerName,

    level:selectedLevel,

    score:score,

    combo:maxCombo,

    correct:correct,

    date:new Date().toISOString()

});






data.sort((a,b)=>{


return b.score-a.score;


});





localStorage.setItem(

"mathrushRezultati",

JSON.stringify(data)

);




renderLeaderboard();



}









// ===============================
// RANG LISTA
// ===============================


function renderLeaderboard(){



const list =
document.getElementById("lb-list");



const empty =
document.getElementById("lb-empty");



if(!list)

return;




list.innerHTML="";





let data =
getRecords();





let filtered =
data.filter(
x=>x.level===leaderboardLevel
);







if(filtered.length===0){



empty.style.display="block";


return;


}





empty.style.display="none";







filtered
.slice(0,10)
.forEach((x,i)=>{



let li =
document.createElement("li");






let medal =


i===0 ? "🥇" :

i===1 ? "🥈" :

i===2 ? "🥉" :

(i+1)+".";






if(i===0)

li.classList.add(
"rank-gold"
);



if(i===1)

li.classList.add(
"rank-silver"
);



if(i===2)

li.classList.add(
"rank-bronze"
);








li.innerHTML=`

<strong>
${medal}
</strong>



<span style="flex:1">

${x.name}

</span>




<span>

🏆 ${x.score}

</span>



<span>

🔥 ${x.combo}

</span>


`;







list.appendChild(li);




});



}









// ===============================
// TABOVI RANG LISTE
// ===============================


document
.querySelectorAll(".tab")
.forEach(tab=>{



tab.onclick=()=>{



document
.querySelectorAll(".tab")
.forEach(t=>{


t.classList.remove(
"active"
);


});





tab.classList.add(
"active"
);





leaderboardLevel =
tab.dataset.level;





renderLeaderboard();




};




});









// ===============================
// VICTORY
// ===============================


function showVictory(){



const overlay =
document.getElementById(
"victory-overlay"
);





document.getElementById(
"victory-title"
)
.textContent=
"BRAVO! 🏆";







document.getElementById(
"victory-text"
)
.innerHTML=


`

Osvojio si 

<b>${score}</b>

bodova!

<br><br>


Tačnih odgovora:

<b>${correct}</b>


<br>


Najveći combo:

<b>${maxCombo}</b>


`;







const stats =
document.getElementById(
"victory-stats"
);




stats.innerHTML="";






let items=[



{

icon:"⚡",

label:"Nivo",

value:selectedLevel

},


{

icon:"🏆",

label:"Bodovi",

value:score

},


{

icon:"🔥",

label:"Combo",

value:maxCombo

}



];







items.forEach(item=>{


let div =
document.createElement("div");



div.className =
"victory-item";



div.innerHTML=

`

<span>

${item.icon}

${item.label}

</span>


<strong>

${item.value}

</strong>


`;



stats.appendChild(div);



});






overlay.classList.add(
"show"
);



}










function closeVictory(){



document
.getElementById(
"victory-overlay"
)
.classList
.remove("show");



}









// ===============================
// PORUKA
// ===============================


function showMessage(text,color){



let box =
document.getElementById(
"feedback"
);



if(!box)

return;




box.innerHTML=text;


box.style.color=color;



setTimeout(()=>{


box.innerHTML="";


},1000);



}









// ===============================
// HELPERS
// ===============================


function random(min,max){


return Math.floor(

Math.random()*(max-min+1)

)+min;


}

newGameBtn.onclick = function(){

    clearInterval(timerInterval);


    gameOver = false;


    score = 0;
    combo = 0;
    maxCombo = 0;
    correct = 0;


    updateStats();


    document
    .getElementById("victory-overlay")
    .classList
    .remove("show");


    answerInput.disabled = false;
    answerBtn.disabled = false;


    generateQuestion();


    startTimer();

};







// ===============================
// LOAD
// ===============================


renderLeaderboard();

function screenEffect(type){

    const effect =
    document.getElementById("answer-effect");


    if(!effect)
        return;


    effect.className="";


    void effect.offsetWidth;


    effect.classList.add(type);


    setTimeout(()=>{

        effect.className="";

    },400);

}

function questionEffect(type){

    if(!question)
        return;


    question.classList.remove(
        "correct-pop",
        "wrong-shake"
    );


    void question.offsetWidth;


    question.classList.add(type);


    setTimeout(()=>{

        question.classList.remove(type);

    },400);

}