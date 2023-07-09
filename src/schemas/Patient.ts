import { z } from 'zod'
// import { Prescription } from './Prescription'

const PatientSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    lastAppointment: z.string().nullable(),
    // won't have an ID for POST, will for GET
    id: z.string().optional(),
    // how to represent an array of objects
    prescriptions: z.array(z.object({})).optional(),
    activeScripts: z.array(z.object({})).optional(),
    expiredScripts: z.array(z.object({})).optional(),
})

export type Patient = z.infer<typeof PatientSchema>
