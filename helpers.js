const fs = require("fs");

const getProducts = () => {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    return products
}

const getProduct = (id) => {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    let product = products.reduce((x, y) => x.id === +id ? x : y)
    if (product.id === +id) return product
}

const createProduct = (data) => {
    if (data.title && data.price){
        let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
        id = products[products.length-1].id + 1
        products.push({"id":id, "title":data.title, "price":+data.price})
        fs.writeFileSync('products.json', JSON.stringify(products), 'utf-8')
        return true
    }
}

const updatePartProduct = (id, data) => {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    let product = products.reduce((x, y) => x.id === +id ? x : y)
    if (product.id === +id) {
        product.title = data.title ? data.title : product.title
        product.price = data.price ? +data.price : product.price
        fs.writeFileSync('products.json', JSON.stringify(products), 'utf-8')
        return true
    }
}

const updateProduct = (id, data) => {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    let product = products.reduce((x, y) => x.id === +id ? x : y)
    if (product.id === +id) {
        product.title = data.title ? data.title : product.title
        product.price = data.price ? +data.price : product.price
        fs.writeFileSync('products.json', JSON.stringify(products), 'utf-8')
    } else {
        createProduct(data)
    }
}

const deleteProduct = (id) => {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    let products2 = products.filter((product) => {
        return product.id !== +id
    })
    if (products.length !== products2.length){
        fs.writeFileSync('products.json', JSON.stringify(products2), 'utf-8')
        return true
    }
}


module.exports = { getProducts, getProduct, createProduct, updateProduct, updatePartProduct, deleteProduct }