import mongoose from "mongoose";

const MediaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    type: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    availableAdClips: {
        type: Number,
        required: true
    },
    starring: {
        type: [String],
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    noOfEpisodes: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    certification: {
        type: String,
        required: true
    },
    mediaLocation: {
        type: String,
        require: false,
    },
    createdAt: { 
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Media", MediaSchema);
