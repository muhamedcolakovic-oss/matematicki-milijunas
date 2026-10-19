/* =========================================
   PREMIUM SPIN WHEEL JS
========================================= */


const COLORS = [
"#2563eb",
"#D9B95B",
"#ef4444",
"#10b981",
"#8b5cf6",
"#ec4899",
"#06b6d4",
"#f97316"
];


let players = [];

let rotation = 0;

let spinning = false;


// ===============================
// SOUND ENGINE
// ===============================

let audioCtx;


function getAudio(){

    if(!audioCtx){

        audioCtx =
        new (window.AudioContext ||
        window.webkitAudioContext)();

    }

    return audioCtx;

}



function playTick(){

const a=getAudio();

const osc=a.createOscillator();

const gain=a.createGain();


osc.type="square";

osc.frequency.value=900;


gain.gain.setValueAtTime(
0.04,
a.currentTime
);


gain.gain.exponentialRampToValueAtTime(
0.001,
a.currentTime+0.04
);


osc.connect(gain);

gain.connect(a.destination);


osc.start();

osc.stop(
a.currentTime+0.04
);


}



function playWin(){

const a=getAudio();


[523,659,784,1047].forEach((f,i)=>{


const osc=a.createOscillator();

const gain=a.createGain();


osc.frequency.value=f;


osc.connect(gain);

gain.connect(a.destination);


gain.gain.setValueAtTime(
0.08,
a.currentTime+i*0.12
);


gain.gain.exponentialRampToValueAtTime(
0.001,
a.currentTime+i*0.12+0.4
);


osc.start(
a.currentTime+i*0.12
);


osc.stop(
a.currentTime+i*0.12+0.4
);


});


}


const canvas = document.getElementById("wheel-canvas");

const ctx = canvas.getContext("2d");



function resizeWheel(){

const size = Math.min(
window.innerWidth * 0.82,
window.innerHeight * 0.55
);

const dpr = window.devicePixelRatio || 1;


canvas.style.width = size+"px";
canvas.style.height = size+"px";


canvas.width = size * dpr;
canvas.height = size * dpr;


ctx.setTransform(
dpr,
0,
0,
dpr,
0,
0
);


drawWheel();

}





/* ===============================
   DRAW WHEEL
================================ */


function drawWheel(){

const dpr = window.devicePixelRatio || 1;

const w = canvas.width / dpr;

const cx = w / 2;
const cy = w / 2;

const r = w / 2 - 15;


ctx.clearRect(0,0,w,w);



// glow

ctx.beginPath();

ctx.arc(cx,cy,r+8,0,Math.PI*2);

ctx.strokeStyle="#F6DD8C";

ctx.lineWidth=4;

ctx.shadowBlur=25;

ctx.shadowColor="#F6DD8C";

ctx.stroke();

ctx.shadowBlur=0;



if(players.length===0){


ctx.beginPath();

ctx.arc(cx,cy,r,0,Math.PI*2);

ctx.fillStyle="rgba(255,255,255,.05)";

ctx.fill();


ctx.fillStyle="#cbd5e1";

ctx.font="700 18px DM Sans";

ctx.textAlign="center";

ctx.fillText(
"Dodaj igrače",
cx,
cy
);


return;

}




const n = players.length;

const arc = Math.PI*2/n;




players.forEach((name,i)=>{


const start = rotation + i*arc;

const end = start + arc;



ctx.beginPath();

ctx.moveTo(cx,cy);

ctx.arc(cx,cy,r,start,end);

ctx.closePath();


ctx.fillStyle = COLORS[i % COLORS.length];

ctx.fill();




ctx.save();


ctx.translate(cx,cy);

ctx.rotate(start+arc/2);



ctx.fillStyle="white";

ctx.font="900 16px DM Sans";

ctx.textAlign="center";


ctx.fillText(
name.substring(0,12),
r*.62,
5
);



ctx.restore();



});






// centar


ctx.beginPath();

ctx.arc(
cx,
cy,
42,
0,
Math.PI*2
);


ctx.fillStyle="#020617";

ctx.fill();



ctx.strokeStyle="#F6DD8C";

ctx.lineWidth=3;

ctx.stroke();




ctx.fillStyle="#F6DD8C";

ctx.font="900 13px DM Sans";

ctx.textAlign="center";


ctx.fillText(
"SPIN",
cx,
cy+5
);



}








/* ===============================
 ADD PLAYER
================================ */


document
.getElementById("add")
.addEventListener("click",()=>{


const input =
document.getElementById("player-input");


const name =
input.value.trim();



if(name){


players.push(name);


input.value="";


renderPlayers();

drawWheel();


}


});






/* ENTER ZA DODAVANJE */


document
.getElementById("player-input")
.addEventListener("keypress",e=>{

if(e.key==="Enter"){

document.getElementById("add").click();

}

});







function renderPlayers(){

document
.getElementById("player-count")
.querySelector("span")
.innerHTML = players.length;


const box =
document.getElementById("player-list");


box.innerHTML="";



players.forEach((p,i)=>{


const div =
document.createElement("div");

div.className="player-item";



div.innerHTML=`

<span style="
width:14px;
height:14px;
border-radius:50%;
background:${COLORS[i%COLORS.length]}
"></span>


<span>${p}</span>


<button>×</button>

`;




div.querySelector("button")
.onclick=()=>{


players.splice(i,1);


renderPlayers();

drawWheel();


};



box.appendChild(div);



});



}









