let companyAdd = document.getElementById("cadd");
let companyRemove = document.getElementById("cremove");
let companyDetails = document.getElementById("companydetails");

companyAdd.addEventListener("click", (e) => {
    e.preventDefault();
  let company = document.createElement("div");
  company.classList.add("company");

  company.innerHTML = `
    <label for="companyname3">Company Name:
    <input type="text" name="company[]"></label>

    <label for="designation3">Designation:
    <input type="text" name="cdesignation[]"></label>

    <label for="fromdate3">Form: 
    <input type="date"  name="fromdate[]" ></label>

    <label for="todate3">To: 
    <input type="date"  name="todate[]"></label>  `;

  companyDetails.appendChild(company);
});


companyRemove.addEventListener("click", (e) => {
    e.preventDefault();
    let companies = document.querySelectorAll(".company");
    if(companies.length>1){
        companies[companies.length - 1].remove();
    }
  });



  let refAdd = document.getElementById("radd");
let refRemove = document.getElementById("rremove");
let refDetails = document.querySelector(".referance");

refAdd.addEventListener("click", (e) => {
    e.preventDefault();
    let referance = document.createElement("div");
    referance.classList.add("refvalid");
  
    referance.innerHTML = `
    <label for="name2">Name: </label>
    <input type="text" name="refname[]" >
    
    <label for="contact2">Contact Number: </label>
    <input type="text" name="refcontact[]">
    
    <label for="relation2">Relation: </label>
    <input type="text" name="refrelation[]">`;
  
    refDetails.appendChild(referance);
  });
  
  
  refRemove.addEventListener("click", (e) => {
    e.preventDefault();
      let companies = document.querySelectorAll(".refvalid");
      if(companies.length>1){
          companies[companies.length - 1].remove();
      }
    });