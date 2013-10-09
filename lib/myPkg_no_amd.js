window.myPkg = {
    add1: function(n) {
        return n + 1; // OK
    },

    add2: function(n) {
        return n; // BAD ASSERTION
    },

    add3: function(n) {
        throw new Error('BANG'); // ERROR
    }
};
