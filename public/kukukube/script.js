const tbl = document.querySelector("#tbl");
const play = document.querySelector("#play");
let counter = document.getElementById("counter");
let score = document.getElementById("score");
const result = document.querySelector(".result");

score.value = 0;
counter.value = 60;

//for first time take color
color();

tbl.addEventListener("click", function () {
    //in color function all row-col adding and score logic
    color();
});

//IIFE - for initially show play button
(function () {
  tbl.style.display = "none";
})();

//when user click on play button then countdown start and table will show
play.addEventListener("click", function () {
  tbl.style.display = "block";
  play.style.display = "none";
  start();
});

//countdown logic and play again button
function start() {
  const interval = setInterval(() => {
    if (counter.value > 0) {
      counter.innerHTML = --counter.value;
    } else {
      tbl.style.display = "none";
      result.style.display = "block";
      
      result.innerHTML = `
                <h1>Score is : ${score.value}</h1>
                <button id='btn'>Play Again</button>
                `;

      document.getElementById("btn").addEventListener("click", function () {
        location.reload();
      });
    }
  }, 1000);
  
}


//lightColor , color logic and score count logic
function color() {
  console.log("called");
  const td = document.querySelectorAll("td");
  let val1 = Math.floor(Math.random() * 256);
  let val2 = Math.floor(Math.random() * 256);
  let val3 = Math.floor(Math.random() * 256);

  let color = `rgb(${val1},${val2},${val3})`;
  let lightColor = `rgba(${val1}, ${val2}, ${val3}, 0.8)`;
  // console.log(color)

  let col = Math.floor(Math.random() * td.length);

  // console.log(col)

  for (let i = 0; i < td.length; i++) {
    td[i].style.backgroundColor = color;
  }
  td[col].style.backgroundColor = lightColor;

  //row & col adding logic and scorecount logic
  let inc = 1;
  let doubleInc = 5;
  for (let i = 0; i < td.length; i++) {
    td[i].addEventListener("click", function () {
      if (i === col && td[i].style.backgroundColor == lightColor) {
        //first 3 times row and col will incremented
        if (tbl.rows.length < 12 && inc < 4) {
          addRow();
          addCol();
        }
        //after 3 times after 2 successfull click row and col will increment
        else if (tbl.rows.length < 12 && inc == doubleInc) {
          addRow();
          addCol();
          doubleInc += 2;
        }
        inc++;
        console.log(td[i].style.backgroundColor == lightColor);
        score.value++;
        score.innerHTML = score.value;
      }
    });
  }
}

//add row
const addRow = () => {
  let colLen = tbl.rows[0].cells.length;
  let tr = document.createElement("tr");

  for (let i = 0; i < colLen; i++) {
    let td = document.createElement("td");
    td.classList.add("td");
    tr.appendChild(td);
  }

  tbl.appendChild(tr);
};

// add column
const addCol = () => {
  let len = tbl.rows.length;
  let tr = document.querySelectorAll("tr");
  for (let i = 0; i < len; i++) {
    let td = document.createElement("td");
    td.classList.add("td");
    tr[i].appendChild(td);
  }
};
