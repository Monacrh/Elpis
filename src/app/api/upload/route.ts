import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded." }, { status: 400 });
    }

    // Validasi file
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
      }
      
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
      }
    }

    const uploadResults = await Promise.all(
      files.map(async (file) => {
        try {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { 
                resource_type: 'auto',
                folder: 'food-task-app' // Optional: organize files in folder
              }, 
              (error, result) => {
                if (error) {
                  reject(error);
                }
                resolve(result);
              }
            ).end(buffer);
          });

          return uploadResult as { secure_url: string };
        } catch (error) {
          console.error('Error uploading single file:', error);
          throw error;
        }
      })
    );

    const urls = uploadResults.map(result => result.secure_url);

    return NextResponse.json({ 
      success: true,
      urls,
      message: `${files.length} files uploaded successfully` 
    });

  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json({ 
      error: "Upload failed",
    }, { status: 500 });
  }
}