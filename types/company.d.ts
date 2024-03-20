interface IClient {
    code: string
    name: string
    color: string
    modality: IModality
    seller: ISeller
    console: IConsole | null
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

interface IClientsStats {
    sellers: {
        name: string
        color: string
        count: number
    }[],
    modality: {
        name: string
        color: string
        count: number
    }[],
    clients: {
        code: string
        color: string
        name: string
        count: number
        models: {
            code: string
            name: string
            color: string
            count: number
        }[]
        providers: {
            code: string
            name: string
            color: string
            count: number
        }[]
    }[]
}