const assert = require('assert');
const { puzzles, solvePuzzle } = require('../src/js/puzzles.js');

describe('Puzzles', function() {
  describe('#solvePuzzle()', function() {
    it('should return true when the puzzle is solved correctly', function() {
      const puzzle = puzzles[0];
      const solution = puzzle.solution;
      assert.equal(solvePuzzle(puzzle.id, solution), true);
    });

    it('should return false when the puzzle is solved incorrectly', function() {
      const puzzle = puzzles[0];
      const wrongSolution = 'wrong answer';
      assert.equal(solvePuzzle(puzzle.id, wrongSolution), false);
    });

    it('should emit PUZZLE_SOLVED event when a puzzle is solved', function(done) {
      const puzzle = puzzles[0];
      const solution = puzzle.solution;

      process.on('PUZZLE_SOLVED', function(data) {
        assert.equal(data.id, puzzle.id);
        done();
      });

      solvePuzzle(puzzle.id, solution);
    });
  });
});