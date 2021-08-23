let cb = document.getElementsByClassName('cb');
let cb1 = document.getElementsByClassName('cb1');
let cb2 = document.getElementsByClassName('cb2');
//Validation of input fields
let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let usernamePatern = /^[a-zA-Z\-]+$/;
//
let temp1,temp2;
//
//FIRE-BASE
let fire_auth = firebase.auth();
let fire_store = firebase.firestore();
//Fields OF DOM;
let RADIO_R = document.getElementById('radio-r');
let RADIO_C = document.getElementById('radio-c');
let RADIO_VAL_RES = document.getElementById('flexRadioDefault1');
let RADIO_VAL_COS = document.getElementById('flexRadioDefault2');
let FORM_DIV = document.getElementsByClassName('ib2')[0];
let FIRST_NAME = document.getElementById('first-name');
let LAST_NAME = document.getElementById('last-name');
let USER_NAME = document.getElementById('username');
let EMAIL_EL = document.getElementById('email');
let PASSWORD = document.getElementById('password');
let CONFIRM_PASSWORD = document.getElementById('confirmpassword');
let SIGN_REF = document.getElementById("signup-ref");
let LOGIN = document.getElementById('logIn');
let HEADING1 = document.getElementsByTagName('h1')[0];
let SIGNUP_LINK = document.getElementById('signup-link').addEventListener('focus', () => { Sign_UP_REF() });
let signUpButton = document.getElementById('SignupSection').addEventListener("click", () => { Sign_UP_REF() });
let FORGET_LINK = document.getElementById('forgetlink').addEventListener('focus', () => { window.location = 'forget.html' });
let logInButton = document.getElementById('LoginSection').addEventListener("click", () => {
    HEADING1.innerText = "Login";
    FORM_DIV.classList.replace('signuptop', 'ib2');
    RADIO_R.style.display = "none";
    RADIO_C.style.display = "none";
    FIRST_NAME.style.display = "none";
    LAST_NAME.style.display = "none";
    USER_NAME.style.display = "none";
    CONFIRM_PASSWORD.style.display = "none";
    SIGN_REF.style.display = "block";
    LOGIN.classList.remove('mb-5');
    LOGIN.innerText = "Login";
});
let RN = document.getElementsByName("flexRadioDefault");
let abc = setInterval(()=>{radio_FUNC()},50);
function radio_FUNC(){
    if(RADIO_VAL_RES.checked){
        CONFIRM_PASSWORD.style.display ="none";   
    }
    else{

        CONFIRM_PASSWORD.style.display ="block";

    }
}

function Sign_UP_REF() {
    HEADING1.innerText = "Signup";
    FORM_DIV.classList.replace('ib2', 'signuptop');
    FIRST_NAME.style.display = "block";
    LAST_NAME.style.display = "block";
    USER_NAME.style.display = "block";
    SIGN_REF.style.display = "none";
    abc;
    LOGIN.classList.add('mb-5');
    LOGIN.innerText = "Signup";
    RADIO_R.style.display = "block";
    RADIO_C.style.display = "block";
    //FIELDS
}
FIRST_NAME.addEventListener('keypress', () => {radio_FUNC();
    if ((FIRST_NAME.value.length) >= 2) {
        FIRST_NAME.classList.replace('err', 'jtext');if(RADIO_VAL_RES.checked){
        CONFIRM_PASSWORD.style.display ="none";  
    }
    else{
        CONFIRM_PASSWORD.style.display ="block";
    }
    }
    else {
        FIRST_NAME.classList.replace('jtext', 'err');
    }
});
LAST_NAME.addEventListener('keypress', () => {
    if ((LAST_NAME.value.length) >= 3) {
        LAST_NAME.classList.replace('err', 'jtext');
    }
    else {
        LAST_NAME.classList.replace('jtext', 'err');
    }
});
USER_NAME.addEventListener('keypress', () => {
    if ((USER_NAME.value).match(usernamePatern)) {
        USER_NAME.classList.replace('err', 'jtext');
    }
    else {
        USER_NAME.classList.replace('jtext', 'err');

    }
});
EMAIL_EL.addEventListener('keypress', () => {
    if ((EMAIL_EL.value).match(emailPattern)) {
        EMAIL_EL.classList.replace('err', 'jtext');
    }
    else {
        EMAIL_EL.classList.replace('jtext', 'err');
    }
});
EMAIL_EL.addEventListener('keypress', () => {
    if (PASSWORD.value == CONFIRM_PASSWORD.value) {
        CONFIRM_PASSWORD.classList.replace('err', 'jtext');
    }
    else {
        CONFIRM_PASSWORD.classList.replace('jtext', 'err');
    }
});
PASSWORD.addEventListener('keypress', () => {
    if ((PASSWORD.value.length >= 5)) {
        PASSWORD.classList.replace('err', 'jpass');
    }
    else {
        PASSWORD.classList.replace('jpass', 'err');
    }
});

