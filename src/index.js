import './config'
//importando las configuraciones de nuestra app
import app from './app';
//importando el archivo deconfiguracion de la base de datos
import './database'
//ejecutando nuestro servidor

import {PORT} from './config'


app.listen(PORT);
console.log('server on port',PORT);