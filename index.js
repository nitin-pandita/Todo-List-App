const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
    const itemFromStorage = getItemFromStorage();

    itemFromStorage.forEach((item) => {
        addItemDOM(item);
    });
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    // Validate Test
    if (newItem === "") {
        alert("Please Enter a Value");
        return;
    }
    // Check for Edit mode
    if (isEditMode) {
        const ItemEdit = itemList.querySelector(".edit-mode");

        removeItemFromStorage(ItemEdit.textContent);
        ItemEdit.classList.remove(".edit-mode");
        ItemEdit.remove();
        isEditMode = false;
    } else {
        if (isElementInStorage(newItem)) {
            alert("Element is already present ");
            return;
        }
    }

    //  now we are just creating a new function for building a li and a button
    // create element
    addItemDOM(newItem);

    // Adding element to local storage
    additemtoStorage(newItem);

    checkUi(); // for checking the ui again

    itemInput.value = "";
}

function addItemDOM(item) {
    // this function will help us to create a li item with text
    // Create list items
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));

    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);

    // add li to dom
    itemList.appendChild(li);
}

function additemtoStorage(item) {
    let itemFromStorage = getItemFromStorage();
    // adding new item to array
    itemFromStorage.push(item);
    // converting to JSON string and set to a local storage
    // item = key itemfromStorage =  value
    localStorage.setItem("item", JSON.stringify(itemFromStorage));
}
// function for getting item  item from storage
function getItemFromStorage() {
    let itemFromStorage;
    if (localStorage.getItem("item") === null) {
        // if there is no element in the local storage then it will simply return the empty array
        itemFromStorage = [];
    } else {
        // if it has some element then will convert it into string
        itemFromStorage = JSON.parse(localStorage.getItem("item"));
    }
    return itemFromStorage;
}

function createButton(classes) {
    const button = document.createElement("button");
    button.className = classes;
    const icon = CreateIcons("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}
// local storage function for storing data

function CreateIcons(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

// for removing a single element

function onCLickItem(e) {
    if (e.target.parentElement.classList.contains("remove-item")) {
        removeFun(e.target.parentElement.parentElement);
    } else {
        setItemMode(e.target);
    }
}

function setItemMode(item) {
    isEditMode = true;
    itemList
        .querySelectorAll("li")
        .forEach((i) => i.classList.remove("edit-mode"));
    item.classList.add("edit-mode");
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> &nbsp Update Item';
    formBtn.style.backgroundColor = "#228B22";

    itemInput.value = item.textContent;
}

function removeFun(item) {
    if (confirm("Are you Sure")) {
        item.remove();

        // removing the element form the storage also
        removeItemFromStorage(item.textContent);

        checkUi();
    }
}

function removeItemFromStorage(item) {
    let itemFromStorage = getItemFromStorage();

    // now filtering out the items to be removed from the array
    itemFromStorage = itemFromStorage.filter((i) => i !== item);

    // Re-set to local storage
    localStorage.setItem("item", JSON.stringify(itemFromStorage));
}

// for clearing all the items
function ClearItem() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    // clear from Local Storage
    localStorage.removeItem("item");

    checkUi();
}

// adding a item filter for searching items
function filterItem(e) {
    // we will use toLowerCase to convert all the text to lowercase
    const text = e.target.value.toLowerCase();
    // for getting the access of the list we will be using the items
    const items = itemList.querySelectorAll("li");

    // as item is a node list we can use for each loop

    items.forEach((item) => {
        // this will give us all the text as text is the first child in li
        const itemName = item.firstChild.textContent.toLowerCase();
        // index of will give us -1 if element not in list
        if (itemName.indexOf(text) != -1) {
            // by default the list style was flex
            item.style.display = "flex";
        } else {
            // if not equal to item then display none
            item.style.display = "none";
        }
    });
}

function checkUi() {
    itemInput.value = "";
    // it will check if there is any element in the list if not then will not show the filter icon
    itemInput.value = "";

    const items = itemList.querySelectorAll("li");

    if (items.length === 0) {
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"><i> Add &nbsp note';

    formBtn.style.background = "#333";
    formBtn.style.fontFamily = "Poppins";
}
// for checking if the element exists in the local storage or not

function isElementInStorage(item) {
    const itemFromStorage = getItemFromStorage();

    return itemFromStorage.includes(item);
}

// init function
function Init() {
    // Event Listeners

    itemForm.addEventListener("submit", onAddItemSubmit);
    itemList.addEventListener("click", onCLickItem);
    clearBtn.addEventListener("click", ClearItem);
    itemFilter.addEventListener("input", filterItem);
    checkUi();
    document.addEventListener("DOMContentLoaded", displayItems);
}

// quick demo of Local Storage -------- ----- ---- --- ---

// localStorage.setItem("name", "Nitin");
// console.log(localStorage.getItem("name"));
// localStorage.clear();

Init();