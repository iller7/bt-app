(function () {
  'use strict';

  describe('BTApp', function () {
    describe('BTApp is enabled', function () {
      it('the app is loaded', function () {
        assert.equal(typeof btApp, 'object');
      });
      it('the custom validator is exposed', function () {
        assert.equal(typeof btApp.customValidator, 'function');
      });
      it('this is a fail', function () {
        assert.equal(1, 2);
      });
    });
  });
})();
