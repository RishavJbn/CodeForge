import { Router } from "express";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { code } = req.body;

    // generate unique filename
    const fileId = crypto.randomBytes(6).toString("hex");
    const fileName = `${fileId}.js`;

    // create path
    const filePath = path.join(process.cwd(), "temp", fileName);

    // write code to file
    fs.writeFileSync(filePath, code);

    console.log("File created at:", filePath);

    return res.json({
      success: true,
      output: "file created",
      error: null,
    }); 
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      output: "",
      error: "Server error",
    });
  }
});

export default router;
