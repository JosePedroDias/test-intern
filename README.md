Taking the intern for a little test drive...


# ROADMAP

## Objectives accomplished:

* unit testing (both in node, local browser and remote webdriver)
* functional testing (in remote webdriver)
* working with browser AMD modules
* working with browser js files no-AMD
* skip instrumentation (not useful for now)


## Ongoing work:

* writing a custom reporter that outputs JUnit XML compliant to JenkinsCI
    * would be nice to count assertions. mostly done otherwise.
* configure jenkins so it parses each xml file as a differene env?
* continue the functional test sample (far from perfect)


## Yet to tackle:

* perform async test in both unit test and functional tests
* try the geezer version and see if its any worse


I'm [writing a tutorial](https://github.com/JosePedroDias/test-intern/edit/master/README.md) about this too.



# REFERENCE STUFF

configuring intern:
https://github.com/theintern/intern/wiki/Configuring-Intern

running tests:
https://github.com/theintern/intern/wiki/Running-Tests

writing tests:
https://github.com/theintern/intern/wiki/Writing-Tests

    object example:
    https://github.com/theintern/intern/wiki/Writing-Tests#object

    chai api:
    http://chaijs.com/api/

    -- // --

    functional example:
    https://github.com/theintern/intern/wiki/Writing-Tests#functional

    functional testing:
    https://github.com/theintern/intern/wiki/Writing-Tests#functional-testing

    webdriver api:
    https://github.com/admc/wd#supported-methods

using and writing reporters:
https://github.com/theintern/intern/wiki/Using-and-Writing-Reporters

using intern to unit test ajax calls:
https://github.com/theintern/intern/wiki/Using-Intern-to-unit-test-Ajax-calls

intern examples:
https://github.com/theintern/intern-examples
