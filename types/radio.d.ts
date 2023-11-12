declare global {
    interface IRadio {
        code: string
        name: string
        imei: string
        serial: string
        sim: ISim | null
        model: IRadioModel | null
        client: IClient | null
    }
}

export {}