const multer = require("multer");
const path = require("path");

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/uploads/"); // Dossier de stockage des fichiers
  },
  filename: function (req, file, cb) {
    // Générer un nom unique avec la date et l'extension du fichier
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filtrer les types de fichiers acceptés (ici les images)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!"); // Gérer les erreurs de type de fichier
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limiter la taille des fichiers à 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
