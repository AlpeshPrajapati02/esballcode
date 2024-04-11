function validate() 
{
  let isvalid = true;

  let dvalid = document.querySelectorAll(".dvalid");


  let validated = document.querySelectorAll(".validated");

  // remove if any error message is in frontend
  if (validated?.length) {
    validated.forEach((item) => {
      item.remove();
    });
  }

  // empty fields and email and phone number validation
  dvalid.forEach((field) => {
    if (field.value === "") {
      let p = document.createElement("p");
      field.insertAdjacentElement("afterend", p);
      p.innerHTML = "*required";
      p.classList.add("validated");
      p.style.color = "red";
      p.style.margin = "0";
      p.style.fontSize = "12px";
      isvalid = false;
    }

    if (field.name == "email" && field.value !== "") {
      const emailRegex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      if (!field.value.match(emailRegex)) 
      {
        
        let p = document.createElement("p");
        field.insertAdjacentElement("afterend", p);
        p.innerHTML = "Invalid Email syntax ";
        p.classList.add("validated");
        p.style.color = "red";
        p.style.margin = "0";
        p.style.fontSize = "12px";
        isvalid = false;
        
      }
    }

    if (
      field.name == "phone" &&
      field.value !== "" &&
      field.value.length !== 10
    ) {
      let p = document.createElement("p");
      field.insertAdjacentElement("afterend", p);
      p.innerHTML = "mobile number length should be 10";
      p.classList.add("validated");
      p.style.color = "red";
      p.style.margin = "0";
      p.style.fontSize = "12px";
      isvalid = false;
    }

    if (
      field.name == "dob" &&
      field.value !== "" &&
      isNaN(new Date(field.value))
    ) {
      let p = document.createElement("p");
      field.insertAdjacentElement("afterend", p);
      p.innerHTML = "Invalid Date format";
      p.classList.add("validated");
      p.style.color = "red";
      p.style.margin = "0";
      p.style.fontSize = "12px";
      isvalid = false;
    }
  });

  // gender validation
  let genderM = document.getElementById("male");
  let genderF = document.getElementById("female");

  if (!genderM.checked && !genderF.checked) {
    let p = document.createElement("p");

   genderM.parentElement
      .insertAdjacentElement("afterend", p);

    p.innerHTML = "Select appropriate gender";
    p.classList.add("validated");
    p.style.color = "red";
    p.style.margin = "0";
    p.style.fontSize = "12px";
    isvalid = false;
  }

  // bachelor fields validation
  let bachelorfields = document.querySelectorAll("#bachelor input");

  let bachelorvalue = [];
  bachelorfields.forEach((item) => {
    bachelorvalue.push(item.value);
  });

  bachelorvalue.forEach((value) => {
    if (value !== "") {
      let validated = document.querySelectorAll("#bachelor .validated");

      // remove if any error message is in frontend
      if (validated?.length) {
        validated.forEach((item) => {
          item.remove();
        });
      }

      bachelorfields.forEach((item) => {
        if (item.value == "") {
          let p = document.createElement("p");

          item.insertAdjacentElement("afterend", p);

          p.innerHTML = "*required";
          p.classList.add("validated");
          p.style.color = "red";
          p.style.margin = "0";
          p.style.fontSize = "12px";
          isvalid = false;
        }
      });
    }
  });

  // master fields validation
  let masterfields = document.querySelectorAll("#master input");

  let mastervalue = [];
  masterfields.forEach((item) => {
    mastervalue.push(item.value);
  });

  mastervalue.forEach((value) => {
    if (value !== "") {
      let validated = document.querySelectorAll("#master .validated");

      // remove if any error message is in frontend
      if (validated?.length) {
        validated.forEach((item) => {
          item.remove();
        });
      }

      masterfields.forEach((item) => {
        if (item.value == "") {
          let p = document.createElement("p");
          item.insertAdjacentElement("afterend", p);
          p.innerHTML = "*required";
          p.classList.add("validated");
          p.style.color = "red";
          p.style.margin = "0";
          p.style.fontSize = "12px";
          isvalid = false;
        }
      });
    }
  });

  //experience part validation
  let companiesData = document.querySelectorAll("#companydetails .company");

  companiesData.forEach((company) => {
    // // company fields validation
    let companyfields = company.querySelectorAll("input");

    let companyvalue = [];
    companyfields.forEach((item) => {
      companyvalue.push(item.value);
    });

    companyvalue.forEach((value) => {
      if (value !== "") {
        let validated = company.querySelectorAll(".validated");

        // remove if any error message is in frontend
        if (validated?.length) {
          validated.forEach((item) => {
            item.remove();
          });
        }

        companyfields.forEach((item) => {
          if (item.value == "") {
            let p = document.createElement("p");
            item.insertAdjacentElement("afterend", p);
            p.innerHTML = "*required";
            p.classList.add("validated");
            p.style.color = "red";
            p.style.margin = "0";
            p.style.fontSize = "12px";
            isvalid = false;
          }
        });
      }
    });
  });

  // language validate

  let languages = document.querySelectorAll(".langvalid");

  let langChecked = [];
  languages.forEach((lang) => {
    langChecked.push(lang.checked);
  });

  // validation for select atleast one language
  if (!langChecked.includes(true)) {
    let p = document.createElement("p");
    document.querySelector("#language").insertAdjacentElement("beforeend", p);
    p.innerHTML = "Please select atleast one language!";
    p.classList.add("validated");
    p.style.color = "red";
    p.style.margin = "0";
    p.style.fontSize = "12px";

    isvalid = false;
  }

  // validation for selected language to choose option

  languages.forEach((lang, i) => {
    if (lang.checked == true) {
      let opts = document.querySelectorAll(".lang-opt");
      let optinput = opts[i].querySelectorAll("input");
      let optval = [];
      optinput.forEach((item) => {
        optval.push(item.checked);
      });

      if (!optval.includes(true)) {
        let p = document.createElement("p");
        opts[i].insertAdjacentElement("afterend", p);
        p.innerHTML = "*select option";
        p.classList.add("validated");
        p.style.color = "red";
        p.style.margin = "0";
        p.style.fontSize = "12px";

        isvalid = false;
      }
    }
  });



  languages.forEach((lang, i) => {
      let opts = document.querySelectorAll(".lang-opt");
      let optinput = opts[i].querySelectorAll("input");
      let optval = [];
      optinput.forEach((item) => {
        optval.push(item.checked);
      });

      if (optval.includes(true)) {
        if(!lang.checked){
          let p = document.createElement("p");
          opts[i].insertAdjacentElement("afterend", p);
          p.innerHTML = "*select language";
          p.classList.add("validated");
          p.style.color = "red";
          p.style.margin = "0";
          p.style.fontSize = "12px";
  
          isvalid = false;
        }
      }
  });

  // validation for technology

  let technologies = document.querySelectorAll(".techvalid");

  let techChecked = [];
  technologies.forEach((tech) => {
    techChecked.push(tech.checked);
  });

  // validation for selected language to choose option

  technologies.forEach((tech, i) => {
    if (tech.checked == true) {
      let opts = document.querySelectorAll(".tech-opt");
      let optinput = opts[i].querySelectorAll("input");
      let optval = [];

      optinput.forEach((item) => {
        optval.push(item.checked);
      });

      if (!optval.includes(true)) {
        let p = document.createElement("p");
        opts[i].insertAdjacentElement("afterend", p);
        p.innerHTML = "*select option ";
        p.classList.add("validated");
        p.style.color = "red";
        p.style.margin = "0";
        p.style.fontSize = "12px";

        isvalid = false;
      }
    }
  });

  // refcontact validation
  // experience part validation
  let refsData = document.querySelectorAll("#referancecontact .refvalid");

  refsData.forEach((ref) => {
    // // company fields validation
    let reffields = ref.querySelectorAll("input");

    let refvalue = [];
    reffields.forEach((item) => {
      refvalue.push(item.value);
    });

    refvalue.forEach((value) => {
      if (value !== "") {
        let validated = ref.querySelectorAll(".validated");

        // remove if any error message is in frontend
        if (validated?.length) {
          validated.forEach((item) => {
            item.remove();
          });
        }

        reffields.forEach((item) => {
          if (item.value == "") {
            let p = document.createElement("p");
            item.parentNode.append(p);
            p.innerHTML = "*required";
            p.classList.add("validated");
            p.style.color = "red";
            p.style.display = "flex";
            p.style.margin = "0";
            p.style.fontSize = "12px";
            isvalid = false;
          }
        });
      }
    });
  });
  return isvalid;
}


