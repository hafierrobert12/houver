const hamburger=document.getElementById("hamburger")
const nav=document.getElementById("nav")

hamburger.onclick=()=>{

nav.classList.toggle("show")

}



const quotes=[

"There is no friend as loyal as a book. — Ernest Hemingway",

"Not all those who wander are lost. — J.R.R. Tolkien",

"A reader lives a thousand lives before he dies.",

"The only thing you absolutely have to know is the location of the library."

]

document.getElementById("dailyQuote").innerText=

quotes[Math.floor(Math.random()*quotes.length)]



const slides=document.getElementById("slides")

document.getElementById("right").onclick=()=>{

slides.scrollLeft+=300

}

document.getElementById("left").onclick=()=>{

slides.scrollLeft-=300

}



const bookSlides=document.getElementById("bookSlides")

document.getElementById("bookRight").onclick=()=>{

bookSlides.scrollLeft+=300

}

document.getElementById("bookLeft").onclick=()=>{

bookSlides.scrollLeft-=300

}



document.getElementById("postBtn").onclick=()=>{

const name=document.getElementById("username").value
const message=document.getElementById("message").value

if(name==""||message=="") return

const post=document.createElement("p")

post.innerHTML="<b>"+name+"</b>: "+message

document.getElementById("posts").appendChild(post)

document.getElementById("message").value=""

}
