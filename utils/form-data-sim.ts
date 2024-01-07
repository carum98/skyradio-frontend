import { SkFormData } from './form-data'

export class FormDataSim extends SkFormData {
    public number: string
    public serial: string
    public provider: ISimProvider | null

    constructor(number: string, serial: string, provider: ISimProvider | null) {
        super()

        this.number = number
        this.serial = serial
        this.provider = provider
    }

    static create() {
        return new FormDataSim('', '', null)
    }

    static update(params: ISim) {
        const form = new FormDataSim(
            params.number,
            params.serial || '',
            params.provider
        )

        form.code = params.code

        return form
    }

    toParams() {
        return {
            number: this.number || undefined,
            serial: this.serial || undefined,
            provider_code: this.provider?.code
        }
    }
}