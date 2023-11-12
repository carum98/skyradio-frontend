export class FormDataSim {
    public number: string
    public serial: string
    public provider: ISimProvider | null

    constructor(number: string, serial: string, provider: ISimProvider | null) {
        this.number = number
        this.serial = serial
        this.provider = provider
    }

    static create() {
        return new FormDataSim('', '', null)
    }

    static update(params: ISim) {
        return new FormDataSim(
            params.number,
            params.serial || '',
            params.provider
        )
    }

    toParams() {
        return {
            number: this.number,
            serial: this.serial,
            provider_code: this.provider?.code
        }
    }
}