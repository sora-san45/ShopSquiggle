import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';

const firebaseConfig = {
    databaseURL: "https://shoppinglist-1420e-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const itemsDB = ref(database, "items")

const inputField = document.getElementById("text-field")
const addButton = document.getElementById("add-button")
const shoppinglist = document.getElementById("shopping-list")

function clearInputField() {
    inputField.value = ""
}

function clearShoppingList() {
    shoppinglist.innerHTML = ""
}

onValue(itemsDB, function (snapshot) {
    if (snapshot.exists()) {
        let items = Object.entries(snapshot.val())
        clearShoppingList()
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            addItem(item)
        }
    }else{
        clearShoppingList()
    }
})

function addItem(item) {
    let itemId = item[0]
    let itemName = item[1]
    let itemElement = document.createElement("li")
    itemElement.textContent = itemName
    itemElement.addEventListener("dblclick", function () {
        let removeItem = ref(database, `items/${itemId}`)
        remove(removeItem)
    })
    shoppinglist.append(itemElement)
}

addButton.addEventListener("click", function () {
    let itemName = inputField.value
    if(itemName!=""){
        push(itemsDB, itemName)
    }
    clearInputField()
    console.log("done")
})

