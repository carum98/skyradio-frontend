declare global {
    interface ICompany {
        code: string
        name: string
        modality: IModality
        seller: ISeller
        radios_count: number
    }
}

export {}