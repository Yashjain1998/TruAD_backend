import path, { dirname } from "path";
import fs from "fs"
import { createVideoClip, getVideoDuration } from "./clip.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default async function VideoClip(req, res) {
  const outPutPath="G:/TruAd Internship/backendAuth/TruAD_backend/video"
  // const finalOutputPath=outPutPath.replace(/\\/g, "/");
  const clipDuration=Number(req.body.clipsDur)
  const file =  req.files.video;

  const uploadPath = path.join(__dirname, "../video", file.name);
  
   file.mv("video/" + file.name, (err) => {
    if (err) return res.json(err);
    console.log("file upload successfully!");
  });
  
  // const outputPath = path.join(__dirname, "../output", file.name);
  // C:\Users\qayyu\OneDrive\Desktop\New folder


  const outputPath = path.join(outPutPath, file.name);



  const locations = await makeclip(uploadPath, outputPath, clipDuration);
  fs.unlinkSync(outputPath);
  res.status(200).json({locations : locations})
}

async function makeclip(sourcePath, outputPath, clipDuration) {

  const videoduration = await getVideoDuration(sourcePath);
  const outputDir = path.dirname(outputPath); // Get the directory of the sourcePath
  const originalFileName = path.basename(sourcePath, path.extname(outputPath)); // Get the file name without extension
  const fileExtension = path.extname(outputPath);
  let j = 1;
  const locations = []
  for (let i = 0; i < videoduration; i = i + clipDuration) {
    const newOutputPath =  path.join(
      outputDir,
      `${originalFileName}-${j}${fileExtension}`
    );
    const startTime = await secondsToTime(i);
    const location = await createVideoClip(sourcePath, newOutputPath, startTime, clipDuration);
    locations.push(location)
    j++;
  }

  return locations
}

async function secondsToTime(secs) {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs - hours * 3600) / 60);
  const seconds = secs - hours * 3600 - minutes * 60;

  let time = "";

  // Add leading zero if necessary and format the time string
  time += hours < 10 ? "0" + hours : hours;
  time += ":" + (minutes < 10 ? "0" + minutes : minutes);
  time += ":" + (seconds < 10 ? "0" + seconds : seconds);

  return time;
}
