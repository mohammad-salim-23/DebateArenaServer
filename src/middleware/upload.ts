import multer from "multer";
import path from "path";
import os from "os";
// Storage configuration
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {

  //   cb(null, "uploads/debates/"); // or your desired folder
  // },
  destination: (req, file, cb) => {
    const tempDir = os.tmpdir();  
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

export const upload = multer({ storage, fileFilter });
