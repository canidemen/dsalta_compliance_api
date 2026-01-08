import { Controller, Route, SuccessResponse, Tags, Post, Path, Body, Delete, Response} from "tsoa";
import { EvidenceService } from "../services/evidence_service";
import { CreateEvidenceDTO, EvidenceResponseDTO } from "../models/evidence.dto";



@Route("v1/organizations/{organizationId}/tasks/{taskId}/evidence")
@Tags("Evidence")
export class EvidenceController extends Controller {
    private evidenceService = new EvidenceService();

    //POST
    @Post()
    @SuccessResponse("201", "Created")
    @Response(400, "Validation Error")
    public async createEvidence(
        @Path() organizationId: number,
        @Path() taskId: number,
        @Body() body: CreateEvidenceDTO
    ): Promise<EvidenceResponseDTO>{
        this.setStatus(201);
        return await this.evidenceService.createEvidence(organizationId, taskId, body);
    }

    //DELETE
    @Delete("{evidenceId}")
    @SuccessResponse("204", "No Content")
    @Response(404, "Evidence Not Found")
    public async deleteEvidence(
        @Path() organizationId: number,
        @Path() taskId: number,
        @Path() evidenceId: number
    ): Promise<void>{
        this.setStatus(204);
        return await this.evidenceService.deleteEvidence(organizationId, taskId, evidenceId);
    }
}