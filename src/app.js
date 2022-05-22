//importando express
import express from 'express';
//importando el archivo con las rutas
import IndexRoutes from './Routes/index.routes'
//creacion de la aplicacion a traves de express
import path from 'path'
import morgan from 'morgan';
import multer from 'multer';


//iniciando la app con express
const app = express();

//configurando el motor de html que usara
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use(express.urlencoded({extended: false}));

const storage =  multer.diskStorage({
    destination:path.join(__dirname, 'public/upload/pdf'),             
    filename:(req, file, cb, filename) => {
    cb(null,file.originalname )
 }
});


app.use(multer({
    storage:storage
}).single('pdf'))

//declarar las rutas que tendra la aplicacion
app.use(IndexRoutes)

export default app;