const express = require('express')

const user = {
    name: "Temir",
    login: 'ttemirlan2',
    password: 'root'
}

const app = express()

const getUser = app.get('/', (req, res)=> {
    res.send(user)
    next();
})

module.exports = getUser;