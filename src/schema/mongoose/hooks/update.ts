import mongoose from "mongoose";

const updateHook = async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    this.update({ updateDate: new Date() })
    next();
}

export { updateHook };