LOGIN.addEventListener("click", function () {
    if (LOGIN.innerHTML == 'Login') {
        
        if (EMAIL_EL.value.length == 0 || PASSWORD.value.length == 0) {
            alert("Complete the form!");
        }
        else {
            sign_in_function();
        }
    }
    else if (LOGIN.innerText == 'Signup') {
        if (USER_NAME.value.length == 0 || FIRST_NAME.value.length == 0 || LAST_NAME.value.length == 0 || EMAIL_EL.value.length == 0 || PASSWORD.value.length == 0) {
            alert("Complete the form!");
        }
        else {
            clearInterval(abc);
            sign_up_function();
        }

    }
});
function sign_up_function() {
     {
       
    fire_auth.createUserWithEmailAndPassword(EMAIL_EL.value, PASSWORD.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            let UID = userCredential.user.uid;
            // ...
            let users_res;
        if (RADIO_VAL_RES.checked) {
            users_res  = {
                name1:FIRST_NAME.value,
                country_NAME:LAST_NAME.value,
                userName_CITYname: USER_NAME.value,
                uid:UID,
                email: EMAIL_EL.value,
                password: PASSWORD.value,
                user_ROLE :"Restaurant"
            }  
                fire_store.collection("restaurant").doc(user.uid).set(users_res)
            .then((docRef)=>{
                console.log("Document written with ID: ",docRef);
                window.location = 'home.html';
                
            })
            .catch((err)=>{
                console.log(err);
                window.location = 'user.html';
                
            });
            
        }
        if(RADIO_VAL_COS.checked) {
            users_res  = {
                name1:FIRST_NAME.value,
                country_NAME:LAST_NAME.value,
                userName_CITYname: USER_NAME.value,
                uid:UID,
                email: EMAIL_EL.value,
                password: PASSWORD.value,
                phone_NUMBER : CONFIRM_PASSWORD.value,
                user_ROLE :"Costumer"   
            }   
            fire_store.collection("users").doc(user.uid).set(users_res)
            .then((docRef)=>{
                console.log("Document written with ID: ",docRef);
               window.location = 'user.html';
                
            })
            .catch((err)=>{
                console.log(err);
                if(window.location=="sign.html"){console.log("Good")}
            });
        }          
          
        
});}
}
function sign_in_function() {
    fire_auth.signInWithEmailAndPassword(EMAIL_EL.value, PASSWORD.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user.uid;
            console.log(user);
            firebase.firestore().collection("restaurant").where("uid", "==", user)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log("mubarak");
                    window.location="home.html";
                });
                
            })
            .catch((error) => {
                window.location="user.html";
                console.log("Error getting documents: ", error);
            });
            firebase.firestore().collection("users").where("uid", "==", user)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log("mubarak");
                    window.location="user.html";
                });
                
            })
            .catch((error) => {
                window.location="user.html";
                console.log("Error getting documents: ", error);
            });
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }
// function saveDataForFireStore(documentToAdd) {
//     fire_store.collection("users").doc("SB").set(documentToAdd)
//         .then((docRef) => {
//         console.log("Document written with ID: ",docRef.id);
//        window.location = 'index.html';
//         })
//         .catch((error)=>{
//             console.log(error)
//         });
// }

// function checkedRadio(){
//  let checkedProp;
//     for(let i=0;i<RN.length;i++){
//         if(RN[i].checked){
//             checkedProp = RN[i].value;
//             return checkedProp;
//         }
//     }
// }



////////
// let W_SIG = document.getElementById('sig');
// let W_LIN = document.getElementById('lin');




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

// function check_user(){
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//           // User is signed in, see docs for a list of available properties
//           // https://firebase.google.com/docs/reference/js/firebase.User
//           var uid = user.uid;
//           console.log("Login" ,user.uid);
//           return true;
//           // ...
//         } else {
//           // User is signed out
//           // ...
//           console.log("Logout");
//           return false;
//         }
//       });
// }
function imageSelected() {
    let image = userImageEl.files[0];
    avatarCustomEl.src = `./images/${image.name}`;
}

