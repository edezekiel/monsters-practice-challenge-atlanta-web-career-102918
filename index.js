document.addEventListener("DOMContentLoaded", initPage)

function initPage(){
    fetchMonsters()
    console.log("DOM fully loaded and parsed")
}

// fetches all 1000+ monsters
function fetchMonsters(){
  fetch("http://localhost:3000/monsters")
  .then(function(response){
    return response.json();
  })
  .then(function(myJson) {
    myJson.forEach(loadMonster)
    console.log("monsters loaded")
    showHundredMonsters(0)
    console.log("first ten monsters displayed")
    addForwardHandler()
    addBackHandler()
    addCreateHandler()
  })
}

// load monsters into page (invisibly)
function loadMonster(monster){
  console.log("loading monsters.....")
  container = document.querySelector("#monster-container")
  mon = document.createElement('span')
  mon.dataset.name = monster.name
  mon.dataset.age = monster.age
  mon.dataset.description = monster.description
  mon.dataset.id = monster.id
  container.appendChild(mon)
}

// display first ten monsters
function showHundredMonsters(index){
  removeElementsByClass("displayed-monster")
  allMonsters = document.querySelectorAll("#monster-container span")
  i = index
  while (i < index + 100) {
    showMon = document.createElement('div')
    showMon.innerText = `Name: ${allMonsters[i].dataset.name}
    Age: ${allMonsters[i].dataset.age}
    Description: ${allMonsters[i].dataset.description}
    ID: ${allMonsters[i].dataset.id}`
    showMon.dataset.id = allMonsters[i].dataset.id
    showMon.style.margin = "20px"
    showMon.className = "displayed-monster"
    container.appendChild(showMon)
    i++
  }
}

// display next ten monsters
function nextTen(){
  allMonsters = document.querySelectorAll("#monster-container span")
  length = document.querySelectorAll(".displayed-monster").length
  index = document.querySelectorAll(".displayed-monster").item(length - 1).dataset.id
  // let totalMonsters = document.querySelectorAll("#monster-container span").length
  if (parseInt(index) < allMonsters.length) {
    showHundredMonsters(parseInt(index))
  } else {
    alert("There aren't any more monsters!")
  }
}

function previousTen(){
  length = document.querySelectorAll(".displayed-monster").length
  index = document.querySelectorAll(".displayed-monster").item(length - 1).dataset.id
  if (parseInt(index) > 100) {
    showHundredMonsters(parseInt(index) - 200)
  } else {
    alert("You're at the start of the list already!")
  }
}

// add eventhandler to "next" button
function addForwardHandler(){
  let button = document.querySelector("#forward")
  button.addEventListener('click', nextTen)
}

// display previous ten monsters
function addBackHandler(){
  let button = document.querySelector("#back")
  button.addEventListener('click', previousTen)
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function addCreateHandler(){
  let newMonster = document.querySelector("#create-monster")
  let f = document.createElement('form')
  f.setAttribute('method', 'post')
  f.setAttribute('action', 'submit')
  let n = document.createElement('input')
  n.setAttribute('name', 'name')
  n.setAttribute('placeholder', 'name')
  let a = document.createElement('input')
  a.setAttribute('name', 'age')
  a.setAttribute('placeholder', 'age')
  let d = document.createElement('input')
  d.setAttribute('name', 'description')
  d.setAttribute('placeholder', 'description')
  let s = document.createElement('input')
  s.setAttribute('type', 'submit')
  s.setAttribute('value', 'Create Monster')
  s.addEventListener('click', createMonster)

  f.appendChild(n)
  f.appendChild(a)
  f.appendChild(d)
  f.appendChild(s)

  newMonster.appendChild(f)
}

function createMonster(event){
  event.preventDefault()
  console.log("use this to create a monster")

  fetch("http://localhost:3000/monsters", {
    method: 'post',
    headers:
    {
        "Content-Type" : "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
      name: document.querySelectorAll("input")[0].value,
      age: document.querySelectorAll("input")[1].value,
      description: document.querySelectorAll("input")[2].value
    })
  })
  .then(function(response){return response.json()})
  .then(function(newMonster) {
    updatePage(newMonster)
  })
}

function updatePage(newMonster) {
  console.log(newMonster)
  console.log("now I need to update the page with new monster")
  fetchMonsters()
}
