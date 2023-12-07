declare global {
    interface IClient {
        code: string
        name: string
        color: string
        modality: IModality
        seller: ISeller
        radios_count: number
    }

    interface IClientStats {
        models: {
            name: string
            color: string
            count: number
        }[]
        sims_providers: {
            name: string
            color: string
            count: number
        }[]
    }
}

export {}