function add_item(){
    let userImageEl = document.getElementById('upload-image');
        let item_name = document.getElementById('item-name');
        let category_name = document.getElementById('category');
        let price_1 = document.getElementById('price');
        let delivery_1 = document.getElementById('delivery');
        let img_con = document.getElementById('imgcontainer');
        let save_item1 = document.getElementById('save-item');
        let dropdown_cat = document.getElementById('category');
        let dropdown_deliver = document.getElementById('delivery');
        dropdown_cat.style.display = "block";
        dropdown_deliver.style.display = "block";
         userImageEl.style.display='block';;
         item_name.style.display='block';;
         category_name.style.display='block';;
         price_1.style.display='block';;
         delivery_1.style.display='block';
         img_con.style.display='block';
         save_item1.style.display='block';
       
}
//For product
function save_item(){
    let item_name = document.getElementById('item-name').value;
    let price_1 = document.getElementById('price').value;
   
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          let product_uid= user.uid + (Math.random()).toString(); 
          console.log(product_uid)
          let restaurant_product = {
              item__name:item_name,
              restaurant_uid:uid,
              product__uid:product_uid,
              category__name:temp2,
              price_of_product:price_1,
              delivery_type: temp1
          }
          firebase.firestore().collection("products").doc(product_uid).set(restaurant_product)
          .then((docRef)=>{
              console.log("Document written with ID: ",docRef);
          })
          .catch((err)=>{
              console.log(err);
    console.log(err);
          });
          firebase.firestore().collection("products").doc(product_uid)
    .onSnapshot((doc) => {
        function card_on_add(){
            let main_1 = document.getElementById('main-1');
            let creat_card = document.createElement("div");
            let creat_para_div = document.createElement("div");
            let creat_img_div = document.createElement("div");
            let h_2 = document.createElement("h2");
            let card_para = document.createElement("p");
            let card_img = document.createElement("img");
            let line_break = document.createElement("hr");
            creat_card.classList.add('row');
            creat_card.classList.add('featurette');
            creat_card.classList.add('m-5');
            creat_para_div.classList.add('col-md-7');
            h_2.classList.add('featurette-heading');
            card_para.classList.add('lead');
            creat_img_div.classList.add('col-md-5');
            card_img.classList.add('d-block');
            card_img.classList.add('w-100');
            line_break.classList.add('featurette-divider');
            line_break.classList.add('m-4');
            card_img.src = "/Assets/chinese3.jpeg";
            creat_img_div.appendChild(card_img);
            creat_para_div.appendChild(h_2);
            creat_para_div.appendChild(card_para);
            creat_card.appendChild(creat_para_div);
            creat_card.appendChild(creat_img_div);
        main_1.appendChild(creat_card);
        main_1.appendChild(line_break);
        h_2.innerText = `Item Name:${doc.data().item__name}`;
        card_para.innerText = `Price:${doc.data().price_of_product}\nCategory:${doc.data().category__name}\nDelivery Type:${doc.data().delivery_type}`;     }
        console.log("Current data: ", doc.data());
        card_on_add();

    });
          // ...
        } else {
          // User is signed out
          // ...
          console.log("Logout");
          
        }
      });

      save_display_none();
}
function save_display_none(){let userImageEl = document.getElementById('upload-image');
let item_name = document.getElementById('item-name');
let category_name = document.getElementById('category');
let price_1 = document.getElementById('price');
let delivery_1 = document.getElementById('delivery');
let img_con = document.getElementById('imgcontainer');
let save_item1 = document.getElementById('save-item');
let dropdown_cat = document.getElementById('category');
let dropdown_deliver = document.getElementById('delivery');
dropdown_cat.style.display = "none";
dropdown_deliver.style.display = "none";
 userImageEl.style.display='none';
 item_name.style.display='none';
 category_name.style.display='none';
 price_1.style.display='none';
 delivery_1.style.display='none';
 img_con.style.display='none';
 save_item1.style.display='none';}
function update_data(){}
//Product Uploading

function delivery_selection(e){
  let dp_button = document.getElementById("dropdownMenuButton2").innerText = e.innerHTML;
  temp1 = e.innerText; 
  return temp1;
}
function cat_selectio(e){
    let dp_button = document.getElementById("dropdownMenuButton1").innerText=e.innerHTML;
   temp2 = e.innerText;
  only_data();
    return temp2;
}

async function get_product_data(){
   await firebase.firestore().collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            var u_s = doc.id;
            console.log(u_s.product__uid);
            console.log(doc.id, " => ", doc.data());
        });
    });
    
    
}
function check_RES_COS(e){
    let e_uid = e.uid;
   
}
function only_data(){
    var uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection("products").where("restaurant_uid", "==", uid)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().item__name);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}
function route_page(){
    window.location = "display.html";
}
function get_restaurant(){
    var abc  = [];
    var abcd = {}
    let j = 0;

    // var uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection("restaurant").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            
            console.log(user1);
            
            // abc.push(doc.data());
            cb[j].parentNode.parentNode.style.display = "block";
            cb[j].src = "https://source.unsplash.com/300x200/?food"
                cb1[j].innerText =`Restaurant name:${doc.data().name1}\nCountry:${doc.data().country_NAME}\nCity:${doc.data().userName_CITYname}\nEmail:${doc.data().email}`;
            cb[j].setAttribute("id","cb-id");
                cb2[j].setAttribute("onclick","javascript:route_page()");
            abcd[j]=doc.data();
            //db1.innerText = `Restaurant name:${doc.data().name1}\nCountry:${doc.data().country_NAME}\nCity:${doc.data().userName_CITYname}\nEmail:${doc.data().email}`;            // doc.data() is never undefined for query doc snapshots
            console.log(abcd);
            j++; });
                    
                    // console.log(abc);
                });
}

function signout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location = './index.html';
       
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });   
}

