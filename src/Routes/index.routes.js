//importando el metodo Router para declarar las rutas
import {Router} from 'express'
import Equipo from '../models/equipo'
import Bitacora from '../models/bitacora'
import path from 'path'
import fs from 'fs';

//declarando y usando el metodo router
const router = Router()

//mostrar lista general
router.get('/', async (req,res) => {
    const equipos = await Equipo.find();
    res.render('index',{equipos:equipos});
});
//mostrar lista de completados
router.get('/Completado', async (req,res) => {
    const equipos = await Equipo.find({STATUS: true});
    res.render('index',{equipos:equipos});
});
// mostrar lista de pendientes
router.get('/Pendientes', async (req,res) => {
    const equipos = await Equipo.find({STATUS: false});
    res.render('index',{equipos: equipos});
});

///////////////////////despliega informacion de los activos/////////////////
router.get('/Informacion/:id', async (req, res) => {
    const {id} = req.params;
    const equip = await Equipo.findById(id);
    console.log(equip);
    const Bita = await Bitacora.find({id:id});
    res.render('Informacion',{equip,Bita});
   
  });

  //subir orden de servicio firmada por el ingeniero

  router.post('/subir/:id', async (req,res) =>{
      const {id} = req.params;
      const equip = await Equipo.findById(id);
      equip.STATUS = true;
      const Bita = new Bitacora();
      Bita.id = id;
      Bita.path = 'public/upload/pdf/' + req.file.filename
      Bita.name = req.file.filename;
      await equip.save();
      await Bita.save();
      res.redirect('/Informacion/'+id)
      
  })

  //despliega la orden de servicio en la pantalla
  router.get('/pdf/:_id', async (req,res) =>{
      const {_id} = req.params
      let Bit = await Bitacora.findById({_id})
      let pa = path.join(__dirname,'../' + Bit.path)
      console.log(pa)
      var data = fs.readFileSync(pa)
      res.contentType('application/pdf');
      res.send(data);
  })

  router.get('/Calendario', async (req,res) =>{
    const ENERO = await Equipo.find({MES: "ENERO", STATUS: false});
    const FEBRERO = await Equipo.find({MES: "FEBRERO", STATUS: false});
    const MARZO = await Equipo.find({MES: "MARZO", STATUS: false});
    const ABRIL = await Equipo.find({MES: "ABRIL", STATUS: false});
    const MAYO = await Equipo.find({MES: "MAYO", STATUS: false});
    const JUNIO = await Equipo.find({MES: "JUNIO", STATUS: false});
    const JULIO = await Equipo.find({MES: "JULIO", STATUS: false});
    const AGOSTO = await Equipo.find({MES: "AGOSTO", STATUS: false});
    const SEPTIEMBRE = await Equipo.find({MES: "SEPTIEMBRE", STATUS: false});
    const OCTUBRE = await Equipo.find({MES: "OCTUBRE", STATUS: false});
    const NOVIEMBRE = await Equipo.find({MES: "NOVIEMBRE", STATUS: false});
    const DICIEMBRE = await Equipo.find({MES: "DICIEMBRE", STATUS: false});
    
    res.render('calendario',{ENERO,FEBRERO,MARZO,ABRIL,MAYO,JUNIO,JULIO,AGOSTO,SEPTIEMBRE,OCTUBRE,NOVIEMBRE,DICIEMBRE});
  })

//exportando las rutas declaradas en la parte de arriba
export default router