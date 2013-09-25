/*
    ongoing reporter for jenkins-compatible XML report

    https://github.com/theintern/intern/wiki/Using-and-Writing-Reporters#available-reporter-topics

    http://stackoverflow.com/questions/4922867/junit-xml-format-specification-that-hudson-supports
*/

define([], function () {
	return {

        '/session/start': function(remote) {
			console.log(remote.environmentType + ' started');
		},

		'/session/end': function(remote) {
			console.log(remote.environmentType + ' ended');
		},



        '/suite/start': function(suite) {
			console.log(suite.id + ' started');
		},

        '/suite/error': function(suite) {
			console.log(suite.id + ' error');
		},

		'/suite/end': function(suite) {
			console.log(suite.id + ' ended');
		},



		'/test/start': function(test) {
			console.log(test.id + ' started');
		},

        '/test/pass': function(test) {
			console.log(test.id + ' passed');
		},

        '/test/fail': function(test) {
			console.log(test.id + ' failed');
		},

		'/test/end': function(test) {
			console.log(test.id + ' ended');
		}

	};
});
