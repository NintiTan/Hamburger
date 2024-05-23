console.log("start script...")

// money

let money = 4
let cost = 0 
const moneyDisplay = document.querySelector("h1")
const message = document.querySelector(".message")
const costOfHamburger = document.querySelector(".costofhamburger")

// hamburger making

const ingredientContainer = document.querySelector(".addedIngredients");
const lettuceButton = document.querySelector(".lettucebutton");
const burgerButton = document.querySelector(".burgerbutton");
const tomatoButton = document.querySelector(".tomatobutton");

const addedIngredientsMap = new Map(); //https://www.digitalocean.com/community/tutorials/4-uses-of-javascripts-arraymap-you-should-know

function addIngredient(ingredientSrc, ingredientName) {
    if (!addedIngredientsMap.has(ingredientName) && money >= 2) {
        const addedIngredient = document.createElement("img");
        addedIngredient.src = ingredientSrc;
        ingredientContainer.appendChild(addedIngredient);
        addedIngredientsMap.set(ingredientName, addedIngredient); 
        cost = cost + 2
        costOfHamburger.textContent = "Total cost is " + cost + " euros."
        console.log(ingredientName + " added.");
        addToReceipt(ingredientName)
    } else if (addedIngredientsMap.has(ingredientName)) {
        const addedIngredient = addedIngredientsMap.get(ingredientName);
        ingredientContainer.removeChild(addedIngredient); 
        addedIngredientsMap.delete(ingredientName); 
        cost = cost -2
        costOfHamburger.textContent = "Total cost is " + cost + " euros."
        console.log(ingredientName + " removed.");
        removeFromReceipt(ingredientName)
    }

}

function addIngredientHandler(event) {
    const ingredientType = event.target.dataset.ingredientType;
    const ingredientSrc = `../images/${ingredientType}.png`;

    addIngredient(ingredientSrc, ingredientType);
}

lettuceButton.addEventListener('click', addIngredientHandler);
burgerButton.addEventListener('click', addIngredientHandler);
tomatoButton.addEventListener('click', addIngredientHandler);

// receipt

const receiptItemsMap = new Map();
const receiptContents = document.querySelector(".receiptcontents");
const payButton = document.querySelector("button")

function addToReceipt(ingredientName) {
    const addedToReceipt = document.createElement("li"); 
    addedToReceipt.textContent = ingredientName;
    receiptContents.appendChild(addedToReceipt);
    receiptItemsMap.set(ingredientName, addedToReceipt); 
    
    console.log("added " + ingredientName + " to receipt");
}

function removeFromReceipt(ingredientName) {
    const addedToReceipt = receiptItemsMap.get(ingredientName); 
    if (addedToReceipt) {
        receiptContents.removeChild(addedToReceipt);
        receiptItemsMap.delete(ingredientName);
    }
    
    console.log("removed " + ingredientName + " from receipt");
}

function payBill() {
    if (money >= cost) {
        money = money - cost
        moneyDisplay.textContent = "You have " + money + " euros."
        costOfHamburger.textContent = "You have paid."
        payButton.remove()
        lettuceButton.removeEventListener('click', addIngredientHandler);
        burgerButton.removeEventListener('click', addIngredientHandler);
        tomatoButton.removeEventListener('click', addIngredientHandler);
        message.textContent = "Enjoy your hamburger!"
    } else if (money < cost) {
        message.textContent = "You do not have enough money."
        message.style.color = "red"

        setTimeout(() => {
                message.textContent = "";
            }, 1000);
    }
}

payButton.addEventListener('click', payBill)


