function addEvent(object, evName, fnName, cap) {
	if (object.attachEvent)
		object.attachEvent("on" + evName, fnName);
	else if (object.addEventListener)
		object.addEventListener(evName, fnName, cap);
}

addEvent(window, "load", main, false);

function main() {
	createSidebar();
}

function createSidebar() {
	var sidebar = document.getElementById("sidebar");
	var gameList = document.createElement("ul");
	var sidebarItems = [];

	for (var i = 0; i < linkList.length; i++) {
		sidebarItems[i] = document.createElement("li");
		sidebarItems[i].innerHTML = "<a href='#'>" + linkList[i] + "</a>";
		sidebarItems[i].index = i;
		gameList.appendChild(sidebarItems[i]);
	}

	sidebarItems[0].onclick = function() {
		createGame(createCardSet(frontSets[0], backSets[0]));
	}

	sidebarItems[1].onclick = function() {
		createGame(createCardSet(frontSets[1], backSets[1]));
	}

	sidebarItems[2].onclick = function() {
		createGame(createCardSet(frontSets[2], backSets[2]));
	}

	sidebar.appendChild(gameList);
}

function createCardSet(frontPhrases, backPhrases) {
	var cards = [];

	// Populate the cards array with a bunch of stuff
	for (var i = 0; i < frontPhrases.length; i++) {
		cards[i] = document.createElement("div");
		cards[i].className = "card";
		cards[i].id = "currentCard";
		cards[i].index = i;

		cards[i].front = document.createElement("p");
		cards[i].front.id = "front";
		cards[i].front.innerHTML = frontPhrases[i];

		cards[i].back = document.createElement("p");
		cards[i].back.id = "back";
		cards[i].back.innerHTML = backPhrases[i];

		// show the front of the card first.
		cards[i].appendChild(cards[i].front);
	}

	return cards;
}

function createGame(cards) {
	var cardBox = document.getElementById("flashcards");

	if (document.getElementById("currentCard")) {
		cardBox.removeChild(document.getElementById("currentCard"));
	}

	if (document.getElementById("cardFooter")) {
		cardBox.removeChild(document.getElementById("cardFooter"));
	}

	// Start with the first card
	cardBox.appendChild(cards[0]);

	var cardFooter = document.createElement("p");
	cardFooter.id = "cardFooter";

	var prevButton = document.createElement("input");
	prevButton.type = "image";
	prevButton.src = "prev.png";
	prevButton.alt = "Previous Card";
	prevButton.onclick = function() {
		// Get the index of the current card
		var currentCard = document.getElementById("currentCard");
		var currentIndex = currentCard.index;

		// Decrease the index.
		currentIndex--;

		// If currentCard is the first card, go to the end
		if (currentIndex == -1) {
			currentIndex = cards.length - 1;
		}

		// Change the card.
		changeCard(cards[currentIndex]);
	}
	cardFooter.appendChild(prevButton);

	var flipButton = document.createElement("input");
	flipButton.type = "image";
	flipButton.src = "flip.png";
	flipButton.alt = "Flip Card";
	flipButton.onclick = function() {
		flipCard(currentCard);
	}
	cardFooter.appendChild(flipButton);

	var nextButton = document.createElement("input");
	nextButton.type = "image";
	nextButton.src = "next.png";
	nextButton.alt = "Next Card";
	nextButton.onclick = function() {
		// Get the index of the current card
		var currentCard = document.getElementById("currentCard");
		var currentIndex = currentCard.index;

		// Increase the index.
		currentIndex++;

		// If currentCard is the last card, go to the beginning
		if (currentIndex == cards.length) currentIndex = 0;

		// Change the card.
		changeCard(cards[currentIndex]);
	}
	cardFooter.appendChild(nextButton);

	cardBox.appendChild(cardFooter);
}

function flipCard() {
	var cardBox = document.getElementById("flashcards");
	var currentCard = document.getElementById("currentCard");

	if (document.getElementById("front")) {
		currentCard.removeChild(currentCard.front);
		currentCard.appendChild(currentCard.back);
	}
	else if (document.getElementById("back")) {
		currentCard.removeChild(currentCard.back);
		currentCard.appendChild(currentCard.front);
	}
}

function changeCard(card) {
	var cardBox = document.getElementById("flashcards");
	var oldCard = document.getElementById("currentCard");

	// Replace current card with new card
	cardBox.removeChild(oldCard);
	cardBox.appendChild(card);
}