const express = require('express');
const routerApi = require('./routes');
const app = express();

const port = 3000;

app.use(express.json());

app.get('/', (req, res)=>{
  res.send('Hola servidor creado en express');
});


app.get('/nueva-ruta', (req, res)=>{
  res.send('Hola soy nuevo endpoint en express');
});

routerApi(app);

app.listen(port, ()=>{
  console.log('si esta corriendo en el puerto '+ port);
});
