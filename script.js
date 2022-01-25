// selecionar individualmente os elementos que estao no ecrã/display:
// lado esquerdo:
let YourVoteFor = document.querySelector(".part-1-1 span");
let role = document.querySelector(".part-1-2 span");
let numbersOnSquares = document.querySelector(".part-1-3");
let desc = document.querySelector(".part-1-4");
let instructions = document.querySelector(".part-1-in-part2");
let lateral = document.querySelector(".part-1-right");

// controlo de ambiente
let actualPhase = 0;
let number = "";
let blankVote = true;
let allVotes = [];

function startPhase() {
  let phase = superheroes[actualPhase];
  let numberHtml = "";
  number = "";
  blankVote = false;

  //👇🏻 a quantidade de quadrados que vai aparecer REPETIDAMENTE
  for (let i = 0; i < phase.numbers; i++) {
    if (i === 0) {
      numberHtml += '<div class="number twinkle"></div>';
    } else {
      numberHtml += '<div class="number"></div>';
    }
  }

  YourVoteFor.style.display = "none";
  role.innerHTML = phase.title;
  desc.innerHTML = "";
  // instructions.style.display = "none";
  lateral.innerHTML = "";
  numbersOnSquares.innerHTML = numberHtml; // REFERENTE AO LOOP ACIMA
}
function updateInterface() {
  let phase = superheroes[actualPhase];
  let candidato = phase.candidates.filter((item) => {
    if (item.number === number) {
      return true;
    } else {
      return false;
    }
  });
  // apresentacao das infos do candidato
  if (candidato.length > 0) {
    candidato = candidato[0];
    YourVoteFor.style.display = "block";
    // instructions.style.display = "block";
    desc.innerHTML = `Candidates: ${candidato.name} <br/>Planet: ${candidato.planet} `;

    let photoHtml = "";
    for (let i in candidato.picture) {
      if (candidato.picture[i].small) {
        photoHtml += `<div class="part-1-image small"><img src="/images/${candidato.picture[i].url}" alt="" />${candidato.picture[i].description}</div>`;
      } else {
        photoHtml += `<div class="part-1-image"><img src="/images/${candidato.picture[i].url}" alt="" />${candidato.picture[i].description}</div>`;
      }
    }
    lateral.innerHTML = photoHtml;
    //voto nulo
  } else {
    YourVoteFor.style.display = "block";
    // instructions.style.display = "block";
    desc.innerHTML =
      '<div class="warning twinkle" style="font-size: 20px; line-height: 15px;">Null Vote 🚫 <br/>This number does not exist in the system</div>';
  }
}

// Ações nos botões do keyboard
function clicked(n) {
  // procurar qual o nr que esta a piscar
  let elNumber = document.querySelector(".number.twinkle");
  if (elNumber !== null) {
    elNumber.innerHTML = n;
    number = `${number}${n}`;
    // passar para o proximo numero
    elNumber.classList.remove("twinkle");
    if (elNumber.nextElementSibling !== null) {
      elNumber.nextElementSibling.classList.add("twinkle");
    } else {
      updateInterface();
    }
  }
}
function blank() {
  if (number === "") {
    blankVote = true;
    YourVoteFor.style.display = "block";
    // instructions.style.display = "block";
    numbersOnSquares.innerHTML = "";
    desc.innerHTML =
      '<div class="warning twinkle" style="font-size: 20px; line-height: 15px;">Blank vote ✅ <br/>Thank you for your contribution</div>';
    lateral.innerHTML = "";
  } else {
    alert("If you want to vote BLANK, you cannot enter any number.");
  }
}
function rectify() {
  // volta ao à etapa inicial
  startPhase();
}
function confirme() {
  let phase = superheroes[actualPhase];

  let confirmeVote = false;

  if (blankVote === true) {
    confirmeVote = true;
    allVotes.push({
      phase: superheroes[actualPhase].title,
      voto: "blank",
    });
    console.log("confirmar como branco");
  } else if (number.length === phase.numbers) {
    confirmeVote = true;
    allVotes.push({
      phase: superheroes[actualPhase].title,
      voto: number,
    });
    console.log("confirmar como " + number);
  }
  if (confirmeVote) {
    actualPhase++; // passa para o proximo
    if (superheroes[actualPhase] !== undefined) {
      startPhase();
    } else {
      document.querySelector(".display").innerHTML =
        '<div class="the-end">SUCCESS🪐</br>Thank you for your contribution</div>';
      console.log("fim");
      console.log(allVotes);
    }
  }
}
startPhase();
