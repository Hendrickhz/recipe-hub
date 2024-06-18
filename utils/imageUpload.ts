import cloudinary from "@/config/cloudinary";

export const getSecureUrl= async(file:File,folderName:string)=>{
    if(file){
        const thumbnailBuffer = await file.arrayBuffer();
      const thumbnailArray = Array.from(new Uint8Array(thumbnailBuffer));
      const thumbnailData = Buffer.from(thumbnailArray);
      const thumbnailBase64 = thumbnailData.toString("base64");

      const thumbnailResult = cloudinary.uploader.upload(
        `data:image/png;base64,${thumbnailBase64}`,
        { folder: folderName }
      );
      const uploadedFile = await Promise.resolve(thumbnailResult);
       return uploadedFile.secure_url;
    }
}
