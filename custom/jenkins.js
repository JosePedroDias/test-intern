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


    testsuites
        testsuite
            testcase          test
                error         assertion
                failure
*/



define([
     'intern/node_modules/dojo/node!xmlbuilder' // require('xmlbuilder')
    ,'intern/node_modules/dojo/node!fs'         // require('fs')
], function(xml, fs) {

    var xtestsuites, xtestsuite, xtest;

    var errors, failures, assertions;

	return {

        '/runner/start': function() {
            xtestsuites = xml.create('testsuites');
        },

        '/runner/end': function() {
            //console.log( xtestsuites.end({pretty:true}) );
            fs.writeFile('report.xml', xtestsuites.end({pretty:true}) );
        },



        '/session/start': function(remote) {
			console.log('  session ' + remote.environmentType + ' started');
		},

		'/session/end': function(remote) {
			console.log('  session ' + remote.environmentType + ' ended');
		},



        '/suite/start': function(suite) {
			console.log('    suite ' + suite.name + ' started');
            xtestsuite = xtestsuites.ele('testsuite', {name:suite.name});
		},

        '/suite/error': function(suite) {
			//console.log('    suite ' + suite.name + ' error');
		},

		'/suite/end': function(suite) {
            //console.log(suite);
			console.log('    suite ' + suite.name + ' ended');
		},



		'/test/start': function(test) {
			//console.log('      test ' + test.name + ' started');
            xtest = xtestsuite.ele('testcase', {name:test.name});
            assertions = 0;
            errors     = 0;
            failures   = 0;
		},

        '/test/pass': function(test) {
			console.log('      test ' + test.name + ' passed');
            ++assertions;
		},

        '/test/fail': function(test) {
			console.log('      test ' + test.name + ' failed');
            ++assertions;
            ++failures;
            xtest.ele('failure');
		},

		'/test/end': function(test) {
            //console.log(test);
			//console.log('      test ' + test.name + ' ended');
            xtest.att('assertions', assertions);
            xtest.att('failures',   failures);
            xtest.att('errors',     errors);
            xtest.att('time',       test.timeElapsed);
		}

	};
});
