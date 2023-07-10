import { z } from 'zod'
import { PrescriptionSchema } from './Prescription'

const PatientSchema = z.object({
    activeScripts: z.array(PrescriptionSchema).optional(),
    email: z.string().email(),
    expiredScripts: z.array(PrescriptionSchema).optional(),
    firstName: z.string(),
    // won't have an ID for POST, will for GET
    id: z.string().optional(),
    lastAppointment: z.string().nullable(),
    lastName: z.string(),
    phone: z.string().length(10),
    // a patient profile can exist with no prescriptions
    prescriptions: z.array(PrescriptionSchema).optional(),
})

export type Patient = z.infer<typeof PatientSchema>
