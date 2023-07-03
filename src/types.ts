// should be the shape the api is expecting - what does node like?
// will be reused for the patch
export enum PrescriptionStatus {
    FILLED = 'Filled',
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress'
}

export interface Prescription {
    drugName: string
    refills: number
    status: PrescriptionStatus
}

// is this an interface or type?
export interface Patient {
    firstName: string
    lastName: string
    email: string
    phone: string // is this right?
    lastAppointment: string // is this date time?
    id?: string
    // start with one, start with an array?
    prescriptions: Prescription[]
}
