// Selectors
const text = document.querySelector('.todo-input')
const button = document.querySelector('.btn')
const todolist = document.querySelector('.todo-list')



// Event Listner
button.addEventListener('click', addTodo)
todolist.addEventListener('click',deleteTodo)







// Todo Add Function
function addTodo(event) {
    event.preventDefault()
    // Todo Div
    const todoDiv = document.createElement('div')
    
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li')

    newTodo.innerText = text.value

    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    // Mark buttons

    const completedButton = document.createElement('button')

    completedButton.innerHTML = '<i class="fas fa-check"></i> '

    completedButton.classList.add('complete-btn')

    todoDiv.appendChild(completedButton)

    // Trash Button
    const trashButton = document.createElement('button')

    trashButton.innerHTML = '<i class="fas fa-trash"></i>  '

    trashButton.classList.add('trash-btn')

    todoDiv.appendChild(trashButton)


    // attach    
    todolist.appendChild(todoDiv)


    // CLearning the text form the input field

    text.value = ""
    

    // Deleting Item using the icon


}

// Delete todo function

function deleteTodo(event) {
    const item = event.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');

        todo.addEventListener('transitionend',function (){
            
            todo.remove();
        })
    }

      // Check Mark function

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
  }




