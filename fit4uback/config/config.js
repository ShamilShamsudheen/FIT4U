// const multer = require('multer')
// const path = require('path');

// //trainer cv upload storage
// const storageResume = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null,path.join(__dirname,'../public/trainer/resume'))
//     },
//     filename: function (req, file, cb) {
//       const resume = Date.now() + '-' +file.originalname;
//       cb(null,resume)
//     }
// })
// //trainer qualification upload storage
// const storageQualification = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null,path.join(__dirname,'../public/trainer/qualification'))
//     },
//     filename: function (req, file, cb) {
//       const qualification = Date.now() + '-' +file.originalname;
//       cb(null,qualification)
//     }
// })
// module.exports = {
//        uploadResume : multer({ storage: storageResume }),
//        uploadQualification : multer({storage: storageQualification})
// }