var stdin = process.stdin;
var stdout = process.stdout;
var fs = require('fs');

commands = {
    ls: function(stdin, file, done) {
        var output = "";
        fs.readdir('.', function(err, files) {
            files.forEach(function(file) {
                output += file.toString() + "\n";
            })
            done(output);
        });
    },
    date: function(stdin, file, done) {
        var output = new Date() + "\n";
        done(output);
    },
    head: function(stdin, file, done) {
        function head(inStr) { 
            // console.log("h", inStr);
            return inStr.split(/\n/).slice(0, 5).join("\n");
        }
        if(file) {
            fs.readFile(file, function(err, fileContents) {
                var output = head(fileContents.toString());
                done(output);
            });            
        } else if(stdin) {
            done(head(stdin));
        }
    }, 
    tail: function(stdin, file, done) {
        fs.readFile(file, function(err, fileContents) {
            var output = fileContents.toString().split(/\n/).slice(-6, -1).join("\n");
            done(output);
        });
    },
    wc: function(stdin, file, done) {
        function wc(string) {
            return string.split("\n").length.toString();
        }
        if(file) {
            fs.readFile(file, function(err, fc) { 
                var out = wc(fc.toString());
                done(out); 
            });
        } else if(stdin) {
            done(wc(stdin));
        }
    },
    cat: function(stdin, file, done) {
        fs.readFile(file, function(err, fc) {
            var output = fc.toString();
            done(output);
        });
    },
    find: function(stdin, file, done) {

    }
}