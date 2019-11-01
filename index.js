document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  const menu = document.querySelector("#burger-menu")
  const orderQueue = document.querySelector("#order-list")
  const customOrder = document.querySelector("#custom-burger")

  function createBurger(burger){
      // create burger div
      let burgerDiv = document.createElement("div")
      burgerDiv.setAttribute("class", "burger")
      burgerDiv.setAttribute("id", burger.id)

      // create title
      let burgerTitle = document.createElement("h3")
      burgerTitle.setAttribute("class", "burger_title")
      burgerTitle.innerText = burger.name
      // append to burger
      burgerDiv.appendChild(burgerTitle)

      // create image
      let burgerImg = document.createElement("img")
      burgerImg.src = burger.image
      // append to burger
      burgerDiv.appendChild(burgerImg)

      // create description
      let burgerDesc = document.createElement("p")
      burgerDesc.setAttribute("class", "burger_description")
      burgerDesc.innerText = burger.description
      // append to burger
      burgerDiv.appendChild(burgerDesc)

      // create button
      let burgerButton = document.createElement("button")
      burgerButton.setAttribute("class", "button")
      burgerButton.innerText = "Add to Order"
      // append to burger
      burgerDiv.appendChild(burgerButton)
      
      // add button click event handler
      burgerButton.addEventListener("click", (event)=>{
        // create new order
        let newOrder = document.createElement("li")
        newOrder.innerText = burger.name
        // append new order to queue
        orderQueue.appendChild(newOrder)
      })

      //append burger to menu
      menu.appendChild(burgerDiv)
  }

  // first, get all burgers:
  fetch('http://localhost:3000/burgers')
  .then(response => response.json())
  .then(parsedFetch=>{
    parsedFetch.forEach(burger => {
      createBurger(burger)
    })

    customOrder.addEventListener("submit", (event) => {
      // prevent default behavior so we can grab those form values
      event.preventDefault()
      
      // grab those form values
      let nameValue = event.target.name.value
      let descValue = event.target.description.value
      let imgValue = event.target.url.value

      // success check
      console.log("form submitted!")

      fetch('http://localhost:3000/burgers', {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
        body: JSON.stringify({
          // post form values to db
          name: nameValue,
          description: descValue,
          image: imgValue
        })
      })
        // json parse the data
        .then(response => response.json())
        .then(parsedData =>{
          // bonus: append burger w/o refreshing
          createBurger(parsedData)
          // success check
          console.log(parsedData)
        })
      })
  })





})
