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
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });

      // Create package.json in temp directory to support ES6 modules
      const packageJsonPath = path.join(tempDir, "package.json");
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify({ type: "module" }, null, 2),
      );
    }
    const filePath = path.join(tempDir, fileName);

    // write code to file
    fs.writeFileSync(filePath, code);

    // execute the file
    exec(`node "${filePath}"`, (error, stdout, stderr) => {
      // delete temp file (very important)
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (cleanupErr) {
        console.error("Failed to delete temp file:", cleanupErr);
      }

      // Return structured response
      return res.json({
        success: !error && !stderr, // true if execution completed successfully
        output: stdout || "",
        error: stderr ? stderr : error ? error.message : null,
      });
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
