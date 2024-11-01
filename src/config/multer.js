import multer from 'multer';

// configuración de almacenamiento para multer
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {       
        cb(null, 'src/publico'); // ruta donde se guardaran las imagenes
    },
     filename: function (req, file, cb)  {
         cb(null, Date.now()+'-'+file.originalname);               
     }
    
})

export {storage}