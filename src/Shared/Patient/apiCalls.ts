export const getPatientFetcher = (url: string) => fetch(url).then((res) => res.json()).then(json => {
    const expiredScripts = json.prescriptions.filter((script: any) => !Number(script.refills))
    const activeScripts = json.prescriptions.filter((script: any) => Number(script.refills))
    return {...json, expiredScripts, activeScripts}
})

export const updatePatientFetcher = (url: string, formData: any) => fetch(url,
    {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    }
).then(res => res.json())

export const createPatientFetcher = (url: string, formData: any) => fetch(url,
    {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    }).then(res => res.json())

