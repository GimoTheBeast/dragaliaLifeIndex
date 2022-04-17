let container = document.querySelector(".comics");
let comicObject;
let comicArray;
let currentComic = 1
const params = new URLSearchParams(window.location.search)
let lan = "en";
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
		loadCard();

	
	//header
	/*
	<a href='index.php?lan=$local'>Dragalia Comic Index</a> | 
	<span>Search bar goes here lmao</span> | 
	Jump to Comic: 
	<form action='comic.html'>
		<input type='text' name='no' placeholder='Comic Number' pattern='[0-9]+'>
		<input type='hidden' name='lan' value='$local'>
	</form>*/
	let navHeader = document.querySelector(".top")
	let navHTML = "<a href='index.html?lan=" + lan + "'> Dragalia Comic Index</a> | <form action='search.html'><input type='text' name='cq' placeholder='Search...'><input type='hidden' name='lan' value='" + lan + "'></form> | <form action='comic.html'><input type='number' name='no' placeholder='Jump to Comic...' pattern='[0-9]+'><input type='hidden' name='lan' value='" + lan + "'></form>"
	navHeader.innerHTML = navHTML + navHeader.innerHTML
	
	
};
function loadCard(numCards = 24){
	if (currentComic == comicArray[comicArray.length]) {
		return;
	}
	for (i = 0; i < numCards; i++){
		if (currentComic < comicArray[comicArray.length]) {}
		let targetLocal = lan + "Name"
		let numb = currentComic - 1
		console.log()
		let imgSrc = comicArray[numb] + ".png"
		let outputHTML = "<a class='card comicCard' href='comic.html?no=" + comicArray[currentComic-1] + "&lan=" + lan + "'><div><div class='comicNumb'>" + comicArray[currentComic-1] + "</div><img class='thumb' src='thumb/" + imgSrc + "'><div class='comicName'>" + comicObject[comicArray[numb]][targetLocal] + " </div></div></a>\n";
		container.innerHTML += outputHTML;
		currentComic += 1;
	}
}
init();
window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight){
    loadCard();
    }
})
