const startButton = document.querySelector(".start");
const easy = document.querySelector(".easy");
const normal = document.querySelector(".normal");
const hard = document.querySelector(".hard");
const BeganGame = document.querySelector(".startGame");
const again = document.querySelector(".again");
const homeButton = document.querySelector(".home")

const startPage = document.querySelector(".startPage");
const selectionPage = document.querySelector(".selectionPage");
const instructionPage = document.querySelector(".instructionPage");
const gamePage = document.querySelector(".gamePage");
const finalPage = document.querySelector(".finalPage");


const gameContainer = document.querySelector(".gameContainer");
const result = document.querySelector(".result");


const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")

let cards;
let flipping;
let swipe
let size
let interval;
let firstCard = false;
let secondCard = false;
var startingX, startingY, movingX, movingY;

//Items array
const items = [
    { name: "Merlion", image: "./img/Merlion.png" },
    { name: "MRT", image: "./img/MRT.png" },
    { name: "NationalTheatre", image: "./img/NationalTheatre.png" },
    { name: "Playground", image: "./img/Playground.png" }
  ];

  //Pick random objects from the items array
const generateRandom = (size) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array
    let cardValues = [];
    //size should be double (4*4 matrix)/2 since pairs of objects would exist
    size = (size * 2) / 2;
    //Random object selection
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      //once selected remove the object from temp array
      tempArray.splice(randomIndex, 1);
    }
    console.log(cardValues)
    return cardValues;
  };
  const matrixGenerator = (cardValues, size) => {
    console.log(gameContainer)
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * 2; i++) {
      gameContainer.innerHTML += `
       <div class="card-container" data-card-value="${cardValues[i].name}">
          <div class="card-before">
          <img src="./img/cardBackground.png" class="card-image"/></div>
          <div class="card-after">
          <img src="${cardValues[i].image}" class="card-image"/></div>
       </div>
       `;
    }    
  
    //Cards
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
        if (!card.classList.contains("matched") && !card.classList.contains("flipped") && !flipping) {
          playClickSound()
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
                  clap.currentTime = 0;
                  clap.play()
                  finalPage.classList.remove("hide")
                  gamePage.classList.add("hide")
                result.src = "./img/goodJob.png"
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
    opening()
  };

  function opening(){
    let Opendelay = setTimeout(() => {
      cards.forEach((card) => {
        card.classList.add("flipped"); 
      })
    }, 200);
    let Closedelay = setTimeout(() => {
      closing()
    }, 2000);
  }

  function closing(){
    cards.forEach((card) => {
      card.classList.remove("flipped");
    })
    let delay = setTimeout(() => {
      flipping = false
      firstCard = null
      secondCard = null
    }, 500);
  }

  //Start game
startButton.addEventListener("click", () => {
    playClickSound()
    //controls amd buttons visibility
    let delay = setTimeout(() => {
      startPage.classList.add("hide");
      selectionPage.classList.remove("hide")
      flipping = true;
    }, 200);
  
  });
  BeganGame.addEventListener("click", () => {
    playClickSound()
    //controls amd buttons visibility
    let delay = setTimeout(() => {
      instructionPage.classList.add("hide");
      initializer();
    }, 200);
  
  });

  easy.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
      size = 2
      began();
    }, 200);
  });

  normal.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
      size = 3
      began();
    }, 200);
  });

  hard.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
      size = 4
      began()
    }, 200);
  });

  again.addEventListener("click", () => {
    playClickSound()
    //controls amd buttons visibility
    let delay = setTimeout(() => {
      startPage.classList.remove("hide");
      finalPage.classList.add("hide")
    }, 200);
  });

  homeButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
      location.assign('https://gimme.sg/activations/dementia/');
    }, 200);
  })
  //Initialize values and func calls
const initializer = () => {
    winCount = 0;
    let cardValues = generateRandom(size);
    matrixGenerator(cardValues,size);
  };

function began(){
  console.log("test")
  selectionPage.classList.add("hide")
  gamePage.classList.remove("hide")
  instructionPage.classList.remove("hide");
}

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
event.preventDefault();
}, { passive: false });