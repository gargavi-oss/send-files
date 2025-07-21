import { nanoid } from "nanoid";
import { File } from "../models/file.model.js";

async function generateUniqueCode() {
  let code;
  let exists = true;

  while (exists) {
    code = nanoid(6);
    const existing = await File.findOne({ code });
    if (!existing) exists = false;
  }

  return code;
}
export default generateUniqueCode