/* ===============================
 SPIN
================================ */


document
.getElementById("spin-btn")
.onclick = spin;


function spin(){


if(
    spinning ||
    players.length < 2
){
    return;
}



spinning = true;



// broj okretaja
const turns =
Math.PI * 2 *
(6 + Math.random() * 5);



// trajanje
const duration =
4500 +
Math.random() * 1500;



const start =
performance.now();



const startRotation =
rotation;



let lastSeg = -1;



const n = players.length;

const arc =
Math.PI * 2 / n;




function animate(time){


    let progress =
    Math.min(
        (time - start) / duration,
        1
    );



    // smooth usporavanje
    let ease =
    1 - Math.pow(1-progress,4);



    rotation =
    startRotation +
    turns * ease;



    drawWheel();



    /*
        SOUND TICK
        prati prelazak preko segmenata
    */


    const pointer =
    (
        (-rotation % (Math.PI*2))
        +
        Math.PI*2
    )
    %
    (Math.PI*2);



    const currentSegment =
    Math.floor(
        (pointer + Math.PI/2)
        /
        arc
    )
    % n;



    if(currentSegment !== lastSeg){

        playTick();

        lastSeg =
        currentSegment;

    }




    if(progress < 1){


        requestAnimationFrame(
            animate
        );


    }else{


        spinning = false;


        selectWinner();


    }


}



requestAnimationFrame(
    animate
);


}





/* ===============================
 WINNER
================================ */


function selectWinner(){


const n = players.length;


const arc =
Math.PI*2/n;




const pointer =
(
(-rotation%(Math.PI*2))
+
Math.PI*2
)
%(Math.PI*2);



const index =
Math.floor(
(pointer+Math.PI/2)
/
arc
)%players.length;




showWinner(players[index]);

confetti();


}







/* ===============================
 POPUP
================================ */


function showWinner(name){

playWin();

document
.getElementById("winner")
.innerHTML =
"🎉 "+name;



document
.getElementById("overlay")
.style.display="flex";


}





function closePopup(){


document
.getElementById("overlay")
.style.display="none";


}

function removeWinner(){

const name =
document
.getElementById("winner")
.innerText
.replace("🎉 ","");


const index =
players.indexOf(name);


if(index!==-1){

players.splice(index,1);

}


renderPlayers();

drawWheel();

closePopup();

}




function confetti(){


const colors = [

"#F6DD8C",
"#D9B95B",
"#2563eb",
"#60a5fa",
"#34d399",
"#f472b6",
"#ef4444",
"#c084fc",
"#fb923c"

];


const shapes=[

"rect",
"circle",
"triangle"

];



for(let i=0;i<150;i++){


const el=document.createElement("div");


el.className="confetti-new";



el.style.left =
Math.random()*100+"vw";



const size =
6 + Math.random()*10;



el.style.width=size+"px";

el.style.height=size+"px";



const shape =
shapes[
Math.floor(
Math.random()*shapes.length
)
];



const color =
colors[
Math.floor(
Math.random()*colors.length
)
];





if(shape==="circle"){


el.style.background=color;

el.style.borderRadius="50%";


}



else if(shape==="triangle"){


el.style.width="0";

el.style.height="0";


el.style.borderLeft =
`${size/2}px solid transparent`;


el.style.borderRight =
`${size/2}px solid transparent`;


el.style.borderBottom =
`${size}px solid ${color}`;


}



else{


el.style.background=color;


if(Math.random()>0.5){

el.style.height =
(size*1.7)+"px";

}


el.style.borderRadius="2px";


}






const duration =
2.5 + Math.random()*2.5;


const delay =
Math.random()*1.2;


const drift =
(Math.random()-0.5)*160;


const rotation =
(Math.random()-0.5)*1080;




el.style.setProperty(
"--dur",
duration+"s"
);



el.style.setProperty(
"--delay",
delay+"s"
);



el.style.setProperty(
"--drift",
drift+"px"
);



el.style.setProperty(
"--rot",
rotation+"deg"
);





if(Math.random()>0.5){

el.style.boxShadow =
`0 0 12px ${color}`;

}




document.body.appendChild(el);



setTimeout(()=>{

el.remove();

},
(duration+delay)*1000+500);



}



}

/* ===============================
 CENTER SPIN CLICK
================================ */

canvas.addEventListener("click", function(e){


const rect = canvas.getBoundingClientRect();


// skaliranje ako je canvas resize-an
const x =
(e.clientX - rect.left) *
(canvas.width / rect.width);


const y =
(e.clientY - rect.top) *
(canvas.height / rect.height);



const cx = canvas.width / 2;

const cy = canvas.height / 2;


const dpr = window.devicePixelRatio || 1;
// udaljenost od centra
const distance =
Math.sqrt(
Math.pow(x/dpr-cx,2) +
Math.pow(y/dpr-cy,2)
);



// radius centra SPIN dugmeta
if(distance <= cx){

    spin();

}


});

/* ===============================
 INIT
================================ */


window.addEventListener(
"resize",
resizeWheel
);


resizeWheel();

// AUTOMATSKI FOKUS NA UNOS IGRAČA
window.addEventListener("load",()=>{

    document
    .getElementById("player-input")
    .focus();

});