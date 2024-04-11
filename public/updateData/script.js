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

    document
      .querySelector("label[for='gender']")
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
          if (item.value == "" && item.type !== "hidden") {
            console.log(item.type)
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
          if (item.value == "" && item.type !== "hidden") {
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
