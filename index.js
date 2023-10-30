const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());



app.get('/', (req, res)=>{
  res.send('Hola servidor creado en express que tal');
});


app.get('/nueva-ruta', (req, res)=>{
  res.send('Hola soy nuevo endpoint en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);


app.listen(port, ()=>{
  console.log('si esta corriendo en el puerto '+ port);
});
