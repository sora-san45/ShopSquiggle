import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js';
import { getDatabase , ref , push , onValue } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';

const firebaseConfig = {
    databaseURL:"https://shoppinglist-1420e-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const itemsDB = ref(database,"items")

const inputField = document.getElementById("text-field")
const addButton = document.getElementById("add-button")
const shoppinglist = document.getElementById("shopping-list")

function clearInputField(){
    inputField.value=""
}

function clearShoppingList(){
    shoppinglist.innerHTML=""
}

onValue(itemsDB, function(snapshot){
    let items = Object.values(snapshot.val())
    clearShoppingList()
    for(let i=0;i<items.length;i++){
        addItem(items[i])
    }
})

function addItem(itemName){
    shoppinglist.innerHTML += `<li>${itemName}</li>`
}

addButton.addEventListener("click",function (){
    let itemName = inputField.value
    push(itemsDB,itemName)
    clearInputField()
    console.log("done")
})

