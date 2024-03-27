let u1 = document.getElementById("u1");
let u2 = document.getElementById("u2");



let user1 = document.querySelector(".user1");
let user2 = document.querySelector(".user2");
// u1.innerText = prompt("Enter Player1 Name : ");
// u2.innerText = prompt("Enter Player2 Name : ");


let tbl = document.getElementById("tbl");
let winner = false;

let clickCount = 0;
let td = document.querySelectorAll("td");

let reset = document.getElementById('reset')

reset.addEventListener('click',function(){
  clickCount = 0;
    td.forEach((item)=>item.innerHTML="")
})


for (let i = 0; i < td.length; i++) {
  td[i].addEventListener("click", function (e) {
    if (td[i].innerHTML === "") {
      if (clickCount % 2 === 0) {
        td[i].innerText = "0";
        user1.classList.remove("playing");
        user2.classList.add("playing");
      } else {
        user2.classList.remove("playing");
        user1.classList.add("playing");
        td[i].innerText = "X";
      }
      clickCount++;
      console.log("td");
      if(win()){
        location.reload();
      }
      else if(!win() && clickCount == 9){
        alert("Match Drow")
        location.reload();
      }
    }
  });
}



function win() {
  let tr = document.querySelectorAll("tr");

  if (
    (tr[0].cells[0].innerText === tr[1].cells[1].innerText &&
      tr[2].cells[2].innerText === tr[0].cells[0].innerText &&
      tr[0].cells[0].innerText !== "" &&
      tr[0].cells[0].innerText === "0") ||
    (tr[2].cells[0].innerText === tr[1].cells[1].innerText &&
      tr[0].cells[2].innerText === tr[2].cells[0].innerText &&
      tr[2].cells[0].innerText !== "" &&
      tr[2].cells[0].innerText === "0")
  ) {
    alert(`${u1.innerText} Win the match`);
    winner = true;
    return true;
  } 
  if (
    (tr[0].cells[0].innerText === tr[1].cells[1].innerText &&
      tr[2].cells[2].innerText === tr[0].cells[0].innerText &&
      tr[0].cells[0].innerText !== "" &&
      tr[0].cells[0].innerText === "X") ||
    (tr[2].cells[0].innerText === tr[1].cells[1].innerText &&
      tr[0].cells[2].innerText === tr[2].cells[0].innerText &&
      tr[2].cells[0].innerText !== "" &&
      tr[2].cells[0].innerText === "X")
  ) {
    alert(`${u2.innerText} Win the match`);
    winner = true;
    return true;
    
  }

  for (let i = 0; i < tr.length; i++) {
    if (
      (tr[i].cells[0].innerText === tr[i].cells[1].innerText &&
        tr[i].cells[2].innerText === tr[i].cells[0].innerText &&
        tr[i].cells[0].innerText !== "" &&
        tr[i].cells[0].innerText === "0") ||
      (tr[0].cells[i].innerText === tr[1].cells[i].innerText &&
        tr[2].cells[i].innerText === tr[0].cells[i].innerText &&
        tr[0].cells[i].innerText !== "" &&
        tr[0].cells[i].innerText === "0")
    ) {
      alert(`${u1.innerText} Win the match`);
      winner = true;
      return true;


    } 
    else if (
      (tr[i].cells[0].innerText === tr[i].cells[1].innerText &&
        tr[i].cells[2].innerText === tr[i].cells[0].innerText &&
        tr[i].cells[0].innerText !== "" &&
        tr[i].cells[0].innerText === "X") ||
      (tr[0].cells[i].innerText === tr[1].cells[i].innerText &&
        tr[2].cells[i].innerText === tr[0].cells[i].innerText &&
        tr[0].cells[i].innerText !== "" &&
        r[0].cells[i].innerText === "X")
    ) {
      alert(`${u2.innerText} Win the match`);
      winner = true;
      return true;

    }


  }

  return false;

}
