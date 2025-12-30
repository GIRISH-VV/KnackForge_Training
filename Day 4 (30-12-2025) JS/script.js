function convertToPounds(){
    let kgInput = document.getElementById("kg").value;
    let pounds = kgInput * 2.20462;
    let result = document.getElementById("result");
    result.innerHTML = pounds.toFixed(2) + " Pounds";
}