import mongoose from "mongoose";
import { createHook } from "./hooks/create";
import { updateHook } from "./hooks/update";

export interface TaskTree {
    // Standard Felder
    name: string;
    createUser: string;
    updateUser: string;
    updateDate: Date;
    createDate: Date;

    // Felder
    label: string;
    description: string;
    icon: string;
    url: string;
    divider: boolean;
    newWindow: boolean;
    sortIndex: number;
    props: TaskTree[];

    // Berechtigungen
    baseRole: string[];
    moduleRoles: string[];
    flags: string[]
}

const Schema = new mongoose.Schema<TaskTree>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createUser: String,
    updateUser: String,
    updateDate: Date,
    createDate: Date,

    label: String,
    description: String,
    icon: String,
    url: String,
    divider: Boolean,
    newWindow: Boolean,
    sortIndex: Number,
    props: Array,

    baseRole: Array,
    moduleRoles: Array,
    flags: Array,


}).pre("save", createHook).pre("findOneAndUpdate", updateHook);

export default mongoose.model("TaskTree", Schema);





