declare global {
    interface ISim {
        code: String
        name: String
        provider: ISimProvider
    }
}

export {}