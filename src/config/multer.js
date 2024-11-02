import multer from 'multer';

// configuración de almacenamiento para multer
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {       
        cb(null, 'src/publico'); // ruta donde se guardaran las imagenes
    },
     filename: function (req, file, cb)  {
         cb(null, Date.now()+'-'+file.originalname);               
     }    
});

// filtro para permitir solo archivos .png, .jpg, y .jpeg
const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png/;
    const isAllowed = allowedExtensions.test(file.mimetype);

    if (isAllowed) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Solo formatos .png, .jpg, and .jpeg formatos son permitidos';        
        cb(null,false)
    }
};

const upload = multer({ storage, fileFilter });

export {upload}