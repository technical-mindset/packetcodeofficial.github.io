/// For Firebase ///
let fire_store = firebase.firestore();
let fire_auth = firebase.auth();
////////
// let W_SIG = document.getElementById('sig');
// let W_LIN = document.getElementById('lin');

let sign_in_var = document.getElementById("sign-warning1");
let sign_up_var = document.getElementById("sign-warning2");
check_user();

let watches = document.getElementById('w1');
let bags = document.getElementById('b1');
let shoes = document.getElementById('ss1');
let shirts = document.getElementById('s1');
let jeans = document.getElementById('j1');
// let jeansBUTTON = document.getElementById('j2').addEventListener('click',()=>{
//     jeans.style.display = 'block';
//     watches.style.display = 'none';
//     bags.style.display = 'none';
//     shoes.style.display = 'none';
//     shirts.style.display = 'none';}
// );
let jeansBUTTON = document.getElementById('j2')
jeansBUTTON.addEventListener('click',()=>{
cloSED(jeans);
});
let shirtsBUTTON = document.getElementById('s2').addEventListener('click', () => {
   cloSED(shirts);
});
let shoesBUTTON = document.getElementById('ss2').addEventListener('click', () => {
   cloSED(shoes);
});
let watchesBUTTON = document.getElementById('w2').addEventListener('click', () => {
    cloSED(watches)
});
let bagsBUTTON = document.getElementById('b2').addEventListener('click', () => {

    cloSED(bags);

});
// let auth = firebase.auth();
// let emailEl = document.getElementById('email');
// let passwordEl = document.getElementById('psw');
// function register(){
//     window.location = "index.html";
// }
function cloSED(element) {
    if (element.previousElementSibling.innerText == "Click for more..."){
        element.previousElementSibling.innerText = 'Close';
    element.style.display = 'block';
}
    else if(element.previousElementSibling.innerText=="Close"){
        element.previousElementSibling.innerText = 'Click for more...';
        element.style.display = 'none';
    }
}
