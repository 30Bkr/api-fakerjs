const express = require('express');
const cors = require('cors')
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) =>{
    if(whiteList.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors());



app.get('/api', (req, res)=>{
  res.send('Hola servidor creado en express que tal');
});


app.get('/api/nueva-ruta', (req, res)=>{
  res.send('Hola soy nuevo endpoint en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, ()=>{
  console.log('si esta corriendo en el puerto '+ port);
});
