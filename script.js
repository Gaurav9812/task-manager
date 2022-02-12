let serverToBeRemoved = 0;
let waitingTask = 0;
let servers = 4;
//to add a server
document.getElementById("addServer").addEventListener("click", function (e) {
  e.preventDefault();
  if (servers < 10) {
    let newServer = document.createElement("div");
    newServer.classList.add("server");
    let innerContaner1 = document.getElementById("inner-container1");
    innerContaner1.appendChild(newServer);
    servers++;
    document.getElementById("server").innerText = servers;
    console.log(servers);
    checkWaiting(newServer);
  }
});

//to remove server
document.getElementById("removeServer").addEventListener("click", function (e) {
  e.preventDefault();

  let innerContaner1 = document.getElementById("inner-container1").children;

  for (let i = innerContaner1.length - 1; i >= 1; i--) {
    if (innerContaner1[i].children.length != 1) {
      console.log("i ", i);
      innerContaner1[i].remove();
      servers--;
      document.getElementById("server").innerText = servers;

      return;
    }
  }
  if (innerContaner1.length > 1 && serverToBeRemoved < servers) {
    serverToBeRemoved++;

    document.getElementById("serverToBeRemoved").innerText = serverToBeRemoved;
  }
});

//to add a task
document.getElementById("addTask").addEventListener("click", function (e) {
  e.preventDefault();
  let numTask = document.getElementById("numTask").value;
  let innerContaner1 = document.getElementById("inner-container1").children;
  for (let i = 0; i < innerContaner1.length && numTask > 0; i++) {
    if (innerContaner1[i].children.length == 0) {
      numTask--;
      addTask(innerContaner1[i]);
    }
  }

  waitingTask += parseInt(numTask);
  console.log(waitingTask);
  addWaitingTask();
});

// if tasks are extra than server add a task to waiting
function addWaitingTask() {
  let start = document.getElementsByClassName("waiting-task").length;
  for (let i = start; i < waitingTask; i++) {
    let waitingTaskDiv = document.createElement("div");
    waitingTaskDiv.classList.add("waiting-task");

    let wait = document.createElement("div");
    wait.classList.add("wait");
    wait.innerText = "waiting.....";

    let btn = document.createElement("button");
    btn.innerHTML = "<i class='fa-solid fa-trash-can trash-icon'></i>";

    //adding eventListener to delete button
    btn.addEventListener("click", function (e) {
      console.log("hello");
      e.preventDefault();
      waitingTask--;
      waitingTaskDiv.remove();
    });

    //appending to dom
    waitingTaskDiv.appendChild(wait);
    waitingTaskDiv.appendChild(btn);
    document.getElementById("inner-container2").appendChild(waitingTaskDiv);
  }
}

// if waiting task are there add to task
function checkWaiting(container) {
  if (serverToBeRemoved > 0) {
    let innerContaner1 = document.getElementById("inner-container1").children;

    if (innerContaner1.length > 1) {
      container.remove();
      serverToBeRemoved--;
      document.getElementById("serverToBeRemoved").innerText =
        serverToBeRemoved;
      servers--;
      document.getElementById("server").innerText = servers;

      return;
    } else {
      document.getElementById("serverToBeRemoved").innerText = 0;
    }
  }
  if (waitingTask > 0) {
    waitingTask--;
    document.getElementById("inner-container2").children[0].remove();
    addTask(container);
  }
}

//add task to server and removing it in 20sec
function addTask(container) {
  let newTask = document.createElement("div");
  newTask.classList.add("task");
  container.appendChild(newTask);
  let filler = document.createElement("div");
  filler.classList.add("fill");
  newTask.appendChild(filler);
  let currentWidth = 0;
  let interval = setInterval(function () {
    filler.style.width = currentWidth + "%";
    if (currentWidth >= 100) {
      clearInterval(interval);
      newTask.remove();
      checkWaiting(container);
    }
    currentWidth += 0.05;
  }, 10);
}
