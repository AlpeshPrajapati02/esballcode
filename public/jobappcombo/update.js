
async function update(){   
    let route = window.location.pathname;
console.log(route)
    if(route !== "/jobapp"){
        route = route.split("/");
        let data = await fetch(`http://localhost:8000/jobapp/user/edit/${route[route.length-1]}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })

       data = await data.json();

       putData(data);
    }
}


function putData(data){

    console.log(data)
    // basic details    
    document.getElementById('fname').value = data.basicData.fname
    document.getElementById('lname').value = data.basicData.lname
    document.getElementById('designation').value = data.basicData.designation
    document.getElementById('email').value = data.basicData.email
    document.getElementById('phone').value = data.basicData.phoneNo
    document.getElementById('dob').value = data.basicData.dob
    document.getElementById('city').value = data.basicData.city
    document.getElementById('zipcode').value = data.basicData.zipCode
    document.getElementById('add1').value = data.basicData.add1
    document.getElementById('add2').value = data.basicData.add2
    
    let male = document.getElementById('male');
    let female = document.getElementById('female');

   data.basicData.gender == "male"? male.setAttribute('checked','true') : female.setAttribute('checked',"true");

   let relationshipOption = document.querySelectorAll('#relationship option');
    relationshipOption.forEach((option)=>{
        console.log(option.value,"  ",data.basicData.relationship)
        if(option.value === data.basicData.relationship){
            option.setAttribute('selected','true')
        }
    })


    let state = document.querySelectorAll('#state option');
    state.forEach((option)=>{
        if(option.value === data.basicData.state){
            option.setAttribute('selected','true')
        }
    })


    // education details
    document.getElementById('ssc-nameofboard').value=data.educationDetails[0].board_course
    document.getElementById('ssc-passingyear').value=data.educationDetails[0].passingYear
    document.getElementById('ssc-percentage').value=data.educationDetails[0].percentage

    document.getElementById('hsc-nameofboard').value=data.educationDetails[1].board_course
    document.getElementById('hsc-passingyear').value=data.educationDetails[1].passingYear
    document.getElementById('hsc-percentage').value=data.educationDetails[1].percentage

    let bachelor = document.querySelectorAll('#bachelor-coursename option');
    bachelor.forEach((option)=>{
        if(option.value === data.educationDetails[2]?.board_course){
            option.setAttribute('selected','true')
        }
    })
    document.getElementById('bachelor-university').value=data.educationDetails[2]?.university||"";
    document.getElementById('bachelor-passingyear').value=data.educationDetails[2]?.passingYear||"";
    document.getElementById('bachelor-percentage').value=data.educationDetails[2]?.percentage||"";

    let master = document.querySelectorAll('#master-coursename option');
    master.forEach((option)=>{
        if(option.value=== data.educationDetails[3]?.board_course){
            option.setAttribute('selected','true')
        }
    })
    document.getElementById('master-university').value=data.educationDetails[3]?.university||"";
    document.getElementById('master-passingyear').value=data.educationDetails[3]?.passingYear||"";
    document.getElementById('master-percentage').value=data.educationDetails[3]?.percentage||"";




    // work experience
    let companyDetails = document.getElementById('companydetails');

    companyDetails.innerHTML = "";
    if(data.workDetails.length>0){
     
        
        
        data.workDetails.forEach((data)=>{
            let div = document.createElement('div');
            div.classList.add('company');
           let company = `
            <label for="companyname1">Company Name:
            <input type="text" name="company[]" value="${data.companyName}"></label>

            <label for="designation1">Designation:
            <input type="text" name="cdesignation[]" value="${data.designation}"></label>

            <label for="fromdate1">Form: 
            <input type="text" name="fromdate[]" value="${data.fromDate}"></label>

            <label for="todate1">To:
            <input type="text"  name="todate[]"  value="${data.toDate}"> </label>
            <input type="hidden" name="companyId[]" value = "${data.wid}">
            `;
            div.innerHTML = company;
            companyDetails.appendChild(div);
        })
    }


    // language
    let hindi = document.getElementById('hindi')
    let gujarati = document.getElementById('gujarati')
    let english = document.getElementById('english')

    data.language.forEach((lang)=>{
        if(lang.language == "english"){
            
            let eng = document.getElementsByName('langcheck3[]');
            lang.canRead? eng[0].setAttribute('checked',true):'';
            lang.canWrite? eng[1].setAttribute('checked',true):'';
            lang.canSpeak? eng[2].setAttribute('checked',true):'';
            english.setAttribute('checked','true');

        }else if(lang.language == "gujarati"){

            let guj = document.getElementsByName('langcheck2[]');
            lang.canRead? guj[0].setAttribute('checked',true):'';
            lang.canWrite? guj[1].setAttribute('checked',true):'';
            lang.canSpeak? guj[2].setAttribute('checked',true):'';

            gujarati.setAttribute('checked','true');

        }else if(lang.language == "hindi"){

            let hn = document.getElementsByName('langcheck1[]');
            
            lang.canRead? hn[0].setAttribute('checked',true):'';
            lang.canWrite? hn[1].setAttribute('checked',true):'';
            lang.canSpeak? hn[2].setAttribute('checked',true):'';
            
            hindi.setAttribute('checked','true');
        }
    })


    // tech details
    data.techDetails.forEach((tech)=>{
        if(tech.technology == "php"){
            document.getElementById('php').setAttribute('checked',true)

            let phptech = document.getElementsByName('phptech');
            if(tech.level == 'beginer'){
                phptech[0].setAttribute('checked','true')
            }
            else if(tech.level == 'mideator'){
                phptech[1].setAttribute('checked','true')
            }
            else{
                phptech[2].setAttribute('checked','true')
            }
        }
        else if(tech.technology == 'mysql'){
            document.getElementById('mysql').setAttribute('checked',true)

            let mysqltech = document.getElementsByName('mysqltech');
            if(tech.level == 'beginer'){
                mysqltech[0].setAttribute('checked','true')
            }
            else if(tech.level == 'mideator'){
                mysqltech[1].setAttribute('checked','true')
            }
            else{
                mysqltech[2].setAttribute('checked','true')
            }
        }
        else if(tech.technology == 'oracle'){
            document.getElementById('oracle').setAttribute('checked',true)

            let oracletech = document.getElementsByName('oracletech');
            if(tech.level == 'beginer'){
                oracletech[0].setAttribute('checked','true')
            }
            else if(tech.level == 'mideator'){
                oracletech[1].setAttribute('checked','true')
            }
            else{
                oracletech[2].setAttribute('checked','true')
            }
        }
        else if(tech.technology == 'laravel'){
            document.getElementById('laravel').setAttribute('checked',true)

            let laraveltech = document.getElementsByName('laraveltech');
            if(tech.level == 'beginer'){
                laraveltech[0].setAttribute('checked','true')
            }
            else if(tech.level == 'mideator'){
                laraveltech[1].setAttribute('checked','true')
            }
            else{
                laraveltech[2].setAttribute('checked','true')
            }
        }
    })


    // reference contact
 // work experience
 let refDetails = document.querySelector('.referance');

 refDetails.innerHTML = "";
 if(data.referance.length>0){
  
     
     
     data.referance.forEach((data)=>{
         let div = document.createElement('div');
         div.classList.add('refvalid');
        let ref = `
        <label for="name1">Name: </label>
        <input type="text" value="${data.name}" name="refname[]" >
        
        <label for="contact1">Contact Number: </label>
        <input type="text" value="${data.contactNo}" name="refcontact[]">
        
        <label for="relation1">Relation: </label>
        <input type="text" value="${data.relation}" name="refrelation[]" >
        <input type="hidden" name="refId[]" value ="${data.rfid}">
        `;

         div.innerHTML = ref;
         refDetails.appendChild(div);
     })
 }


//  preference

document.getElementById('location').value = data.preference.preferedLocation;
document.getElementById('noticeperiod').value = data.preference.noticePeriod;
document.getElementById('expectedctc').value = data.preference.expectedCTC;
document.getElementById('currentCTC').value = data.preference.currentCTC;

let option = document.querySelectorAll('#department option');


option.forEach((op)=>{
    if(data.preference.department == op.value){
        op.setAttribute('selected','true')
    }
})

}



update();

