const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema,updateProductSchema, getProductSchema } = require('../schemas/product.schema')

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res)=>{
  const products = await service.find()
  res.json(products);
});
//Todo lo que sea especifico (rutas) debe ir antes de lo que es dinamico
//por ejemplo, el products/filter, debe ir primero que products/:id

router.get('/filter', (req,res)=>{
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next)=>{
  //se coloca es el nombre que coloque en el identificador. como esta vez colocamos el 'id' se desestructura { id }
  try{
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  }catch(error){
    next(error);
  }

});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req,res)=>{
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct)
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),

  async(req,res, next)=>{
  try{
  const { id } = req.params;
  const body = req.body;
  const product = await service.update(id, body);
  res.json(product);
  } catch(error){
    next(error)
  }
});

router.delete('/:id', async (req,res)=>{
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
