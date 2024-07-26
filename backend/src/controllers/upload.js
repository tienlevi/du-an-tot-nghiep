import { StatusCodes } from "http-status-codes";
import Upload from "../models/upload"


export const createUpload = async (req, res) => {
    try {
        const upload = req.body;
        const newUpload = new Upload(upload);
        await newUpload.save();
        return res.status(StatusCodes.OK).json(newUpload);
    } catch (error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
}