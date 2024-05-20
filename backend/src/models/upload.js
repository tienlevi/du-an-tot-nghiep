import mongoose, { Schema } from "mongoose";

const uploadSchema = new Schema({
    image: {
        type: String
    }
},
    {timestamps: true, versionKey: false}
)
export default mongoose.model("Upload", uploadSchema)