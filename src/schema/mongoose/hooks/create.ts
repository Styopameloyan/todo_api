import mongoose from "mongoose";

const createHook = async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    this.updateDate = new Date();
    if (this.isNew) this.createDate = new Date();

    next();
}

export { createHook };