let comicObject;
let comicArray;
let charObject;
let charArray;
const params = new URLSearchParams(window.location.search)
let lan = "en";
if (params.get('lan')){
	lan = params.get('lan')
}
let targetLocal = lan + "Name"
async function init() {
	await fetch("./comics.json")
		.then(response => {
			return response.json();
		})
		.then(output => {
			comicObject = output;
			return comicArray = Object.keys(output).sort(function(a,b){return Number(a)-Number(b)});
		})
	await fetch("./characters.json")
		.then(response => {
			return response.json();
		})
		.then(output => {
			charObject = output;
			return charArray = Object.keys(output).sort(function(a,b){return Number(a)-Number(b)})
		})
		
	let navHeader = document.querySelector(".top")
	let navHTML = "<a href='index.html?lan=" + lan + "'> Dragalia Comic Index</a> | <form action='search.html'><input type='text' name='cq' placeholder='Search...'><input type='hidden' name='lan' value='" + lan + "'></form> | <form action='comic.html'><input type='number' name='no' placeholder='Jump to Comic...' pattern='[0-9]+'><input type='hidden' name='lan' value='" + lan + "'></form>"
	navHeader.innerHTML = navHTML + navHeader.innerHTML
	
	let localOutput = '<a href="index.html?lan=en" ' + `${lan == "en" ? 'class="selected"' : 'class'}` + '>ENG</a> <a href="index.html?lan=jp" ' + `${lan == "jp" ? 'class="selected"' : 'class'}` + '>日本語</a> <a href="index.html?lan=chs" ' + `${lan == "chs" ? 'class="selected"' : 'class'}` + '>简</a> <a href="index.html?lan=cht" ' +  `${lan == "cht" ? 'class="selected"' : 'class'}` + '> 繁</a>'
	document.querySelector('.top .local').innerHTML += localOutput
	document.querySelector('li.local').innerHTML += localOutput
	
	search();
};

function search(){
	if (!params.get('cq')){
		return;
	}
	let query = params.get('cq')
	//Search by Comic Name
	console.log(query)
	let nameSearchOutput = [];
	let nameHTML = "";
	for (i = 0; i < comicArray.length; i++){
		let nameComic = comicObject[comicArray[i]][targetLocal]
		if (nameComic.toLowerCase().includes(query.toLowerCase())){
			nameSearchOutput.push(comicArray[i])
		}
	}
	document.querySelector("#name").innerHTML = "<h2>Comics with\u00A0<b>" + query + "</b>\u00A0in the name:</h2><div class='comics'></div>"
	if (nameSearchOutput.length == 0){
		document.querySelector("#name").innerHTML += "No comics found containing \"<b>" + query + "</b>\""
	}
	for (i = 0; i < nameSearchOutput.length; i++){
		let name = comicObject[nameSearchOutput[i]][targetLocal]
		nameHTML += "<a class='card comicCard' href='comic.html?no=" + nameSearchOutput[i] + "&lan=" + lan + "'><div><div class='comicNumb'>" + nameSearchOutput[i] + "</div><img class='thumb' src='thumb/" + nameSearchOutput[i] + ".png'><div class='comicName'>" + name + " </div></div></a>\n";
	}
	document.querySelector("#name .comics").innerHTML += nameHTML
	console.log(nameSearchOutput)
	//Search characters
	let comicCharOutput = [];
	let charHTML = "";
	let characterResult;
	for (i = 0; i < charArray.length; i++){
		if (charArray[i].toLowerCase() == query.toLowerCase()){
			console.log("CHARACTER IS: " + charArray[i])
			characterResult = charArray[i]
			break;
		}
		for (h = 0; h < charObject[charArray[i]].length; h++){
			if (charObject[charArray[i]][h].includes(query)){
				console.log("CHARACTER IS: " + charArray[i])
				characterResult = charArray[i]
				break;
			}
		}
	}
	document.querySelector("#char").innerHTML = "<h2>Comics featuring <b>" + query + "</b>:</h2><div class='comics'></div>"
	if (!characterResult) {
		document.querySelector("#char").innerHTML += "<span>No Character with the name <b>\"" + query + "\"</b> was found.</span>"
	}
	else {
		for(i = 0; i < comicArray.length; i++){
			if(comicObject[comicArray[i]]["characters"].includes(characterResult)){
				comicCharOutput.push(comicArray[i])
			}
		}
	}
	for (i = 0; i < comicCharOutput.length; i++) {
		let name = comicObject[comicCharOutput[i]][targetLocal]
		charHTML += "<a class='card comicCard' href='comic.html?no=" + comicCharOutput[i] + "&lan=" + lan + "'><div><div class='comicNumb'>" + comicCharOutput[i] + "</div><img class='thumb' src='thumb/" + comicCharOutput[i] + ".png'><div class='comicName'>" + name + " </div></div></a>\n";
	}
	document.querySelector("#char .comics").innerHTML += charHTML
}

init();