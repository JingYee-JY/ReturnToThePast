const startButton = document.getElementById("start");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const preview = document.querySelector(".preview-container");
const again = document.querySelector(".again-button");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array
const items = [
    { name: "DragonPlayground", image: "DragonPlayground.png" },
    { name: "DovePlayground", image: "DovePlayground.png" },
    { name: "SirStamfordRafflesStatue", image: "SirStamfordRafflesStatue.png" },
    { name: "NationalTheatre", image: "NationalTheatre.png" },
    { name: "BoatQuay", image: "BoatQuay.png" },
    { name: "SingaporeZoologicalGardens", image: "SingaporeZoologicalGardens.png" },
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
          <div class="card-before">?</div>
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
                controls.classList.remove("hide")
                preview.classList.add("hide")
                again.classList.remove("hide")
                result.innerHTML = `<h2 class="move">Great Job! You did it!</h2>
                <br>
                <br>
                <img class="resize" src="GoodJobPicture.png">
                <br>
                <h2 class="move">You are awesome!</h2>`;
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

  //Start game
startButton.addEventListener("click", () => {
    //controls amd buttons visibility
    controls.classList.add("hide");
    startButton.classList.add("hide");
    again.classList.remove()
    initializer("hide");
  });

  again.addEventListener("click", () => {
    //controls amd buttons visibility
    controls.classList.add("hide");
    again.classList.add("hide");
    initializer("hide");
  });
  //Initialize values and func calls
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
  };