
import bannerModel from '../models/banner.js';

export const getBanners = async (req, res) => {
    try {
        const banners = await bannerModel.find()
        if (!banners) {
            return res.status(404).json({ message: "No banners found", success: false })
        }
        res.status(200).json({ message: "Banners fetched successfully", success: true, banners: banners })
    } catch (error) {
        console.log("Server error while fetching banners", error);
        res.status(500).json({ message: "Something went wrong, try again/refresh", success: false })
    }
}
export const postBanners = async (req, res) => {
    try {
        const { bannerName } = req.body
          const bannerImage = req.files.map(m => ({
            filename: m.filename,
            path: m.path
        }))
        const newBanner = new bannerModel({
            bannerName,
            bannerImage
        })
        await newBanner.save()
        res.status(201).json({ message: "Banner created successfully", success: true, banner: newBanner })        
      
    }catch (error) {
        console.log("Server error while creating banner", error);
        res.status(500).json({ message: "Something went wrong, try again/refresh", success: false })
    }
}

export const deleteBanners = async (req, res) => {
    try {
        const {_id} = req.params
        const banner = await bannerModel.findByIdAndDelete(_id)
        if(!banner){
            return res.status(404).json({message:"Banner not found", success:false})
        }
        res.status(200).json({message:"Banner deleted successfully", success:true})
    } catch (error) {
        console.log("Server error while deleting banner", error);
        res.status(500).json({ message: "Something went wrong, try again/refresh", success: false })
    }
}
