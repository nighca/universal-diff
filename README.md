diff-merge
==========

diff &amp; merge algorithm realized with Javascript

There are two compare methods: simple/myers(used as default), while the latter performs better in most situations(O(ND)).

### Usage

 - nodejs

		var _ = require('diff-merge'),
			compare = _.compare,
			merge = _.merge;

 - browser
 
		<script type="text/javascript" src="../lib/myers-compare.js"></script>
		<script type="text/javascript" src="../lib/merge.js"></script>

### Compare

	var s1 = 'abc',
		s2 = 'abcd',
		splitter = '';

	var compareResult = compare(s1, s2, splitter);

### Merge

	var s3 = merge(s1, compareResult);

### Test

	test/test.html

### Algorithm

SIMPLE: http://en.wikipedia.org/wiki/Levenshtein_distance

MYERS': https://neil.fraser.name/software/diff_match_patch/myers.pdf
