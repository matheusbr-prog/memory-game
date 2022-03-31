window.onload = function () {
    localStorage.setItem("cardsPath", "./imageSet1/")
    scramble();
    localStorage.setItem("cardsFlipped", "0")
}

let backImage = document.getElementsByClassName("back");
let frontImage = document.getElementsByClassName("front");
const cards = document.querySelectorAll(".card");

function scramble() {

    let auxPosition = [];
    let imageName = 0;
    let path = localStorage.getItem("cardsPath")


    for (let i = 0; i < 20; i++) {
        auxPosition[i] = imageName;
        auxPosition[++i] = imageName;
        imageName++;
    }

    let imgPosition = [];
    let assingImg;
    let auxPositionLength = auxPosition.length

    for (let j = 0; j < auxPositionLength; j++) {

        assingImg = Math.floor(Math.random() * (auxPositionLength - j))
        imgPosition[j] = auxPosition[assingImg];
        auxPosition.splice(assingImg, 1);
        j++;
        assingImg = Math.floor(Math.random() * (auxPositionLength - j))
        imgPosition[j] = auxPosition[assingImg];
        auxPosition.splice(assingImg, 1);
    }
    for (let aux = 0; aux < backImage.length; aux++) {
        backImage[aux].innerHTML = "<img src='" + path + imgPosition[aux] + ".PNG'>";
        cards[aux].setAttribute("imgID", imgPosition[aux])
        cards[aux].setAttribute("position", aux);
    }
}

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {

    let imgMatch = this.getAttribute("imgID")

    if (imgMatch == "match") { }
    else {
        let cardsFlipped = localStorage.getItem("cardsFlipped")
        if (cardsFlipped == "0") {
            localStorage.setItem("cardsFlipped", "1")
            localStorage.setItem("card1", this.getAttribute("position"));
            this.classList.toggle("flip");
        }
        else if (cardsFlipped == "1") {
            let testSameCard = localStorage.getItem("card1")

            if (testSameCard == this.getAttribute("position")) console.log("Tente outra posição")
            else {
                localStorage.setItem("card2", this.getAttribute("position"));
                localStorage.setItem("cardsFlipped", "2");
                this.classList.toggle("flip");
                checkMatch();
            }
        }
    }
}

function checkMatch() {

    let card1 = localStorage.getItem("card1")
    let card2 = localStorage.getItem("card2")


    if (cards[card1].getAttribute("imgID") == cards[card2].getAttribute("imgID")) {
        cards[card1].setAttribute("imgID", "match");
        cards[card2].setAttribute("imgID", "match");
        localStorage.removeItem("card1");
        localStorage.removeItem("card2");
        localStorage.setItem("cardsFlipped", "0");
        setTimeout(checkWinner, 200)
    }
    else {
        setTimeout(() => {

            let cardsFlipped = localStorage.getItem("cardsFlipped")
            console.log(cardsFlipped)
            if(cardsFlipped=="0"){}

            else{
                cards[card1].classList.toggle("flip");
                cards[card2].classList.toggle("flip");  
            }
            localStorage.setItem("cardsFlipped", "0");
            localStorage.removeItem("card1");
            localStorage.removeItem("card2");
        }, 1000);
    }
}

function checkWinner() {

    let checkWinner = document.getElementsByClassName("flip")
    if (checkWinner.length == cards.length) {
        alert("parabens, voce concluiu o jogo")
        for (let aux = 0; aux < cards.length; aux++) {
            cards[aux].classList.toggle("flip")
            console.log(cards[aux]);
            console.log(checkWinner.length)
        }
        scramble();
    }

}

let theme = document.querySelector("input[type='checkbox']");

theme.addEventListener("click", updateTheme);

function updateTheme() {

    let cardsFlipped = localStorage.getItem("cardsFlipped");

    let card1 = localStorage.getItem("card1");
    let card2 = localStorage.getItem("card2");

    if (cardsFlipped == "1") {
        cards[parseInt(card1)].classList.toggle("flip");
        localStorage.removeItem("card1");
        console.log("teste")
    }
    else if (cardsFlipped == "2") {
        cards[parseInt(card1)].classList.toggle("flip");
        cards[parseInt(card2)].classList.toggle("flip");
        
    }

    localStorage.setItem("cardsFlipped", "0")

    for (let aux = 0; aux < frontImage.length; aux++) {
        frontImage[aux].classList.toggle("green");
    }

    if (this.checked == true) localStorage.setItem("cardsPath", "./imageSet2/")
    else localStorage.setItem("cardsPath", "./imageSet1/")

    let match = document.getElementsByClassName("flip")

    console.log(match.length);

    matchSize = match.length;

    for (let aux = 1; aux <= matchSize; aux++) {
        console.log(matchSize)
        match[matchSize - aux].classList.toggle("flip");
    }

    setTimeout(scramble, 500);

}




