export interface CreateEvidenceDTO {
    /** @minLength 1 @maxLength 100 */
    type: string;

    /** @minLength 1 @maxLength 500 */
    note: string;
}

export interface EvidenceResponseDTO {
    id: number;
    taskId: number;
    type: string;
    note?: string;
}
