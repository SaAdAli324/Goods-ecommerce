import mongoose from "mongoose";

const bannerModel = new mongoose.Schema({
      bannerImage: [{
        filename: { type: String, required: true },
        path: { type: String, required: true }
    }],
    
    bannerName: {
        type: String,
        required: [true, "Banner name is required"],
        trim: true,
        minlength: [2, "Banner name must be atleast 2 character long"],
    },
})
export default mongoose.model("banners", bannerModel)