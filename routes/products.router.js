const express = require('express');
const ProductService = require('./../services/product.service')

const router = express.Router();
const service = new ProductService();

router.get('/', (req, res)=>{
  const products = service.find()
  res.json(products);
});
//Todo lo que sea especifico (rutas) debe ir antes de lo que es dinamico
//por ejemplo, el products/filter, debe ir primero que products/:id

router.get('/filter', (req,res)=>{
  res.send('Yo soy un filter');
});

router.get('/:id',(req, res)=>{
  //se coloca es el nombre que coloque en el identificador. como esta vez colocamos el 'id' se desestructura { id }
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});

router.post('/', (req,res)=>{
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req,res)=>{
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

router.delete('/:id', (req,res)=>{
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});

module.exports = router;
