// =======================================
// MINI GAMES PLATFORM SCRIPT
// =======================================


// LANGUAGE

let currentLanguage =
localStorage.getItem("language") || "bs";




// =======================================
// GAMES DATABASE
// =======================================


const igre = [

{
naziv:{
bs:"Pogodi broj",
en:"Guess The Number"
},

opis:{
bs:"Logička igra pogađanja skrivenog broja",
en:"Logic game where you guess the hidden number"
},

link:"pogodibroj.html",

slika:"pogodi-broj.png"

},



{
naziv:{
bs:"Sudoku",
en:"Sudoku"
},

opis:{
bs:"Klasična matematička mozgalica",
en:"Classic mathematical puzzle"
},

link:"sudoku.html",

slika:"sudoku.png"


},
{
naziv:{
    bs:"Matematički heroj",
    en:"Math Hero"
},

    opis:{
        bs:"Postani matematički šampion, rješavaj zadatke, skupljaj XP i razvijaj svoj nivo",
        en:"Become a math champion, solve challenges, earn XP and level up"
    },

link:"math.html",

slika:"math.png"

},

{
naziv:{
    bs:"Točak sreće",
    en:"Spin the Wheel"
},

opis:{
    bs:"Zavrti točak, testiraj sreću i osvoji nagrade",
    en:"Spin the wheel, test your luck and win rewards"
},

link:"spin.html",

slika:"spin.png"

},


{
naziv:{
bs:"Brzi račun",
en:"Math Rush"
},

opis:{
bs:"Testiraj brzinu računanja",
en:"Test your calculation speed"
},

link:"mathrush.html",

slika:"mathrush.png"

},

];





// =======================================
// LOAD GAMES
// =======================================


function loadGames(){


const container =
document.getElementById("games");


if(!container)
return;



container.innerHTML="";



igre.forEach((igra,index)=>{


const card =
document.createElement("div");


card.className="card";


card.style.animationDelay =
`${index*0.1}s`;



card.innerHTML=`

<div class="icon-box">

<img 
src="${igra.slika}"
loading="lazy"
onerror="this.src='minigames1.png'"
>

</div>


<div class="card-text">

<h2>
${igra.naziv[currentLanguage]}
</h2>


<p>
${igra.opis[currentLanguage]}
</p>

</div>


<div class="arrow">
→
</div>

`;




card.onclick=()=>{


card.style.transform="scale(.96)";



localStorage.setItem(
"currentGame",

JSON.stringify({

name:
igra.naziv[currentLanguage],

xp:
igra.xp,

coins:
igra.coins,

time:
Date.now()

})

);



setTimeout(()=>{

window.location.href =
igra.link;


},150);



};



container.appendChild(card);



});



}




// =======================================
// LANGUAGE CHANGE
// =======================================


function changeLanguage(lang){


currentLanguage=lang;


localStorage.setItem(
"language",
lang
);


updateTexts();


loadGames();


}




// =======================================
// TEXT
// =======================================


function updateTexts(){



const title =
document.getElementById("page-title");


const subtitle =
document.getElementById("page-subtitle");



if(!title || !subtitle)
return;




if(currentLanguage==="bs"){


title.textContent =
"Mini Games";


subtitle.textContent =
"Matematičke igre, logički izazovi i zabavne mozgalice";


}

else{


title.textContent =
"Mini Games";


subtitle.textContent =
"Mathematical games, logic challenges and fun puzzles";


}



}





// =======================================
// INIT
// =======================================


updateTexts();

loadGames();

// =======================================
// HOME BUTTON
// =======================================


function goHome(){

    window.location.href = "index.html";

}




// =======================================
// MUSIC CONTROL
// =======================================


const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");


let musicPlaying = false;



if(musicBtn && bgMusic){


    musicBtn.addEventListener("click",()=>{


        if(!musicPlaying){


            bgMusic.play()
            .then(()=>{

                musicPlaying=true;

                musicBtn.textContent="🔊";

                musicBtn.classList.add("playing");


            })
            .catch(error=>{

                console.log("Audio nije pokrenut:",error);

            });



        }


        else{


            bgMusic.pause();


            musicPlaying=false;


            musicBtn.textContent="🔇";


            musicBtn.classList.remove("playing");



        }



    });



}