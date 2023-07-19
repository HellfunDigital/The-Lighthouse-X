```javascript
// Define the clues
let clues = [
  {
    id: 1,
    clue: 'The lighthouse keeper whispers secrets to the sea.',
    image: 'src/assets/images/clue1.jpg'
  },
  {
    id: 2,
    clue: 'Look to the stars for guidance.',
    image: 'src/assets/images/clue2.jpg'
  },
  // Add more clues as needed
];

// Function to find a clue
function findClue(id) {
  let clue = clues.find(clue => clue.id === id);
  if (clue) {
    // Display the clue in the clues-content section
    let cluesContent = document.querySelector('#clues-content');
    cluesContent.innerHTML = `
      <img src="${clue.image}" alt="Clue Image">
      <p>${clue.clue}</p>
    `;
    // Emit a CLUE_FOUND event
    let event = new CustomEvent('CLUE_FOUND', { detail: { id: id } });
    document.dispatchEvent(event);
  } else {
    console.error(`Clue with id ${id} not found.`);
  }
}

// Export the clues and findClue function for testing
export { clues, findClue };
```