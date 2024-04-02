import util from "util";
import ffmpeg from "fluent-ffmpeg";
import dotenv from "dotenv";
import aws from "aws-sdk"
import fs from "fs"
import Video from "../database/mongo_schema_video.js"
dotenv.config()

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY,
secretAccessKey: process.env.ACCESS_SECRET,
region: process.env.REGION
})

const S3 = new aws.S3()


// Function to create a video clip
export async function createVideoClip(
    sourcePath,
    outputPath,
    startTime,
    clipDuration,
    id
  ) {

    ffmpeg.setFfmpegPath("c:/Users/Aniket/Downloads/ffmpeg/ffmpeg-2024-02-01-git-94422871fc-full_build/bin/ffmpeg.exe");
    ffmpeg.setFfprobePath("c:/Users/Aniket/Downloads/ffmpeg/ffmpeg-2024-02-01-git-94422871fc-full_build/bin/ffprobe.exe");
    ffmpeg.setFfprobePath("c:/Users/Aniket/Downloads/ffmpeg/ffmpeg-2024-02-01-git-94422871fc-full_build/bin/ffplay.exe");
  
    // Create a promise to handle the conversion
    const conversionPromise = new Promise((resolve, reject) => {
      ffmpeg(sourcePath)
        .setStartTime(startTime) // Start time for the clip
        .setDuration(clipDuration) // Duration of the clip
        .output(outputPath) // Output file path
        .on("end", resolve) // Resolve the promise when the conversion is done
        .on("error", reject) // Reject the promise if there is an error
        .run();
    });
  
    // Await the conversion
    await conversionPromise;
  
    // Once the conversion is done, upload the clip to S3
    const data = await uploadClip(outputPath);

    const newVideo = new Video({
      name: outputPath,
      location : data,
      media: id
    })

    await newVideo.save()
    return data
  }
  
  async function uploadClip(outputPath) {
    const params = {
      Bucket: process.env.BUCKET,
      Key: outputPath, // Use outputPath as the S3 key
      Body: fs.createReadStream(outputPath),
      ContentType: "video/mp4" // Adjust content type accordingly
    };
  
    try {
      const data = await S3.upload(params).promise(); // Await the upload operation
      return data.Location
    } catch (err) {
      throw err; // Rethrow the error to be handled by the caller
    } finally {
      fs.unlinkSync(outputPath);
    }
  }

export async function getVideoDuration(videoPath) {
  ffmpeg.setFfmpegPath("c:/Users/Aniket/Downloads/ffmpeg/ffmpeg-2024-02-01-git-94422871fc-full_build/bin/ffmpeg.exe");
  ffmpeg.setFfprobePath("c:/Users/Aniket/Downloads/ffmpeg/ffmpeg-2024-02-01-git-94422871fc-full_build/bin/ffprobe.exe");
  const ffprobeAsync = util.promisify(ffmpeg.ffprobe);
  try {
    const metadata = await ffprobeAsync(videoPath);
    const durationInSeconds = metadata.format.duration;
    return durationInSeconds;
  } catch (err) {
    throw err; // Rethrow the error to be handled by the caller
  }
}
