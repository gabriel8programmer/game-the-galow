const LISTWORD = ["urso", "cavalo", "carro", "peixe", "cobra", "aviao", "urso", "calculadora", "matematica", "coelho", "bicicle", "caixa", "margarida", "amarelo", "azul", "verde", "vermelho", "preto", "ciano", "magenta", "castanho"];

let btnNewWord;
let word;
let h1;
let switchLetters;
let running;
let error;
let accept;
let listPositions = [];
let listLetters = [];

function defineNewWord(){
    let lenListWord = LISTWORD.length;
    let newWord = LISTWORD[Math.round(Math.random() * (lenListWord-1))];
    return newWord;
}

function start(){
    clearPositions();

    //NEW WORD
    word = defineNewWord();

    h1 = document.getElementById("textRes");

    //OBJECTS HTML
    btnNewWord = document.getElementById("btnNewWord");
    btnNewWord.addEventListener("click", start);
    switchLetters = document.getElementById("switchLetters");
    switchLetters.innerHTML = "";
    switchLetters.removeAttribute("class");

    running = true;
    error = 0;
    accept = 0;
    
    listPositions = [];
    listLetters = [];
    
    for (let c = 0; c < word.length; c++){
        listPositions.push("");
    }
    return;
}

function clearPositions(){
    for (let c = 0; c < 19; c++){
        let pos = document.getElementById("l"+c);
        pos.style.display = "none";
    }
    return;
}

function updateGalow(error){
    let galow = document.getElementById("image-galow");
    switch (error){
        case 0:
            galow.setAttribute("class", "error0");
            break;
        case 1:
            galow.setAttribute("class", "error1");
            h1.style.display = "none";
            break;
        case 2:
            galow.setAttribute("class", "error2");
            h1.style.display = "none";
            break;
        case 3:
            galow.setAttribute("class", "error3");
            h1.style.display = "none";
            break;
        case 4:
            galow.setAttribute("class", "error4");
            h1.style.display = "none";
            break;
        case 5:
            galow.setAttribute("class", "error5");
            h1.style.display = "none";
            break;
        case 6:
            galow.setAttribute("class", "error6");
            h1.style.display = "none";
            break;
        case 7:
            galow.setAttribute("class", "error7");
            h1.style.display = "inline-block";
            h1.innerHTML = "GAME OVER!";
            h1.setAttribute("class", "derrote");
            running = false;
            break;
    }
    return;
}

function updateWord(){
    for (let c = 0; c < word.length; c++){
        let pos = document.getElementById("l"+c);
        pos.style.display = "inline-block";
        pos.value = listPositions[c];
    }
    return;
}

function updateSwitchLetters(){
    let text = "";
    for (let c = 0; c < listLetters.length; c++){
        text += ((c === 0)? "": "-") + listLetters[c];
    }
    switchLetters.innerHTML = text;
}

function play(letter){

    //ADD THE LETTER IN WORD
    let countAccept = 0;
    let countError = 0;
    for (let c = 0; c < word.length; c++){
        if (word[c] === letter){
            listPositions[c] = letter;
            countAccept++;
        }
        else {
            countError++;
        }   
    }

    //ADD THE LETTER IN LIST
    if (listLetters.indexOf(letter) === -1 && letter.match(/[a-z]/ig) != null){
        listLetters.push(letter);
        if (countError === word.length){
            error++;
        }
        else {
            accept+=countAccept;
        }
    }
    
    return;
}

function run(){
    //EXECUTE THE GAME IN LOOP
    if (running){
        updateGalow(error);
        updateWord();
        updateSwitchLetters();
        if (accept === word.length){
            running = false;
            h1.style.display = "inline-block";
            h1.innerHTML = "CONGRATULATIONS!";
            h1.setAttribute("class", "victory");
        }
    }
    let time = requestAnimationFrame(run);
    return;
}

function loadGame(){
    start();
    run(); 
    return;
}

window.addEventListener("load", loadGame);