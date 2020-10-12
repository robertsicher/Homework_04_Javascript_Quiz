//Define the variables
var clearBtn = document.querySelector("#clear-button");
var scoresDisplay = document.querySelector("#scores-display");
var scoresTable = document.querySelector("#scores-table");
var scoresChild;
var currentPage = document.location.href;
var allScores;

// Display the scores
renderScores();

function renderScores() {

  // Pull the scores
  getAllScores();
  
  if(allScores.length > 0){
    scoresTable.removeAttribute("class");
    scoresTable.setAttribute("class","table table-responsive table-striped");
    
    // Sort the entries 
    var data = allScores.sort(compareValues("score", "desc"));
    
    //Display the updated scores
    for(var i=0; i < data.length; i++){
      var tr = document.createElement("tr");
      var tdName = document.createElement("td");
      var tdScore = document.createElement("td");
      var tdDate = document.createElement("td");
      tdName.textContent = data[i].name
      tdScore.textContent = data[i].score
      tdDate.textContent = data[i].date
      tr.appendChild(tdName);
      tr.appendChild(tdScore);
      tr.appendChild(tdDate);
      scoresDisplay.appendChild(tr);
      
    }
  }   
  else{
    scoresTable.setAttribute("class","d-none");
  }
  
}

// Pulls the scores
function getAllScores() {

  // Start it with an empty array
  if(!localStorage.getItem("allScores")){
    allScores = [];
  }
  else{
    allScores = JSON.parse(localStorage.getItem("allScores"));
  }
}


// Function to sort the entries in the allScores array
function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    
    const varA = (typeof a[key] === "string")
    ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === "string")
    ? b[key].toUpperCase() : b[key];
    
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === "desc") ? (comparison * -1) : comparison
      );
  };
}
  
// Event listener for clear Highscores
clearBtn.addEventListener("click", function(){

  // Clear conf
  var confirmClear = confirm("Are you sure you want to clear the Highscores?\nOk = Yes. Cancel = No")
  
  if (confirmClear){
    localStorage.setItem("allScores","");
    renderScores();
  }

})