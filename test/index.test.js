const assert = require('assert');
const { navLinks, updateNavigation } = require('../src/js/navigation.js');

describe('Navigation', function() {
  describe('#updateNavigation()', function() {
    it('should update navigation links when called', function() {
      updateNavigation();
      assert.equal(navLinks[0], 'Home');
      assert.equal(navLinks[1], 'Lore');
      assert.equal(navLinks[2], 'Puzzles');
      assert.equal(navLinks[3], 'Clues');
    });
  });
});

describe('Home Page', function() {
  it('should have a lighthouse image and a teaser text', function() {
    let homePage = require('../src/index.html');
    assert(homePage.includes('<img src="src/assets/images/lighthouse.jpg"'));
    assert(homePage.includes('<p class="teaser-text"'));
  });
});