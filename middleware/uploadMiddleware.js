const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "imageupload");
    },
     // file name?
  filename: function (req, file, cb) {
    // file.fieldname=>hi 
    // uniquesuffix =dat.now
    // path.extname(file.originalname)
    // result hi888900.jpg
    // change name
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

  
  const upload = multer({ storage: storage });
  
  module.exports = { upload };

//   yo code chai multer ko website bata sareko ho 