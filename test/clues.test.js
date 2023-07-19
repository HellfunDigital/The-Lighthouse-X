```javascript
const assert = require('assert');
const { findClue, clues } = require('../src/js/clues.js');

describe('Clues', function() {
  describe('#findClue()', function() {
    it('should return a clue when a valid clue id is given', function() {
      const clueId = clues[0].id;
      const clue = findClue(clueId);
      assert.equal(clue.id, clueId);
    });

    it('should return undefined when an invalid clue id is given', function() {
      const clue = findClue('invalid-id');
      assert.equal(clue, undefined);
    });
  });

  describe('CLUE_FOUND', function() {
    it('should emit a CLUE_FOUND event when a clue is found', function(done) {
      const clueId = clues[0].id;
      process.once('CLUE_FOUND', function(foundClueId) {
        assert.equal(foundClueId, clueId);
        done();
      });
      findClue(clueId);
    });
  });
});
```