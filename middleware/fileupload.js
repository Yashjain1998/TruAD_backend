import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__dirname)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = __dirname;
    switch (file.fieldname) {
      case "blendFiles":
        dir = path.join(__dirname, `../uploads/blendFiles/`);
        break;
      case "viewImage":
        dir = path.join(__dirname, "../uploads/raiseticket-image/");
        break;
      default:
        dir = path.join(__dirname, "../uploads/other/"); // default directory
        break;
    }
    fs.access(dir, fs.constants.F_OK, (err) => {
      if (err) {
        // Directory does not exist, so create it
        return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir));
      }
      // Directory exists, proceed to save the file
      // console.log(dir)
      let filePath = path.join(dir, `${Date.now()}-${file.originalname}`);
      req.file = filePath
        .split("")
        .map((el) => {
          if (el.charCodeAt(0) === 92) {
            return "/";
          } else {
            return el;
          }
        })
        .join("");
      cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    // Use the original file name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const uploadfile = upload.any()
//  upload.fields([
//   { name: "blendFiles", maxCount: 1 },
//   { name: "raiseticketimg", maxCount: 1 },
// ]);

export default uploadfile;
