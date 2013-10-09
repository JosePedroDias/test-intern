/*
    ongoing reporter for JSON report (but structure akin to junit)
*/



define([
    'intern/node_modules/dojo/node!fs'         // require('fs')
], function(fs) {

    var xtestsuites, xtestsuite, xtest;

    var errors, failures, tests, suitetests;

    var isFunctional;

    //try {

    return {

        '/runner/start': function() {
            console.log('runner start');
        },

        '/runner/end': function() {
            console.log('runner end');
        },



        '/session/start': function(remote) {
            console.log('  session ' + remote.environmentType + ' started');
            xtestsuites = {
                _name:     'testsuites',
                _children: []
            };
        },

        '/session/end': function(remote) {
            try {
                console.log('  session ' + remote.environmentType + ' ended');
                var env = remote.environmentType.toString().replace(/ /g, '_');
                var fn = 'report-' + env + '.json';
                console.log('writing report ' + fn + '...');
                fs.writeFileSync(fn, JSON.stringify(xtestsuites, null, '\t') );
            } catch (ex) {
                console.log(ex);
            }
        },



        '/suite/start': function(suite) {
            if (suitetests === 0) { // this kill faulty suites from frontend resources
                xtestsuites._children.pop();
            }

            //console.log('    suite ' + suite.name + ' started');
            isFunctional = suite.name.indexOf('(functional)') !== -1;
            var name = suite.name;
            if (isFunctional) {
                name = name.substring( 0,  name.length - 13 );
            }

            xtestsuite = {
                _name:     'testsuite',
                _children: [],
                name:      (isFunctional ? 'functional' : 'unit') + '.' + name

            };
            xtestsuites._children.push(xtestsuite);

            suitetests = 0;
        },

        '/suite/error': function(suite) {
            //console.log('    suite ' + suite.name + ' error');
        },

        '/suite/end': function(suite) {
            console.log('    suite ' + suite.name + ' ended');
        },



        '/test/start': function(test) {
            //console.log('      test ' + test.name + ' started');

            xtest = {
                _name:     'testcase',
                _children: [],
                name:      test.name
            };
            xtestsuite._children.push(xtest);

            tests      = 0;
            errors     = 0;
            failures   = 0;
            ++suitetests;
        },

        '/test/pass': function(test) {
            console.log('      test ' + test.name + ' passed');
            ++tests;
        },

        '/test/error': function(test) {
            console.log('      test ' + test.name + ' error');
            console.log(test.error.name + ': ' + test.error.message);
            ++tests;
            ++errors;

            xtest._children.push({
                _name:  'error',
                'type':  test.error.name,
                message: test.error.message
            });

            if (test.error.stack) {
                xtest._children.push({
                    _name:  'system-err',
                    _value: test.error.stack
                });
            }
        },

        '/test/fail': function(test) {
            console.log('      test ' + test.name + ' failed');
            console.log(test.error.name + ': ' + test.error.message);
            ++tests;
            ++failures;

            xtest._children.push({
                _name:  'failure',
                'type':  test.error.name,
                message: test.error.message
            });

            if (test.error.stack) {
                xtest._children.push({
                    _name:  'system-err',
                    _value: test.error.stack
                });
            }
        },

        '/test/end': function(test) {
            //console.log(test);
            //console.log('      test ' + test.name + ' ended');
            xtest.tests    = tests;
            xtest.failures = failures;
            xtest.errors   = errors;
            xtest.time     = test.timeElapsed;
        }

    };

    //} catch (ex) { console.log(ex); }
});
