const express = require('express')
const { Router } = express;

const productos = [

];

let _id = 0;

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send(productos)
})

router.get('/:_id', (req, res) => {
  const product = productos.find(prod => { prod._id == req.params._id });
  if (!product) {
    res.status(404).send({error: 'producto no encontrado'});
    return
  }

  res.send(product)
})

router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body;

    productos.push({
        _id,
        title,
        price,
        thumbnail
    })

    res.sendStatus(201) // created
    _id++;
})

router.put('/:id', (req, res, next) => {
    const { id } = req.params
    const product = productos.find(prod => prod.id == req.params.id);
    if (!product) {
      res.status(404).send({error: 'producto no encontrado'});
      return
    }
  
    next()
  }, (req, res) => {

    const { title } = req.body
  
    product.title = title;
    res.sendStatus(200)
  })
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params
  
    const product = productos.find(prod => prod.id == req.params.id);
    if (!product) {
      res.status(404).send({error: 'producto no encontrado'});
      return
    }
  
    const index = productos.indexOf(product)
    productos.splice(index, 1)
  
    res.sendStatus(200)
  })
  
  module.exports = router