function toggleMenu(){

let menu=document.getElementById("sideMenu");

if(menu.style.right=="0px"){
menu.style.right="-250px";
}else{
menu.style.right="0px";
}

}



function scrollToSection(id){

document.getElementById(id).scrollIntoView({
behavior:"smooth"
});

toggleMenu();

}



function openLogin(){
document.getElementById("loginModal").style.display="flex";
}



function closeLogin(){
document.getElementById("loginModal").style.display="none";
}



const quotes=[

"Literature is the most agreeable way of ignoring life. — Fernando Pessoa",

"A room without books is like a body without a soul. — Cicero",

"Painting is silent poetry. — Plutarch",

"There is no friend as loyal as a book. — Ernest Hemingway"

];

let randomQuote=quotes[Math.floor(Math.random()*quotes.length)];

document.getElementById("dailyQuote").innerText=randomQuote;



function openBook(title,desc){

document.getElementById("bookModal").style.display="flex";

document.getElementById("bookTitle").innerText=title;

document.getElementById("bookDesc").innerText=desc;

}



function closeBook(){

document.getElementById("bookModal").style.display="none";

}



function addPost(){

let username=document.getElementById("username").value;

let content=document.getElementById("postContent").value;

if(content=="") return;

if(username==""){

let anonNames=[
"SilentReader",
"VelvetVerse",
"MoonlitPoet",
"InkDrifter",
"LibraryGhost"
];

username=anonNames[Math.floor(Math.random()*anonNames.length)];

}

let post=document.createElement("div");

post.className="post";

post.innerHTML=

`
<b>${username}</b>
<p>${content}</p>

<div class="post-actions">

<span onclick="likePost(this)">❤️ 0</span>

<span onclick="replyPost(this)">Reply</span>

</div>

<div class="replies"></div>
`;

document.getElementById("posts").prepend(post);

document.getElementById("postContent").value="";

}



function likePost(el){

let num=parseInt(el.innerText.split(" ")[1]);

num++;

el.innerText="❤️ "+num;

}



function replyPost(el){

let text=prompt("Write a reply:");

if(!text) return;

let reply=document.createElement("p");

reply.style.marginLeft="20px";

reply.innerText=text;

el.parentElement.nextElementSibling.appendChild(reply);

}
