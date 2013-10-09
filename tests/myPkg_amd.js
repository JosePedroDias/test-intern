define([
    'intern!object',
    'intern/chai!assert',
    'lib/myPkg_amd'
], function(registerSuite, assert, myPkg) {
    registerSuite({
        name: 'myPkg_amd',

        add1: function() {
            assert.equal( myPkg.add1(2), 3 , 'add1(2) should return 3');
        },

        add2: function() {
            //assert.equal( myPkg.add2(2), 4 , 'add2(2) should return 4'); // FAILURE

            assert.notEqual( myPkg.add2(2), 4 , 'add2(2) should NOT return 4');
        },

        add3: function() {
            //throw 'argh'; // ERROR

            //assert.equal( myPkg.add3(2), 5 , 'add3(2) should return 5');

            assert.throw(
                function() {
                    myPkg.add3(2)
                },
                'BANG',
                'add3(2) should throw Error'
            );
        }
    });
});
