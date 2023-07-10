import { z } from 'zod'

export enum PrescriptionStatus {
    FILLED = 'Filled',
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress'
}

export const PrescriptionSchema = z.object({
    name: z.string(),
    refills: z.number(),
    status: z.nativeEnum(PrescriptionStatus),
    userId: z.string(),
    id: z.string()
})

export type Prescription = z.infer<typeof PrescriptionSchema>
