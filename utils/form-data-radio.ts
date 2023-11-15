import { SkFormData } from './form-data'

export class FormDataRadio extends SkFormData {
    public name: string
    public imei: string
    public serial: string
    public model: IRadioModel | null

    constructor(name: string, imei: string, serial: string, model: IRadioModel | null) {
        super({ name, imei, serial, model })

        this.name = name
        this.imei = imei
        this.serial = serial
        this.model = model
    }

    static create() {
        return new FormDataRadio('', '', '', null)
    }

    static update(params: IRadio) {
        const form = new FormDataRadio(
            params.name,
            params.imei,
            params.serial,
            params.model
        )

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name,
            imei: this.imei,
            serial: this.serial,
            model_code: this.model?.code
        }
    }
}