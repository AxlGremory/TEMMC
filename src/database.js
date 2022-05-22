import { connect} from 'mongoose'

import  {MONGODB_URI} from './config.js'

( async () => {

    try {
        const db = await connect(MONGODB_URI)
        console.log('DB connected to', db.connection.name)
        } catch(error){
            console.log(error)
        }
})();

//EN LA url cambia el localhost por 127.0.0.1/"escribe aqui tu base de datos"