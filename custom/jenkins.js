/*
    ongoing reporter for jenkins-compatible XML report


    REFERENCE:
    https://github.com/theintern/intern/wiki/Using-and-Writing-Reporters#available-reporter-topics
    http://stackoverflow.com/questions/4922867/junit-xml-format-specification-that-hudson-supports
    https://github.com/touv/node-xml-writer#api-documentation
    https://github.com/theintern/intern/blob/master/lib/reporters/console.js


    KEYS:
    remote: _wd,_desiredEnvironment,_context,_lastPromise,sessionId,proxyUrl,environmentType
    suite:  name,sessionId,hasParent,tests,numTests,numFailedTests,error
        suite.numTests
        suite.numFailedTests
        suite.error.relatedTest.name - on /suite/error
    test:   name,test,parent,isAsync,timeElapsed,hasPassed
        test.timeElapsed - in ms
        test.error - on /test/fail
*/



define([
    'intern/node_modules/dojo/node!xml-writer' // require('xml-writer')
], function (XMLWriter) {

    var x;

	return {

        start: function() {
            console.log('** REPORTER START **');

            x = new XMLWriter();
            x.startDocument();
            x.startElement('root');
            x.writeAttribute('foo', 'value');
            x.text('Some content');
        },

        stop: function() {
            console.log('** REPORTER STOP **');

            x.endDocument();
            console.log( x.toString() );
        },



        '/session/start': function(remote) {
			console.log('session ' + remote.environmentType + ' started');
		},

		'/session/end': function(remote) {
			console.log('session ' + remote.environmentType + ' ended');
		},



        '/suite/start': function(suite) {
			console.log('suite ' + suite.name + ' started');
		},

        '/suite/error': function(suite) {
			console.log('suite ' + suite.name + ' error');
		},

		'/suite/end': function(suite) {
			console.log('suite ' + suite.name + ' ended');
		},



		'/test/start': function(test) {
			console.log('test ' + test.name + ' started');
		},

        '/test/pass': function(test) {
			console.log('test ' + test.name + ' passed');
		},

        '/test/fail': function(test) {
			console.log('test ' + test.name + ' failed');
		},

		'/test/end': function(test) {
			console.log('test ' + test.name + ' ended');
		}

	};
});
