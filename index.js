const express = require('express');
const nodemailer = require("nodemailer");
const cors = require("cors")
const bodyParser = require("body-parser")
require('dotenv').config()


const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.STMP_EMAIL, // generated ethereal user
        pass:process.env.STPM_PASSWORD, // generated ethereal password
    },
});

app.get('/', function (req, res) {
    res.send('hello world');
});

app.post('/sendMessage', async function (req, res) {
    let {message, email, name} = req.body

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'HR WANTS ME', // sender address
        to: "ekaterina.vodich@gmail.com", // list of receivers
        subject: 'HR WANTS ME', // Subject line
        html: `<b>Сообщение с вашего портфолио</b>
<div>
name:${name}
</div>
<div>
email:${email}
</div>
        <div>
            ${message}
            </div>`

    })
    res.send('ok')
})

const port=process.env.PORT || 3000

app.listen(port, function () {
    console.log('Example app listening on port 3000!')
})