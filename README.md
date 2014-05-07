diff-merge
==========

diff &amp; merge algorithm realized with Javascript

### Usage

 - nodejs

		var _ = require('diff-merge'),
			compare = _.compare,
			merge = _.merge;

 - browser
 
		<script type="text/javascript" src="../lib/compare.js"></script>
		<script type="text/javascript" src="../lib/merge.js"></script>

### Compare

	var s1 = 'a,bc',
		s2 = 'a,bcd',
		splitter = ',';

	var compareResult = compare(s1, s2, splitter);

### Merge

	var s3 = merge(s1, compareResult);

### Test

	test/test.html

### Algorithm

	http://en.wikipedia.org/wiki/Levenshtein_distance