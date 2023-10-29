declare global {
    interface ISim {
        code: string
        name: string
        provider: ISimProvider
    }
}

export {}