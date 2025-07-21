import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.resolve("public/temp");
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir); // Save files here
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    },
});

export const upload = multer({
    storage: storage,
    limits: {
       fileSize: 15 * 1024 * 1024  
    }
});
