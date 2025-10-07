import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    // For a simpler approach, you can create a static zip file and serve it
    // First, create the zip file manually and place it in the public folder
    
    // Alternative: Serve the chrome-extension folder as a zip
    const extensionPath = path.join(process.cwd(), "public", "apply-mate-extension.zip");
    
    // Check if the zip file exists
    try {
      await fs.access(extensionPath);
    } catch {
      // If zip doesn't exist, return instructions to create it manually
      return NextResponse.json({
        message: "Extension zip not found. Please create apply-mate-extension.zip in the public folder.",
        instructions: [
          "1. Zip the chrome-extension folder",
          "2. Rename it to 'apply-mate-extension.zip'",
          "3. Place it in the public folder"
        ]
      }, { status: 404 });
    }
    
    // Read and serve the zip file
    const zipBuffer = await fs.readFile(extensionPath);
    
    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=apply-mate-extension.zip",
        "Content-Length": zipBuffer.length.toString(),
      },
    });
    
  } catch (error) {
    console.error("Error serving extension zip:", error);
    return NextResponse.json(
      { error: "Failed to serve extension download" },
      { status: 500 }
    );
  }
}
