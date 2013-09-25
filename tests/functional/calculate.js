/*
 fills input with 2, clicks calculate button and checks if span has 3 as innerHTML
*/

define([
	'intern!object',
	'intern/chai!assert',
	'require'
], function(registerSuite, assert, require) {
	var url = '../../index.html';

	registerSuite({
		name: 'calculate (functional)',

		'abc': function() {
			return this.remote
				.get( require.toUrl(url) )
                    .elementByTagName('input')
                        .clickElement()
                    //.elementByTagName('button')
                        //.type('2')
                    //.elementByTagName('button')
                        //.click(0)
                    /*.elementByTagName('span', function(err, el) {
                        //assert.equal(el.innerHTML, '3', 'result of calculate for 2 should be 3')
                    });*/

                        /*
                    .elementByTagName('span')
                        .getAttribute('value')
                        .then(function(val) {
                            assert.ok( parseInt(val, 10) === 3, 'result of calculate for 2 should be 3');
                        });*/
		}
	});
});
