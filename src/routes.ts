/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TaskController } from './controllers/task_controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EvidenceController } from './controllers/evidence_controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "TaskResponseDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "organizationId": {"dataType":"double","required":true},
            "controlId": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateTaskDTO": {
        "dataType": "refObject",
        "properties": {
            "controlId": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateTaskDTO": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "category": {"dataType":"string"},
            "status": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EvidenceResponseDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "taskId": {"dataType":"double","required":true},
            "type": {"dataType":"string","required":true},
            "note": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateEvidenceDTO": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"string","required":true},
            "note": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsTaskController_createTask: Record<string, TsoaRoute.ParameterSchema> = {
                organizationId: {"in":"path","name":"organizationId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateTaskDTO"},
        };
        app.post('/api/v1/organizations/:organizationId/tasks',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.createTask)),

            async function TaskController_createTask(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTaskController_createTask, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'createTask',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTaskController_getTasks: Record<string, TsoaRoute.ParameterSchema> = {
                organizationId: {"in":"path","name":"organizationId","required":true,"dataType":"double"},
                page: {"default":1,"in":"query","name":"page","dataType":"double"},
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                status: {"in":"query","name":"status","required":true,"dataType":"string"},
                category: {"in":"query","name":"category","required":true,"dataType":"string"},
        };
        app.get('/api/v1/organizations/:organizationId/tasks',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.getTasks)),

            async function TaskController_getTasks(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTaskController_getTasks, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'getTasks',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTaskController_getTaskDetails: Record<string, TsoaRoute.ParameterSchema> = {
                organizationId: {"in":"path","name":"organizationId","required":true,"dataType":"double"},
                taskId: {"in":"path","name":"taskId","required":true,"dataType":"double"},
        };
        app.get('/api/v1/organizations/:organizationId/tasks/:taskId',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.getTaskDetails)),

            async function TaskController_getTaskDetails(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTaskController_getTaskDetails, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'getTaskDetails',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTaskController_updateTask: Record<string, TsoaRoute.ParameterSchema> = {
                organizationId: {"in":"path","name":"organizationId","required":true,"dataType":"double"},
                taskId: {"in":"path","name":"taskId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateTaskDTO"},
        };
        app.patch('/api/v1/organizations/:organizationId/tasks/:taskId',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.updateTask)),

            async function TaskController_updateTask(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTaskController_updateTask, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'updateTask',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTaskController_deleteTask: Record<string, TsoaRoute.ParameterSchema> = {
                organizationId: {"in":"path","name":"organizationId","required":true,"dataType":"double"},
                taskId: {"in":"path","name":"taskId","required":true,"dataType":"double"},
        };
        app.delete('/api/v1/organizations/:organizationId/tasks/:taskId',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.deleteTask)),

            async function TaskController_deleteTask(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTaskController_deleteTask, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'deleteTask',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEvidenceController_createEvidence: Record<string, TsoaRoute.ParameterSchema> = {
                organizationId: {"in":"path","name":"organizationId","required":true,"dataType":"double"},
                taskId: {"in":"path","name":"taskId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateEvidenceDTO"},
        };
        app.post('/api/v1/organizations/:organizationId/tasks/:taskId/evidences',
            ...(fetchMiddlewares<RequestHandler>(EvidenceController)),
            ...(fetchMiddlewares<RequestHandler>(EvidenceController.prototype.createEvidence)),

            async function EvidenceController_createEvidence(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEvidenceController_createEvidence, request, response });

                const controller = new EvidenceController();

              await templateService.apiHandler({
                methodName: 'createEvidence',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEvidenceController_deleteEvidence: Record<string, TsoaRoute.ParameterSchema> = {
                organizationId: {"in":"path","name":"organizationId","required":true,"dataType":"double"},
                taskId: {"in":"path","name":"taskId","required":true,"dataType":"double"},
                evidenceId: {"in":"path","name":"evidenceId","required":true,"dataType":"double"},
        };
        app.delete('/api/v1/organizations/:organizationId/tasks/:taskId/evidences/:evidenceId',
            ...(fetchMiddlewares<RequestHandler>(EvidenceController)),
            ...(fetchMiddlewares<RequestHandler>(EvidenceController.prototype.deleteEvidence)),

            async function EvidenceController_deleteEvidence(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEvidenceController_deleteEvidence, request, response });

                const controller = new EvidenceController();

              await templateService.apiHandler({
                methodName: 'deleteEvidence',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
