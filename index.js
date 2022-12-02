const express = require("express")
const app = express()
const fs = require("fs")
const middleware = require("./middleware/server-operation")
const multer = require("multer")

// set up multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./files")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

// /upload
app.post("/upload", upload.single("file"), (req, res) => {
    res.redirect("/")
})

//send name of all files 
app.get("/files", middleware, (req, res) => {
    fs.readdir("./files", (err, files) => {
        if (err) {
            console.log(err)
            res.status(500).send("Error reading files")
        } else {
            res.send(files)
        }
    })
})

app.get("/status/:data", (req, res) => {
    let data = req.params.data
    if(data === "on" || data === "off") {
    fs.writeFile("./status.txt", data, (err) => {
        if (err) {
            console.log(err)
        }
    })
    }
    res.redirect("/")
}) 


app.use("/", middleware, express.static("files"))
app.use("/", middleware, express.static("html"))

app.listen(3000, () => {
    console.log("Server started on port 3000")
})