export enum TaskStatus {
    PENDING = "Pending",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed"
}

export interface CreateTaskDTO {
    /** @isInt */
    controlId: number;

    /** @minLength 1 @maxLength 100 */
    name: string;

    /** @minLength 1 @maxLength 500 */
    description: string;

    /** @minLength 1 @maxLength 100 */
    category: string;

    status?: TaskStatus;
}

export interface UpdateTaskDTO {
    /** @minLength 1 @maxLength 100 */
    name?: string;

    /** @minLength 1 @maxLength 500 */
    description?: string;

    /** @minLength 1 @maxLength 100 */
    category?: string;

    status?: TaskStatus;
}

export interface TaskResponseDTO {
    id: number;
    organizationId: number;
    controlId: number;
    name: string;
    description: string;
    category: string;
    status: string;
}