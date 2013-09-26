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
                error
                failure       assertion
*/



define([
     'intern/node_modules/dojo/node!xmlbuilder' // require('xmlbuilder')
    ,'intern/node_modules/dojo/node!fs'         // require('fs')
], function(xml, fs) {

    var xtestsuites, xtestsuite, xtest;

    var errors, failures, tests;

    var isFunctional;

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
			//console.log('    suite ' + suite.name + ' started');
            isFunctional = suite.name.indexOf('(functional)') !== -1;
            var name = suite.name;
            if (isFunctional) {
                name = name.substring( 0,  name.length - 13 );
            }
            xtestsuite = xtestsuites.ele('testsuite', {name:(isFunctional ? 'functional' : 'unit') + '.' +  name});
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
            tests      = 0;
            errors     = 0;
            failures   = 0;
		},

        '/test/pass': function(test) {
			console.log('      test ' + test.name + ' passed');
            ++tests;
		},

        '/test/error': function(test) {
			console.log('      test ' + test.name + ' error');
            console.log(test.error.name + ': ' + test.error.message);
            ++assertions;
            ++tests;
            xtest.ele('error', {type:test.error.name, message:test.error.message});
            if (test.error.stack) {
                xtest.ele('system-err', test.error.stack);
            }
		},

        '/test/fail': function(test) {
			console.log('      test ' + test.name + ' failed');
            console.log(test.error.name + ': ' + test.error.message);
            ++tests;
            ++failures;
            xtest.ele('failure', {type:test.error.name, message:test.error.message});
            if (test.error.stack) {
                xtest.ele('system-err', test.error.stack);
            }
		},

		'/test/end': function(test) {
            //console.log(test);
			//console.log('      test ' + test.name + ' ended');
            xtest.att('tests',      tests);
            xtest.att('failures',   failures);
            xtest.att('errors',     errors);
            xtest.att('time',       test.timeElapsed);
		}

	};
});
