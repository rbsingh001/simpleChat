const { isUtf8 } = require("buffer");
const express = require("express");
const fs = require('fs');

const router = express.Router();

router.get('/login', (req, res, next)=>{
    
    res.send(`
    <form action="/" onsubmit="localStorage.setItem('username', document.getElementById('username').value)" method="GET">
        <input type="text" name="username" id="username">
        <button type="submit">login</button>
    </form>`)

})

router.get('/', (req, res, next)=>{
    
    const file_con = readFile();

    res.send(`
        <form action="/" onsubmit="document.getElementById('username').value = localStorage.getItem('username')" method="POST">
            <input type="text" name="message" id="message" placeHolder="message">
            <input type="hidden" name="username" id="username">
            <button type="submit">Send</button>
        </form>
        <p id = "msg"> </p>
        <script>
            document.getElementById("msg").innerText = '${file_con}';
        </script>
    `)
})

router.post('/', (req, res, next) => {
    const username = req.body.username;
    const message = req.body.message;
    const msg = ` ${username} : ${message} `;

    console.log(username , message);

    fs.appendFileSync('\message.txt', msg);

    res.redirect('/');

})


function readFile(){
    try{
        var file_content = fs.readFileSync('\message.txt', "utf8");
        return file_content;
    }
    catch (error) {
        console.error("Error reading file:", error.message);
        return "Error reading file";
    }

}

module.exports = router;