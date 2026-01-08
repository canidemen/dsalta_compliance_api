import { Controller, Post, Route, SuccessResponse, Tags, Response, Path, Body, Get, Query, Patch, Delete } from "tsoa";
import { TaskService } from "../services/task_service";
import { CreateTaskDTO, TaskResponseDTO, UpdateTaskDTO } from "../models/task.dto";


@Route("v1/organizations/{organizationId}/tasks")
@Tags("Task")
export class TaskController extends Controller {
    private taskService = new TaskService();

    //POST TASK
    @Post()
    @SuccessResponse("201", "Created")
    @Response(400, "Validation Error")
    public async createTask(
        @Path() organizationId: number,
        @Body() body: CreateTaskDTO
    ): Promise<TaskResponseDTO> {
            this.setStatus(201);
            return await this.taskService.createTask(organizationId, body);
        }
    

    //LIST TASKS
    @Get()
    @SuccessResponse("200", "OK")
    @Response(400, "Validation Error")
    public async getTasks(
        @Path() organizationId: number,
        @Query() page: number = 1,
        @Query() limit: number = 10,        //default 10 tasks per page
        @Query() status: string,
        @Query() category: string
    ): Promise<{ tasks: TaskResponseDTO[]; total: number, page: number; limit: number }> {
        return await this.taskService.getTasks(organizationId, {page, limit, status, category});
    }

    //GET TASK DETAILS
    @Get("{taskId}")
    @SuccessResponse("200", "OK")
    @Response(404, "Task Not Found")
    public async getTaskDetails(
        @Path() organizationId: number,
        @Path() taskId: number
    ): Promise<TaskResponseDTO> {
        return await this.taskService.getTask(organizationId, taskId);
    }

    //UPDATE
    @Patch("{taskId}")
    @SuccessResponse("200", "OK")
    @Response(404, "Task Not Found")
    public async updateTask(
        @Path() organizationId: number,
        @Path() taskId: number,
        @Body() body: UpdateTaskDTO
    ): Promise<TaskResponseDTO>{
        return await this.taskService.updateTask(organizationId, taskId, body);
    }

    
    //DELETE
    @Delete("{taskId}")
    @SuccessResponse("204", "No Content")
    @Response(404, "Task Not Found")
    public async deleteTask(
        @Path() organizationId: number,
        @Path() taskId: number
    ): Promise<void>{
        return await this.taskService.deleteTask(organizationId, taskId);
    }
};