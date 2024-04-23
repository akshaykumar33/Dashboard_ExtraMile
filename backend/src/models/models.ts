import mongoose, { Schema, Document } from 'mongoose';
import { ITask, IPerformance, IEmployee } from '@/types/type';

// Define Task schema
interface ITaskModel extends ITask, Document {
    taskId: mongoose.Types.ObjectId;
    empId:mongoose.Types.ObjectId
}

const taskSchema: Schema = new Schema({
    taskId: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    empId:{ type: Schema.Types.ObjectId, ref: 'Employee' },
    category:{ type: String, required: true },
    description:{ type: String, required: true }
}, { _id: false ,timestamps: true});

// Define Performance schema
interface IPerformanceModel extends IPerformance, Document {
    performanceId: mongoose.Types.ObjectId;
    empId:mongoose.Types.ObjectId
}

const performanceSchema: Schema = new Schema({
    performanceId: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    empId:{ type: Schema.Types.ObjectId, ref: 'Employee' },
    level:{ type: String, required: true },
    rating:{ type: String, required: true },
    details:{ type: String, required: true }
}, { _id: false ,timestamps: true});

// Define Employee schema
interface IEmployeeModel extends IEmployee, Document {
    empId: mongoose.Types.ObjectId;
    taskIds: mongoose.Types.ObjectId[];
    performanceIds: mongoose.Types.ObjectId[];
}

const employeeSchema: Schema = new Schema({
    empId: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    role:{ type: String, enum: ['Admin', 'Employee', 'SuperAdmin'], required: true },
    otp: { type: String, required: false },
    status: { type: String, enum: ['Pending', 'Active', 'Inactive'], required: true },
    taskIds: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    performanceIds: [{ type: Schema.Types.ObjectId, ref: 'Performance' }],
}, { _id: false ,timestamps: true });

// Define join schema for performance and employee
interface IEmployeePerformanceLink extends Document {
    employee: mongoose.Types.ObjectId;
    performance: mongoose.Types.ObjectId;
}

const employeePerformanceSchema: Schema = new Schema({
    employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
    performance: { type: Schema.Types.ObjectId, ref: 'Performance' },
});

export const TaskModel = mongoose.model<ITaskModel>('Task', taskSchema);
export const PerformanceModel = mongoose.model<IPerformanceModel>('Performance', performanceSchema);
export const EmployeeModel = mongoose.model<IEmployeeModel>('Employee', employeeSchema);
export const EmployeePerformanceModel = mongoose.model<IEmployeePerformanceLink>('EmployeePerformanceLink', employeePerformanceSchema);
