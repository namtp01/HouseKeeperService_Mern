import mongoose from "mongoose";
const { Schema } = mongoose;

const featureSchema = new Schema ({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

export default mongoose.model("Feature", featureSchema);