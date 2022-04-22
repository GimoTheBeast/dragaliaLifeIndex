let container = document.querySelector(".comic")
let comicObject;
let comicArray;
let numb;
let error = false;
const params = new URLSearchParams(window.location.search)
let lan = "en"
if (params.get('lan')){
	lan = params.get('lan')
}

async function init() {
	await fetch("./comics.json")
		.then(response => {
			return response.json();
		})
		.then(output => {
			comicObject = output;
			return comicArray = Object.keys(output).sort(function(a,b){return Number(a)-Number(b)})
			
		})
	if (!params.get('no')){
		error = true;
		container.innerHTML = "<div class='error'><b>ERROR:</b> No Comic ID.</div><a href='./'>Go back to home</a>"
		console.error("ERROR: No Comic ID.")
		return;
	}
	numb = params.get('no')
	if (numb.length == 1) {
		numb = "00" + numb.toString()
	}
	else if (numb.length == 2){
		numb = "0" + numb.toString()
	}
	else {
		numb = numb.toString()
	}
	let navHTML = "<a href='index.html?lan=" + lan + "'> ← Adventurer's Guide Index</a> | <form action='comic.html'><input type='number' name='no' placeholder='Jump to Comic...' pattern='[0-9]+'><input type='hidden' name='lan' value='" + lan + "'></form>"
	document.querySelector(".top").innerHTML = navHTML + document.querySelector(".top").innerHTML
	let localOutput = '<a href="comic.html?no=' + `${numb}` + '&lan=en" ' + `${lan == "en" ? 'class="selected"' : 'class'}` + '>ENG</a> <a href="comic.html?no=' + `${numb}` + '&lan=jp" ' + `${lan == "jp" ? 'class="selected"' : 'class'}` + '>日本語</a> <a href="comic.html?no=' + `${numb}` + '&lan=chs" ' + `${lan == "chs" ? 'class="selected"' : 'class'}` + '>简</a> <a href="comic.html?no=' + `${numb}` + '&lan=cht" ' +  `${lan == "cht" ? 'class="selected"' : 'class'}` + '> 繁</a>'
	document.querySelector('.top .local').innerHTML += localOutput
	document.querySelector('li.local').innerHTML += localOutput
	
	loadComicBelow();
};
function loadComicBelow(){
	console.log(numb + ":" + comicArray.length)
	if (numb == comicArray.length + 1){
		return;
	}
	if (Number(numb) < 1||Number(numb) > comicArray.length) {
		container.innerHTML += "<div class='error'><b>ERROR:</b> Comic ID out of bounds.</div><a href='./'>Go back to home</a>"
		console.error("ERROR: Comic ID out of bounds.")
		return;
	}
	/*
	<h1>$comicName</h1>
	<div class='info'><h3>Characters</h3>$charArray
	<div class='comicInfo'>
	</div>
	<img src=\"$local/$comicFile\">
	*/
	let targetLocal = lan + "Name"
	let outputHTML = "<h1>" + comicObject[numb][targetLocal] + "</h1><img src='" + lan + "/" + numb + ".png'>"	
	container.innerHTML += outputHTML
	document.title = comicObject[numb][targetLocal]
	
}
init();
window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight){
		let conNumb = Number(numb) + 1
		conNumb = conNumb.toString()
		if (conNumb.length == 1) {
			numb = "00" + conNumb.toString()
		}
		else if (conNumb.length == 2){
			numb = "0" + conNumb.toString()
		}
		else {
			numb = conNumb.toString()
		}
		if (history.pushState) {
			window.history.pushState("test","test","comic.html?no=" + numb + "&lan=" + lan)
		}
		loadComicBelow()
    }
})