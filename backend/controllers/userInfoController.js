import User from '../models/signUpModel.js'

export const getUserInfo = async (req, res) => {
    try {
        const _id = req.user._id
        console.log(_id);
        
        const userInfo = await User.findById(_id).select("name email address phoneNumber ")
        if (!userInfo) {
           return res.status(404).json({message:"could'nt find the user",success:false})
        }
        console.log(userInfo);
        
        res.status(200).json({user:userInfo})
    } catch (error) {
        res.status(500).json({message:"server error while getting the user info", success:false})
        console.log("server error in userinfo" , error)
        
    }

}