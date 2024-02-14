// Define variables for elements on the notes.html page
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

// Check if the current page is notes.html
if (window.location.pathname === '/notes.html' || window.location.pathname === '/notes') {
    // Select elements specific to notes.html
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    saveNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    noteList = document.querySelector('.list-group'); 

    // Event listeners for elements on notes.html
    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNewNoteView);
    noteTitle.addEventListener('keyup', handleRenderSaveBtn);
    noteText.addEventListener('keyup', handleRenderSaveBtn);
}

// Function to fetch and render notes from local storage
const getAndRenderNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    renderNoteList(notes);
};

// Function to render the list of notes
const renderNoteList = (notes) => {
    // Clear the existing list of notes
    noteList.innerHTML = '';

    // Render each note in the list
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerText = note.title;
        noteList.appendChild(li);
    });
};

// Function to handle saving a new note to local storage
const handleNoteSave = () => {
    const newNote = {
        title: noteTitle.value,
        text: noteText.value
    };

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    renderNoteList(notes);

    noteTitle.value = '';
    noteText.value = '';
};

// Function to handle viewing a new note
const handleNewNoteView = () => {
    noteTitle.value = '';
    noteText.value = '';
};

// Function to handle rendering the save button
const handleRenderSaveBtn = () => {
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
        saveNoteBtn.style.display = 'none';
    } else {
        saveNoteBtn.style.display = 'inline';
    }
};

// Call the getAndRenderNotes function on page load
getAndRenderNotes();
