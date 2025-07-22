import { Router } from "express";
import { getCode, getFile } from "../controllers/file.controller.js";
import { upload } from "../middlewares/upload.middleware.js"
import { File } from "../models/file.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
import path from "path";
import { ApiError } from "../utils/ApiError.js";
import { sendEmail } from "../controllers/email.controller.js";

const router = Router();

router.post("/upload", upload.single("file"), getFile);
router.post("/send-email", sendEmail);
router.post("/check", getCode)

router.get("/download/id/:id", asyncHandler(async (req, res) => {
  const fileDoc = await File.findById(req.params.id);
  if (!fileDoc) throw new ApiError(404, "File not found");

  const fileUrl = fileDoc.file;
  const filename = fileUrl.split("/").pop();
  const filePath = path.resolve("public", "temp", filename);

  if (!fs.existsSync(filePath)) throw new ApiError(404, "File missing");

  res.download(filePath, fileDoc.name || filename);
}));

router.get("/download/code/:code", asyncHandler(async (req, res) => {
  const fileDoc = await File.findOne({ code: req.params.code });

  if (!fileDoc) throw new ApiError(404, "File not found");

  const filename = fileDoc.file.split("/").pop();
  const filePath = path.resolve("public", "temp", filename);

  if (!fs.existsSync(filePath)) {
    throw new ApiError(404, "File not found on disk");
  }

  res.download(filePath, fileDoc.name || filename);
}));
router.get("/meta/:id", asyncHandler(async (req, res) => {
  const fileDoc = await File.findById(req.params.id).select("expiresAt");

  if (!fileDoc) throw new ApiError(404, "File not found");

  res.status(200).json({ expiresAt: fileDoc.expiresAt });
}));

 export default router