// middleware, read status.txt, if value is on, continue, else redirect to AUMS
const fs = require("fs")

const serverStatus = (req, res, next) => {
    fs.readFile("./status.txt", (err, data) => {
        if (err) {
            console.log(err)
            // on error, create file and write on to uit
            // create file
            fs.open("./status.txt", "w", (err, fd) => {
                if (err) {
                    console.log(err)
                    res.status(500).send("Error creating status file")
                } else {
                    // write on to file
                    fs.writeFile("./status.txt", "on", (err) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send("Error writing status")
                        }
                    })
                }
            })
        } else {
            if (data.toString() === "on") {
                next()
            } else {
                res.redirect("https://intranet.cb.amrita.edu/")
            }
        }
    })
}

module.exports = serverStatus
