stdout.write("prompt > ");

stdin.on('data', function(d) {
    var cmdString = d.toString().trim();

    // GIVE "cat bash1.js | head > out".split(/(\||\>)/g)
    var cmdList = cmdString.split(/\|/g)
    var lastStdout = undefined;

    function done(output) {
        if(cmdList.length == 0) {       
            console.log("FINAL: ", output); 
            stdout.write(output+"\n");
        } else { 
            lastStdout = output;
            var nextCmd = cmdList.shift();
            runner(nextCmd);
        }
        stdout.write("prompt > ");
    }

    function runner(cmdString) {
        var cmdStringArr = cmdString.split(/\s+/);
        var cmd = cmdStringArr[0];
        var cmdfile = cmdStringArr[1];

        if(commands[cmd]) { 
            commands[cmd](lastStdout, cmdfile, done);
        } else {
            stdout.write("Unrecognized command: " + cmd + " in command: " + cmdString);
            stdout.write("prompt > ");
        }
    }

    runner(cmdList.shift());


});