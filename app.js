const express = require('express')
const redis = require('redis')
const util = require('util')

const url = 'redis://127.0.0.1:6379'
const client = redis.createClient(url)
const app = express()

client.set = util.promisify(client.set)
client.on('connect', ()=> {
    console.log('connected to Redis')
})

client.on('ready', ()=> {
    console.log('Redis ready')
})
app.use(express.json())


app.post('/books', async(req, res)=> {
    const {key, value} = req.body
    console.log(value)
    const response = await client.set(key, value);
    res.json(response);
})

app.get('/books/:key', async(req, res)=>{
    const key = req.params;
    const data = await client.get(key)
    res.json({key, value: data})
})

app.listen(3000, ()=> {
    console.log('running on port 3000');
})

