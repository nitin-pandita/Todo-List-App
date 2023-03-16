const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

const itemFilter = document.getElementById("filter");

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // Validate Test
  if (newItem === "") {
    alert("Please Enter a Value");
    return;
  }
  // Create list items
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // add li to dom
  itemList.appendChild(li);

  checkUi(); // for checking the ui again

  itemInput.value = "";
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = CreateIcons("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function CreateIcons(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// for removing a single element

function removeFun(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();
    }
    checkUi();
  }
}

// for clearing all the items
function ClearItem() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUi();
}

function checkUi() {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");
  console.log(items);

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Event Listeners

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeFun);
clearBtn.addEventListener("click", ClearItem);

checkUi();
