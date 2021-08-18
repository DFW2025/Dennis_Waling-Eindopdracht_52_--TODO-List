// JAVASCRIPT

// Universal

const header = new Headers();
header.append("Content-Type", "application/json");
const url = 'http://localhost:3000/';

// GET REQUEST HEADER

const get = {
    method: "GET",
    headers: header,
    redirect: "follow"
};

// DEL REQUEST HEADER

const del = {
    method: "DELETE"
};


// Onload Page .... 

document.addEventListener("DOMContentLoaded", () => {

    async function getItems() {
        await fetch(url, get)
            .then(resp => resp.json())
            .then(data => Items(data))
            .catch(err => console.log(err));

    }

    // GET Items

    function Items(data) {

        for (const item of data) {

            const newLi = document.createElement("li");
            const newH1 = document.createElement("h1");
            const checkTask = document.createElement("label")
            const deleteTask = document.createElement("button")
            checkTask.classList.add("checktask")
            deleteTask.classList.add("deltask")
            newLi.dataset.id = item._id
            newH1.innerHTML = item.description;

            function check() {
                if (item.done === true) {
                    checkTask.innerHTML = `<input type="checkbox" checked>`
                    newH1.classList.add("taskdone")
                    newH1.classList.remove("tasknotdone")
                } else {
                    checkTask.innerHTML = `<input type="checkbox">`
                    newH1.classList.remove("taskdone")
                    newH1.classList.add("tasknotdone")
                }
            }
            check()

            deleteTask.innerHTML = `<i class ="fas fa-trash"> </i>`;
            const todoList = document.getElementById("todo-list").getElementsByTagName("ul")[0];
            todoList.appendChild(newLi);
            newLi.appendChild(newH1);
            newLi.appendChild(checkTask);
            newLi.appendChild(deleteTask);

            // DELETE Items

            deleteTask.addEventListener("click", () => deleteItem())

            async function deleteItem() {
                await fetch(`http://localhost:3000/${item._id}`, del)
                    .then(newLi.remove())
                    .catch(err => console.log(err));
            }

            // UPDATE Items

            checkTask.addEventListener('click', e => {
                if (e.target.checked) {
                    console.log("ToDo Item is done..");
                    newH1.classList.add("taskdone")
                    newH1.classList.remove("tasknotdone")
                    updateItems(true);


                } else {
                    console.log("Todo Item is not yet done..");
                    newH1.classList.remove("taskdone")
                    newH1.classList.add("tasknotdone")
                    updateItems(false);

                }
            });

            async function updateItems(e) {
                const put = {

                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "done": e
                    })

                }
                await fetch(`http://localhost:3000/${item._id}`, put)
                    .then(resp => resp.json())
                    .catch(err => console.log(err));
            }


        }

    }

    getItems();


    // POST Items....

    const form = document.querySelector("#form");
    form.addEventListener("submit", (e) => postItem(e))

    async function postItem(e) {
        e.preventDefault();
        const newItem = document.querySelector("#input").value;
        const url = 'http://localhost:3000/';
        const post = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "description": newItem,
                "done": false
            })
        }


        await fetch(url, post)
            .then(resp => resp.json())
            .then(newitem => Items([newitem]))
            .catch(err => console.log(err));
    }

});

