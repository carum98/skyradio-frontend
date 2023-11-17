declare global {
    interface ISim {
        code: string
        number: string
        serial: string | null
        provider: ISimProvider
        radio: Pick<IRadio, 'code' | 'name' | 'imei' | 'client'>
    }
}

export {}