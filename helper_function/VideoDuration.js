import ffmpeg from "fluent-ffmpeg";
import util from "util";

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


  async function a(){
    const path="C:\\Users\\Admin\\Desktop\\TruAd\\backend\\TruAD_backend\\uploads\\blendFiles\\1713852780655-production_id_3830513 (1080p).mp4"
    const time = await getVideoDuration();
    console.log("time",time)
  }

  a();