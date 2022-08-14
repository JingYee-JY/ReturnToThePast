const startButton = document.getElementById("start");
const gameContainer = document.querySelector(".game-container");
const result = document.querySelector(".result");
const wrapper = document.querySelector(".wrapper");
const controls = document.querySelector(".controls-container");
const preview = document.querySelector(".preview-container");
const again = document.querySelector(".again-button");
const final = document.querySelector(".final");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

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

  //Start game
startButton.addEventListener("click", () => {
    //controls amd buttons visibility
    controls.classList.add("hide");
    wrapper.classList.remove("hide")
    initializer();
  });

  again.addEventListener("click", () => {
    //controls amd buttons visibility
    controls.classList.remove("hide");
    final.classList.add("hide")
  });
  //Initialize values and func calls
const initializer = () => {
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
  };