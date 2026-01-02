
document.getElementById("myForm").addEventListener("submit", function(e){
    e.preventDefault();

    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const uname = document.getElementById("uname");
    const pw = document.getElementById("pw");
    const email = document.getElementById("email");
    const phno = document.getElementById("phno");
    const gender = document.getElementsByName("gender");
    const city = document.getElementById("city");
    const state = document.getElementById("state");
    const dob = document.getElementById("dob");
    const address = document.getElementById("address");
    const agree = document.getElementById("agree");

    const fnameError = document.getElementById("fnameError");
    const lnameError = document.getElementById("lnameError");
    const unameError = document.getElementById("unameError");
    const pwError = document.getElementById("pwError");
    const emailError = document.getElementById("emailError");
    const phnoError = document.getElementById("phnoError");
    const genderError = document.getElementById("genderError");
    const cityError = document.getElementById("cityError");
    const stateError = document.getElementById("stateError");
    const dobError = document.getElementById("dobError");
    const addressError = document.getElementById("addressError");
    const agreeError = document.getElementById("agreeError");

    let valid = true;

    const lettersOnly = /^[A-Za-z]+$/;
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if(!lettersOnly.test(fname.value)){
        fnameError.textContent = "Only letters allowed";
        valid = false;
    } else { fnameError.textContent = ""; }

    if(!lettersOnly.test(lname.value)){
        lnameError.textContent = "Only letters allowed";
        valid = false;
    } else { lnameError.textContent = ""; }

    if(uname.value.trim() === ""){
        unameError.textContent = "User Name is required";
        valid = false;
    } else { unameError.textContent = ""; }

    if(pw.value.trim() === ""){
        pwError.textContent = "Password is required";
        valid = false;
    } else { pwError.textContent = ""; }

    if(!emailPattern.test(email.value)){
        emailError.textContent = "Enter a valid email like example@mail.com";
        valid = false;
    } else { emailError.textContent = ""; }

    if(!phonePattern.test(phno.value)){
        phnoError.textContent = "Enter a valid 10-digit number";
        valid = false;
    } else { phnoError.textContent = ""; }

    if(!Array.from(gender).some(g => g.checked)){
        genderError.textContent = "Select your gender";
        valid = false;
    } else { genderError.textContent = ""; }

    if(city.value === ""){
        cityError.textContent = "Select your city";
        valid = false;
    } else { cityError.textContent = ""; }

    if(state.value === ""){
        stateError.textContent = "Select your state";
        valid = false;
    } else { stateError.textContent = ""; }

    if(dob.value === ""){
        dobError.textContent = "Enter your date of birth";
        valid = false;
    } else { dobError.textContent = ""; }

    if(address.value.trim() === ""){
        addressError.textContent = "Enter your address";
        valid = false;
    } else { addressError.textContent = ""; }

    if(!agree.checked){
        agreeError.textContent = "You must agree to terms";
        valid = false;
    } else { agreeError.textContent = ""; }

    if(valid){
        alert("Form submitted successfully!");
        this.reset();
    }
});

