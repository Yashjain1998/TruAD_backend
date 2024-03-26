import express from "express"
import bodyParser from "body-parser"
import Login from './controller/login.js';
import Confirm from "./controller/confirm.js";
import Register from './controller/register.js';
import mongodb from './database/mongo.js'
import cors from "cors"
import fileUpload from 'express-fileupload';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";
import Video from "./database/mongo_schema_video.js"
import ivideoClip from './controller/ivideoclip.js';
import Media from "./database/mongo_schema_media.js"
import mongoose from 'mongoose';
import VideoClip from "./controller/videoclip.js";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)

const ObjectId = mongoose.Types.ObjectId;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
mongodb();

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/video/'
    })
)

app.get("/", (req, res) => {
    res.send("Hello From Server")
})

app.post('/api/register', Register);

app.post('/api/login', Login);

app.get('/api/confirm', Confirm);

app.post('/api/videoclip', VideoClip);

app.post("/add-media", async(req, res) => {
    const data = JSON.parse(req.body.data);
    const file = req.files.video
    const clipDuration=Number(req.body.clipsDur)

    // console.log(data);

    
    const newMedia = new Media({
        name: data.Name,
        type: data.Type,
        poster: data.poster,
        duration: data.Duration,
        availableAdClips: data["Available Ad Clips"],
        starring: data.Starring,
        releaseDate: data["Release Date"],
        noOfEpisodes: data["No of Episodes"],
        season: data.Season,
        category: data.Category,
        certification: data.Certification,
        mediaLocation: ""
    });

    const saveData = await newMedia.save()
    
    const vidData = await ivideoClip(file, clipDuration, saveData.id)
    
    // const existingMedia = await Media.findOne({_id: saveData.id})

    const locations = await Video.find({media : saveData.id})

    console.log("locations :", locations)

    const id = new ObjectId(saveData.id)

    const updated = await Media.findOneAndUpdate(
        { _id: id },
        { mediaLocation: vidData.mediaLocation,
          availableAdClips: locations.length
        }
    );


    res.status(200).json({location : vidData.locations, saveData: updated})
})

app.get('/video',(req,res)=>{
    const videoPath = path.join(__dirname, 'video', 'net.mp4');
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;

        const chunksize = (end-start)+1;
        const file = fs.createReadStream(videoPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
})

app.get("/get-video", async(req, res) => {
    const data = await Video.find()
    res.status(200).json({data})
})

app.get("/media", async (req, res) => {
    const data = await  Media.find().sort({ createdAt: -1 });

    res.status(200).json({data})
})

app.post("/get-clips", async (req, res) => {
    const id = req.body.id;
    const locations = await Video.find({media : id})

    res.status(200).json({locations})
})


export default app;

