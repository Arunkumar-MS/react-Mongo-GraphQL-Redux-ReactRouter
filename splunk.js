import splunkjs from 'splunk-sdk';

const service = new splunkjs.Service({username: "Arunkumar3287", password: "arun@321MS"});
service.login(function(err, success) {
    if (err) {
        throw err;
    }

    console.log("Login was successful: " + success);
    service.jobs().fetch(function(err, jobs) {
        var jobList = jobs.list();
        for(var i = 0; i < jobList.length; i++) {
            console.log("Job " + i + ": " + jobList[i].sid);
        }
    });
});