import { PrismaClient } from "../../prisma/generated/client";
import { CreateTaskDTO, UpdateTaskDTO, TaskResponseDTO, TaskStatus } from '../models/task.dto';
import { PrismaPg } from '@prisma/adapter-pg';
import { NotFoundError } from '../errors/http-errors';

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export class TaskService{
    //POST
    async createTask(organizationId: number, data: CreateTaskDTO): Promise<TaskResponseDTO> {
        //does control belong to organization?
        const control = await prisma.control.findFirst(
            {
                where: {
                    id: data.controlId,
                    framework: {
                        organizationId: organizationId
                    }
                }
            }
        );

        if (!control){
            throw new NotFoundError("Control not found in the specified organization");
        }

        const task = await prisma.task.create({
            data: {
                organizationId,
                controlId: data.controlId,
                name: data.name,
                description: data.description,
                category: data.category,
                status: data.status || TaskStatus.PENDING,
            }
        });
        
        return task;
    }

    //LIST TASKS
    async getTasks(
        organizationId: number,
        filters: { page: number; limit: number; status?: string; category?: string }
    ): Promise<{ tasks: TaskResponseDTO[]; total: number, page: number; limit: number }> {
        const { page, limit, status, category } = filters;
        let skip = (page - 1) * limit;
        
        const where: any = { organizationId };
        if (status) {where.status = status;}
        if (category) {where.category = category;}

        const [tasks, total] = await Promise.all([
            prisma.task.findMany({
                where,              //organizationid, optional: status, category
                skip,               //pagination
                take: limit         //return limit on tasks
            }),
            prisma.task.count({ where })        //total count for pagination
        ]);

        return {tasks, total, page, limit};
        
    }

    //GET TASK DETAILS
    async getTask(organizationId: number, taskId: number): Promise<TaskResponseDTO> {
        const where: any = {organizationId, id: taskId};
        const task = await prisma.task.findFirst({ where, include: {
            evidences: true,                    //includes evidences and controls with the task details
            control: true
        } });
        
        if (!task) {
          throw new NotFoundError('Task not found');
        }

        return task;
    }

    //UPDATE
    async updateTask(organizationId: number, taskId: number, data: UpdateTaskDTO): Promise<TaskResponseDTO>{
        const where: any = {organizationId, id: taskId};
        const exists = await prisma.task.findFirst({ where });

        if (!exists) {
            throw new NotFoundError('Task not found');
        }
        const task = await prisma.task.update({
            where: { id: taskId },
            data
        });

        return task;
    }


    //DELETE
    async deleteTask(organizationId: number, taskId: number): Promise<void>{
        const where: any = {organizationId, id: taskId};
        const exists = await prisma.task.findFirst({ where });
        if (!exists) {
            throw new NotFoundError('Task not found');
        }

        // ON CASCADE DELETE for evidences related to the task
        await prisma.evidence.deleteMany({
            where: { taskId }
        });

        await prisma.task.delete({
            where: { id: taskId, organizationId }
        });
    }
}