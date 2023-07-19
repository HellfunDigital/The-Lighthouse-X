```javascript
// Define the Puzzle schema
class Puzzle {
  constructor(id, type, content, solution, hint) {
    this.id = id;
    this.type = type;
    this.content = content;
    this.solution = solution;
    this.hint = hint;
  }
}

// Define the puzzles
let puzzles = [
  new Puzzle(1, 'riddle', 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?', 'An echo', 'You can hear me, but never see me.'),
  new Puzzle(2, 'cipher', 'Vg\'f nyy va gur anzr.', 'It\'s all in the name.', 'Think about shifting positions.'),
  // Add more puzzles as needed
];

// Function to check if a puzzle is solved
function solvePuzzle(puzzleId, answer) {
  let puzzle = puzzles.find(p => p.id === puzzleId);
  if (puzzle && puzzle.solution.toLowerCase() === answer.toLowerCase()) {
    // Emit a custom event to indicate the puzzle is solved
    let event = new CustomEvent('PUZZLE_SOLVED', { detail: { puzzleId: puzzleId } });
    document.dispatchEvent(event);
    return true;
  }
  return false;
}

// Function to display a puzzle hint
function showHint(puzzleId) {
  let puzzle = puzzles.find(p => p.id === puzzleId);
  if (puzzle) {
    alert(puzzle.hint);
  }
}

// Export the puzzles and functions
export { puzzles, solvePuzzle, showHint };
```