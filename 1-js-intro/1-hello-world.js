// Everything starts with an Hello world. In JS is pretty simple!
console.log("Hello world");

// In a browser the console is inside the developer tools panel (F12 to open on Chrome),
// in Node.js corresponds to the terminal.

// Create a new file and insert the 'console.log("Hello world")' command (without apexes).
// Run the file with "node file.js". It should print "Hello world".

// Ah, btw, these are comments!
// Everything after a double slash is a comment.
/* You can also write
   multiline comments
   with the combo slash plus asterisk (symmetric) */
// They are useful also to write inside the code, since you can end the comment whenever you want.
// For example this will have the same effect of the previous command.
console.log(/* I'm a comment */ "Hello world")

// Not only console.log: also error, warn, info and debug!
console.error("A very detailed description of the problem")  // please: always explain the problem properly, otherwise is useless

// formatting
console.log("The result is " + 5 + ".")  // strings concat with +
console.log(`The result is ${5}.`)       // cleaner formatting


// Now look to the first command wrt the others: the semicolon ; is optional in JS.
// IMO without semicolons is tidier, but for other people is cleaner with them.
// It's your choice, whatever you prefer.