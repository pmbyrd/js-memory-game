let card1 = null
let card2 = null
let flippedCards = 0
let noClicking = false

const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

  }
}

// TODO: Implement this function!
//this function is listening for the event in the create div function 
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  if(noClicking) return //early exit a psuedo don't listen for the click
  if(event.target.classList.contains("flipped")) return   //early exit if the card is already clicked
 
  console.log("you just clicked", event.target);
 
  let currentCard = event.target
  let color = event.target.getAttribute("class")
  console.log(color)
  currentCard.style.backgroundColor = color
   //each card has two sides a blank side and a face up/flipped side
  // console.log(card1, card2)  //works
// I want the to transfer the the currentCard value to either be card1 or card2
//It will be ONE **OR** THE OTHER || OR being the keyword


if (!card1 || !card2) {
  currentCard.classList.add("flipped")
  card1 = card1 || currentCard
  card2 = currentCard === card1 ? null : currentCard
} 

// check for match will also restore values to defaults once a match is found and if a match is not found
if(card1 && card2) {                
  noClicking = true                       //if they are both active, than no clicking
  let flippedCard1 = card1.className
  let flippedCard2 = card2.className
  console.log(flippedCard1, flippedCard2)
  if(flippedCard1 === flippedCard2) {
    flippedCards += 2                     //add to the global variable to later complete the game
    card1.removeEventListener("click", handleCardClick)
    card2.removeEventListener("click", handleCardClick)
    card1 = null
    card2 = null
    noClicking = false
  } else {
    setTimeout(function() {
      card1.classList.remove('flipped')
      card2.classList.remove("flipped")
      card1.style.backgroundColor = ""
      card2.style.backgroundColor = ""
      card1 = null
      card2 = null
      noClicking = false
    }, 1000)
  }
}


if (flippedCards === COLORS.length) {
  alert ("All matches found!!!")
}
  // console.log(currentCard, card1, card2)
}



// when the DOM loads
/* */
createDivsForColors(shuffledColors);

 
  // console.log(flippedCard1, flippedCard2)
