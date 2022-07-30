const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const { log } = require("console");
const { loadavg } = require("os");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
    
});
app.post("/", function (req, res) {
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

   const data = {
      members:[
        {
           email_address:email,
           status:"subscribed",
           merge_fields:{
            FNAME: firstName,
            LNAME: lastName
           } 
        }
      ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us14.api.mailchimp.com/3.0/lists/62f53535b2";
 
   const Options = {
     method: "POST",
     auth: "Priyanshu:45a4d20ac6f5d529f175e6a293420eed-us14"
   }

    const request = https.request(url, Options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "failure.html");
        }

            response.on("data", function (data) {
                console.log(JSON.parse(data));
            })
         })

         request.write(jsonData);
         request.end();
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is Runnung on Port 3000 : ");
})


// API Key
// 45a4d20ac6f5d529f175e6a293420eed-us14

//List Id
// 62f53535b2