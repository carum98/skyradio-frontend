declare global {
    interface IClient {
        code: string
        name: string
        color: string
        modality: IModality
        seller: ISeller
        radios_count: number
    }
}

export {}