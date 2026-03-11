import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false }) //Without this setting, if a user has an empty cartData object, Mongoose will not save that field at all in MongoDB. By setting minimize: false, you ensure that every user document has a cartData: {} field from the moment it is created, keeping your data structure predictable.

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel