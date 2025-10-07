import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import JSZip from "jszip";

export async function GET() {
  try {
    // Path to the chrome extension directory
    const extensionPath = path.join(process.cwd(), "chrome-extension");
    
    // Create a new zip instance
    const zip = new JSZip();
    
    // Read all files from the extension directory
    const files = await fs.readdir(extensionPath, { withFileTypes: true });
    
    // Add files to zip
    for (const file of files) {
      const filePath = path.join(extensionPath, file.name);
      
      if (file.isDirectory()) {
        // Handle subdirectories recursively
        const subFiles = await fs.readdir(filePath, { withFileTypes: true });
        for (const subFile of subFiles) {
          const subFilePath = path.join(filePath, subFile.name);
          const relativePath = path.relative(extensionPath, subFilePath);
          
          if (!subFile.isDirectory()) {
            const fileContent = await fs.readFile(subFilePath);
            zip.file(relativePath, fileContent);
          }
        }
      } else {
        // Add regular files
        const fileContent = await fs.readFile(filePath);
        zip.file(file.name, fileContent);
      }
    }
    
    // Generate the zip file
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
    
    // Return the zip file
    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=apply-mate-extension.zip",
        "Content-Length": zipBuffer.length.toString(),
      },
    });
    
  } catch (error) {
    console.error("Error creating extension zip:", error);
    return NextResponse.json(
      { error: "Failed to create extension download" },
      { status: 500 }
    );
  }
}
