import { File } from "../models/file.model.js";
import QRCode from "qrcode";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import generateUniqueCode from "../utils/uniqueCode.js";


const EXPIRY_DURATION = 5 * 60 * 1000;
const getFile = asyncHandler(async (req, res) => {
    const uploadedFile = req.file; 
    const expiresAt = new Date(Date.now() + EXPIRY_DURATION);
    if (!uploadedFile) {
        throw new ApiError(400, "File is required");
    }

    const relativePath = `/temp/${uploadedFile.filename}`; 
    const fileUrl = `${req.protocol}://${req.get("host")}${relativePath}`; 
    const code = await generateUniqueCode()
    const file = await File.create({
        file: fileUrl,
        name: uploadedFile.originalname,
        code: code,
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString()
    });

    const downloadLink = `${req.protocol}://${req.get("host")}/api/v1/file/download/id/${file._id}`;
    console.log("Download Link:", downloadLink);
    const qrCode = await QRCode.toDataURL(downloadLink)
    


    return res.status(201).json(
        new ApiResponse(200, {file,qrCode, downloadUrl: downloadLink,   uniqueCode: code, expiresAt }, "File uploaded successfully")
    );
});
const getCode = asyncHandler(async (req, res) => {
    try {
      const { code } = req.body;
  
      console.log("Received code:", code); 
  
      if (!code) {
        console.log("No code provided");
        throw new ApiError(400, "Code is required");
      }
  
      const fileDoc = await File.findOne({ code });
  
      if (!fileDoc) {
        console.log("Code not found in DB");
        throw new ApiError(404, "Invalid code");
      }
  
    
      if (new Date(fileDoc.expiresAt) < new Date()) {
        console.log("Code expired");
        throw new ApiError(410, "Code expired");
      }
  
      console.log("File found:", fileDoc);
  
      return res.status(200).json({
        success: true,
        message: "Code verified successfully",
        data: {
          uniqueCode: code,
          id: fileDoc._id,
          name: fileDoc.name,
          expiresAt: fileDoc.expiresAt,
          file: fileDoc.file,
          downloadUrl: `${req.protocol}://${req.get("host")}/api/v1/file/download/code/${code}`
        }
      });
  
    } catch (error) {
      console.error("Server error in getCode:", error); // 🔥 See the real problem
      throw new ApiError(500, "Something went wrong while verifying the code");
    }
  });
  
export { getFile,getCode };
