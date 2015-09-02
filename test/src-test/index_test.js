'use strict';

var assert = require('chai').assert;
var gitCommonAncestor = require('../../');

describe('module/index', function() {
  describe('#ofShaAndBranch', function() {
    it('should return branching point', function() {
      var sha = '92ce1d58080270ffc87b63a90cba18866f29ba9f';
      var branch = 'master';
      var expected = 'f7d7655f237486d52e8b71a8bb701e63121bec9b';

      return gitCommonAncestor.ofShaAndBranch(sha, branch)
      .then(function(result) {
        assert.strictEqual(result, expected);
      });
    });
  });

  describe('#getShaHistory', function() {
    var getShaHistory;

    beforeEach(function() {
      getShaHistory = gitCommonAncestor.__get__('getShaHistory');
    });

    it('should return expected', function() {
      var expected = [
        '92ce1d58080270ffc87b63a90cba18866f29ba9f',
        'f7d7655f237486d52e8b71a8bb701e63121bec9b'
      ];

      return getShaHistory('92ce1d58080270ffc87b63a90cba18866f29ba9f')
      .then(function(result) {
        assert.deepEqual(result, expected);
      });
    });
  });

  describe('#getLastCommonSha', function() {
    var getLastCommonSha;

    beforeEach(function() {
      getLastCommonSha = gitCommonAncestor.__get__('getLastCommonSha');
    });

    it('should be null with empty arrays', function() {
      var result = getLastCommonSha([], []);
      assert.isNull(result);
    });

    it('with one thing in history should be one thing', function() {
      var result = getLastCommonSha(['a'], ['a']);
      assert.strictEqual(result, 'a');
    });

    it('should be last one that is the same from end', function() {
      var result = getLastCommonSha(
        ['a', 'b', 'c'],
        ['d', 'b', 'c']
      );
      assert.strictEqual(result, 'b');
    });

    it('should be null if nothing common', function() {
      var result = getLastCommonSha(['a', 'b'], ['c', 'd']);
      assert.isNull(result);
    });

    it('should be branching point', function() {
      var history1 = ['0', '1', '2', 'a', 'b', 'c', 'd', 'e'];
      var history2 = ['f', 'g', 'c', 'd', 'e'];
      var result = getLastCommonSha(history1, history2);
      assert.strictEqual(result, 'c');
    });
  });
});
