// const { spawn } = require("child_process");

// const process = spawn('python', ['./python_scripts/index.py','D:/web_dev/stegApp/python_scripts/bird.jpg', 'D:/web_dev/stegApp/python_scripts/building.jpg']);

// process.stdout.on('data', function(data) {
//     console.log(`stdout ${data}`);
// });

// process.stderr.on('data', (data)=>{
//     console.log(`stdout ${data}`);
// });

// process.on('close', (code)=>{
//     console.log(`child process exited with code ${code}`);
// });

let keyFileName = 'D:/web_dev/stegApp/public'+'/'+'61570be8e389fe0eb7ffaafe'+'/'+Date.now()+'/key_file';
console.log(keyFileName);