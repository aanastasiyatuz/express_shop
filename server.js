const express = require("express");
const { getProducts, getProduct, createProduct, deleteProduct, updateProduct, updatePartProduct } = require("./helpers");

const app = express();

app.get('/products', (req, res) => {
    res.send(JSON.stringify(getProducts()))
})

app.get('/products/:id', (req, res) => {
    let id = req.params.id
    res.send(JSON.stringify(getProduct(id)))
})

app.post('/products', (req, res) => {
    let data = ""
    req.on("data", (chunck) => data += chunck)
    req.on("end", () => {
        if (createProduct(JSON.parse(data))) {
            res.send("successfully created")
        } else {
            res.send("title and price are required")
        }        
    })
})

app.patch('/products/:id', (req, res) => {
    let id = req.params.id
    let data = ""
    req.on("data", (chunck) => data += chunck)
    req.on("end", () => {
        if (updatePartProduct(id, JSON.parse(data))) {
            res.send("successfully updated")
        } else {
            res.send("404 not found")
        }
    })
})

app.put('/products/:id', (req, res) => {
    let id = req.params.id
    let data = ""
    req.on("data", (chunck) => data += chunck)
    req.on("end", () => {
        updateProduct(id, JSON.parse(data))
        res.send("successfully updated")
    })
})

app.delete('/products/:id', (req, res) => {
    let id = req.params.id
    if (deleteProduct(id)) {
        res.send("seccessfully deleted")
    } else {
        res.send("404 not found")
    }
})

app.listen(5000, () => {
    console.log("Running on 5000")
})