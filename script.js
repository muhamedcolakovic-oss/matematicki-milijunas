const igre=[

{
naziv:"Pogodi broj",
link:"pogodibroj.html",
slika:"pogodi-broj.png"
},

{
naziv:"Sudoku",
link:"sudoku.html",
slika:"sudoku.png"
}

];



const container=document.getElementById("games");



igre.forEach((igra,index)=>{


let card=document.createElement("div");


card.className="card";


card.style.animationDelay =
`${index*0.08}s`;



card.innerHTML=`

<div class="icon-box">

<img src="${igra.slika}">
</div>


<div class="card-text">

<h2>${igra.naziv}</h2>


</div>


<div class="arrow">
→
</div>


`;



card.onclick=()=>{

window.location.href=igra.link;

};



container.appendChild(card);


});




function goHome(){

window.location.href="index.html";

}