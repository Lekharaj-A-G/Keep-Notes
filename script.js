const addButton = document.getElementById("add");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  console.log(textAreaData);
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNotes = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="operation">
        <button class="edit"><i class="ri-edit-box-fill "></i></button>
        <button class="delete"><i class="ri-delete-bin-fill" ></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>  `;

  note.insertAdjacentHTML("afterbegin", htmlData);
  //    console.log(note);

  //    getting the references
  const editbutton = note.querySelector(".edit");
  const delbutton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // deleting the node
  delbutton.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  // toggle using edit button

  textArea.value = text;
  mainDiv.innerHTML = text;

  editbutton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLSData();
  });

  document.body.appendChild(note);
};

// gettting data back from local storage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNotes(note));
}

addButton.addEventListener("click", () => addNewNotes());
