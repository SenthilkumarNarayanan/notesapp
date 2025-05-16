const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
const savedNotes= JSON.parse(localStorage.getItem("notes"))|| [];
notesContainer.innerHTML="";

savedNotes.forEach((text)=>{
    let inputWrapper = document.createElement("div");
    inputWrapper.className = "note";
  
    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.textContent=text;

    let img = document.createElement("img");
    img.src = "/delete.jpg";
    img.setAttribute("draggable", "false");
    img.className = "delete-btn";
  
    inputWrapper.appendChild(inputBox);
    inputWrapper.appendChild(img); // not inside inputBox, just visually placed over it
    notesContainer.appendChild(inputWrapper);

})
}
showNotes();

function updateStorage() {
    const inputBoxes = document.querySelectorAll(".input-box");
    const notesData = [];
  
    inputBoxes.forEach((box) => {
      notesData.push(box.textContent.trim()); // only text, no tags
    });
  
    localStorage.setItem("notes", JSON.stringify(notesData));
  }
  
  function placeCursorAtEnd(el) {
    el.focus(); // Focus the element
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false); // Collapse to the end
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
  
createBtn.addEventListener("click", () => {
    // Create a wrapper div for styling
    let inputWrapper = document.createElement("div");
    inputWrapper.className = "note";
  
    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
  
    let img = document.createElement("img");
    img.src = "/Notesapp/delete.jpg";
    img.setAttribute("draggable", "false");
    img.className = "delete-btn";
  
    inputWrapper.appendChild(inputBox);
    inputWrapper.appendChild(img); // not inside inputBox, just visually placed over it
  
    notesContainer.appendChild(inputWrapper);
    placeCursorAtEnd(inputBox)
    updateStorage();

  });
  notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
      e.target.parentElement.remove(); // removes entire note
      updateStorage();
    } else if (e.target.classList.contains("input-box")) {
      notes = document.querySelectorAll(".input-box");
      notes.forEach((nt) => {
        nt.onkeyup = function () {
          updateStorage();
        };
      });
    }
  });
  

