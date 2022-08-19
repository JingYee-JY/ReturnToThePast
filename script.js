const startButton = document.getElementById("start");
const gameContainer = document.querySelector(".game-container");
const result = document.querySelector(".result");
const wrapper = document.querySelector(".wrapper");
const controls = document.querySelector(".controls-container");
const preview = document.querySelector(".preview-container");
const again = document.querySelector(".again-button");
const final = document.querySelector(".final");
const howToPlay = document.getElementById("howToPlay");
const instruction1 = document.querySelector(".instruction1");
const instruction2 = document.querySelector(".instruction2");
const close = document.querySelectorAll(".close");
const help = document.getElementById("help");
const pre = document.querySelectorAll(".pre");
const next = document.querySelectorAll(".next");
let cards;
let swipe
let interval;
let firstCard = false;
let secondCard = false;
let seeingInstruction = false;
let instructionPage = 1;
var startingX, startingY, movingX, movingY;

//Items array
const items = [
    { name: "DragonPlayground", image: "./img/DragonPlayground.png" },
    { name: "DovePlayground", image: "./img/DovePlayground.png" },
    { name: "SirStamfordRafflesStatue", image: "./img/SirStamfordRafflesStatue.png" },
    { name: "NationalTheatre", image: "./img/NationalTheatre.png" },
    { name: "BoatQuay", image: "./img/BoatQuay.png" },
    { name: "SingaporeZoologicalGardens", image: "./img/SingaporeZoologicalGardens.png" },
  ];

  //Pick random objects from the items array
const generateRandom = (size = 2) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array
    let cardValues = [];
    //size should be double (4*4 matrix)/2 since pairs of objects would exist
    size = (size * 3) / 2;
    //Random object selection
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      //once selected remove the object from temp array
      tempArray.splice(randomIndex, 1);
    }
    return cardValues;
  };
  const matrixGenerator = (cardValues, size = 2) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * 3; i++) {
      gameContainer.innerHTML += `
       <div class="card-container" data-card-value="${cardValues[i].name}">
          <div class="card-before">${i + 1}</div>
          <div class="card-after">
          <img src="${cardValues[i].image}" class="card-image"/></div>
       </div>
       `;
    }
    //Grid
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  
    //Cards
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
        if (!card.classList.contains("matched")) {
          //flip the cliked card
          card.classList.add("flipped");
          //if it is the firstcard (!firstCard since firstCard is initially false)
          if (!firstCard) {
            //so current card will become firstCard
            firstCard = card;
            //current cards value becomes firstCardValue
            firstCardValue = card.getAttribute("data-card-value");
          } else {
            //secondCard and value
            secondCard = card;
            let secondCardValue = card.getAttribute("data-card-value");
            if (firstCardValue == secondCardValue) {
              //if both cards match add matched class so these cards would beignored next time
              firstCard.classList.add("matched");
              secondCard.classList.add("matched");
              //set firstCard to false since next card would be first now
              firstCard = false;
              //winCount increment as user found a correct match
              winCount += 1;
              //check if winCount ==half of cardValues
              if (winCount == Math.floor(cardValues.length / 2)) {
                let delay = setTimeout(() => {
                  final.classList.remove("hide")
                  wrapper.classList.add("hide")
                result.innerHTML = `
                <div>
                <img class="Finaltitle" src="./img/finalTitle.png">
                </div>
                <div>
                <img class="resize" src="./img/goodJob.png">
                </div>`;
                }, 900); 
              }
            } else {
              //if the cards dont match
              //flip the cards back to normal
              let [tempFirst, tempSecond] = [firstCard, secondCard];
              firstCard = false;
              secondCard = false;
              let delay = setTimeout(() => {
                tempFirst.classList.remove("flipped");
                tempSecond.classList.remove("flipped");
              }, 900);
            }
          }
        }
      });
    });
  };


  function touchstart(evt) {
    startingX = evt.touches[0].clientX
    startingY = evt.touches[0].clientY
  }
  function touchmove(evt) {
    movingX = evt.touches[0].clientX
    movingY = evt.touches[0].clientY
  } 
  function handleInput() {
    control();
}
function control() {
  if(seeingInstruction == true){
   console.log(startingX)
   console.log(movingX)
   if(startingX + 100 < movingX && movingX !== null && startingY + 100 > movingY && startingY-100 < movingY){
   instructionPage = instructionPage - 1 
   swipe = true;
   if(instructionPage == 0){
    instructionPage = 2
    instruction1.classList.add("hide")
    instruction2.classList.remove("hide")
   }
   if(instructionPage == 1){
    instruction1.classList.remove("hide")
    instruction2.classList.add("hide")
   }
   }
   else if(startingX-100 > movingX && movingX !== null && startingY + 100 > movingY && startingY-100 < movingY){
    instructionPage = instructionPage + 1 
    swipe = true;
    if(instructionPage == 2){
     instruction1.classList.add("hide")
     instruction2.classList.remove("hide")
    }
    if(instructionPage == 3){
     instructionPage = 1
     instruction1.classList.remove("hide")
     instruction2.classList.add("hide")
    }
   }
  else if(swipe != true){
      console.log("f")
      return
  }
}
  movingY = null;
  movingX = null;
}

  //Start game
startButton.addEventListener("click", () => {
  if(seeingInstruction == false){
    //controls amd buttons visibility
    controls.classList.add("hide");
    wrapper.classList.remove("hide")
    initializer();
  }  
  });

  again.addEventListener("click", () => {
    //controls amd buttons visibility
    controls.classList.remove("hide");
    final.classList.add("hide")
  });
  help.addEventListener("click", () => {
    instruction1.classList.remove("hide");
    startGame = false;
    instructionPage = 1
})

  howToPlay.addEventListener("click", () => {
    instruction1.classList.remove("hide");
    seeingInstruction = true;
    instructionPage = 1
})

close.forEach(function(item){
  item.addEventListener("click", () => {
  instruction1.classList.add("hide");
  instruction2.classList.add("hide");
  seeingInstruction = false
  startGame = true;
})
})
pre.forEach(function(item){
  item.addEventListener("click", () => {
    console.log("P")
    instructionPage = instructionPage - 1
    if(instructionPage == 1){
      console.log("1")
      instruction1.classList.remove("hide");
      instruction2.classList.add("hide");
    }
    if(instructionPage == 0){
      console.log("2")
      instruction1.classList.add("hide");
      instruction2.classList.remove("hide");
      instructionPage = 2
    }
  
})
})
next.forEach(function(item){
  item.addEventListener("click", () => {
    console.log("N")
    instructionPage = instructionPage + 1
    if(instructionPage == 3){
      console.log("1")
      instruction1.classList.remove("hide");
      instruction2.classList.add("hide");
      instructionPage = 1
    }
    if(instructionPage == 2){
      console.log("2")
      instruction1.classList.add("hide")
      instruction2.classList.remove("hide")
    }
})
})
  //Initialize values and func calls
const initializer = () => {
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
  };