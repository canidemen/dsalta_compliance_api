import { PrismaClient } from "../../prisma/generated/client";
import { CreateEvidenceDTO, EvidenceResponseDTO } from '../models/evidence.dto';
import { PrismaPg } from '@prisma/adapter-pg';
import { NotFoundError } from '../errors/http-errors';

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export class EvidenceService{
    //POST
    async createEvidence(organizationId: number, taskId: number, data: CreateEvidenceDTO): Promise<EvidenceResponseDTO> {
        //does task belong to organization?
        const where: any={ organizationId, id: taskId };
        
        const task = await prisma.task.findFirst({ where });
        if (!task){
            throw new NotFoundError("Task not found in the specified organization");
        }

        const evidence = await prisma.evidence.create({
            data:{
                type: data.type,
                note: data.note,
                taskId
            }
        });

        return evidence;
    }

    //DELETE
    async deleteEvidence(organizationId: number, taskId: number, evidenceId: number): Promise<void>{
        //does evidence belong to task and organization?
        const evidence = await prisma.evidence.findFirst({
            where: {
                id: evidenceId,
                taskId,
                task: { organizationId }
            }
        });

        if (!evidence){
            throw new NotFoundError("Evidence not found for the specified task and organization");
        }

        await prisma.evidence.delete({
            where: { id: evidenceId }
        });
    }
}