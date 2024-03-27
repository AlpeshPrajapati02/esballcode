const coladd = document.querySelector("#cadd");
const colremove = document.querySelector("#cremove");
const rowadd = document.querySelector("#radd");
const rowremove = document.querySelector("#rremove");




rowadd.addEventListener("click", function () {
  addRow();
});

rowremove.addEventListener("click", function () {
  removeRow();
});

coladd.addEventListener("click", function () {
  addCol();
});

colremove.addEventListener("click", function () {
  removeCol();
});











const tbl = document.querySelector("#tbl");

//add row
const addRow = () => {
  let colLen = tbl.rows[0].cells.length;
  let tr = document.createElement("tr");

  
  for (let i = 0; i < colLen; i++) {  
      let td = document.createElement("td");
      tr.appendChild(td);
      console.log("called");
    }
    
    tbl.appendChild(tr);
};


const add = ()=>{
    let colLen = tbl.rows[0].cells.length;
    let row = tbl.insertRow(tbl.rows.length);
    for(let i = 0; i<colLen; i++){
        row.insertCell(i)
    }
}



//remove row
const removeRow = () => {
  let len = tbl.rows.length;
  if(len>2){
      let tr = document.querySelectorAll("tr");
    
      tr[len - 1].remove();
  }else{
    alert('Row deletion limit reached')
  }
};




// add column
const addCol = () => {
  let len = tbl.rows.length;
  let tr = document.querySelectorAll("tr");
  for (let i = 0; i < len; i++) {
    let td = document.createElement("td");
    tr[i].appendChild(td);
    console.log("called");
  }
};




//remove column
const removeCol = () => {
  let tr = document.querySelectorAll("tr");
  let len = tr.length;
  let colLen = tr[0].cells.length;

  if(colLen>2){
      for (let i = 0; i < len; i++) {
        let td = tr[i].cells[colLen - 1];
        td.remove();
      }
  }else{
    alert('Column deletion limit reached')
  }

};
