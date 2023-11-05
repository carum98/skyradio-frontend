declare global {
    interface IRadio {
        code: string
        name: string
        imei: string
        serial: string
        sim: ISim
    }
}

export {}