let prev = document.querySelector('#prev-btn');
let next = document.getElementById('next-btn');
let form = document.getElementById('jobApplicationForm');


let index = 0;

prev.addEventListener('click',(e)=>{
    e.preventDefault();
    if(index > 0){
        if(next.value == "submit"){
            next.value = "next";
            next.classList.remove("submit")
        }
        form.children.item(index).style.display="none";
        form.children.item(--index).style.display="flex";
    }
    if(index == 0){
       prev.style.visibility = "hidden";
    }

})



next.addEventListener('click',async(e)=>{
    e.preventDefault();

    if(next.classList.contains("submit")){

        if(validate()){
          const data = new URLSearchParams();
          for (const pair of new FormData(form)) {
            data.append(pair[0], pair[1]);
          }
          
          let id = window.location.pathname.split("/");
          id = id[id.length -1];

          let url = "http://localhost:8000/jobapp";
          // console.log(window.location.pathname)
          if(window.location.pathname !== "/jobapp"){
            url += `/update/${id}`;
          }
          else {
            url += "/user";
          }


          let d = await fetch(url,{
            method:"POST",
            body:data,
            headers:{
              'Content-Type':"application/x-www-form-urlencoded"
            }
          })

          d = await d.json();
          console.log(d)
          if(d.success){
            if(window.location.pathname == '/jobapp'){
                form.reset();
            }
            document.querySelector('.msg').innerHTML = "Form Submitted Successfully"
          }else{
            document.querySelector('.msg').innerHTML = d.error;
          }
          form.children.item(index).style.display = "none";
          next.value="next";
          next.classList.remove('submit')
          prev.style.visibility="hidden";
          index=-1;
        }
    }

    if(getComputedStyle(prev).visibility == "hidden" && index >=0){
        prev.style.visibility = "visible";
    }

    if(index < form.children.length-2){
        if(index >=0){
          form.children.item(index).style.display="none";
        }
        form.children.item(++index).style.display="flex";
    }


    if(index == form.children.length-2){
        next.value = "submit";
        next.classList.add("submit")
    }
  


})










