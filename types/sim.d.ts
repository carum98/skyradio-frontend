declare global {
    interface ISim {
        code: string
        number: string
        serial: string | null
        provider: ISimProvider
    }
}

export {}