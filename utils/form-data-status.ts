import { SkFormData } from "./form-data"

export class FormDataStatus extends SkFormData {
    public name: string
    public color: string

    constructor(name: string, color: string) {
        super()
        this.name = name
        this.color = color
    }

    static create() {
        return new FormDataStatus('', '')
    }

    static update(params: IRadioStatus) {
        const form = new FormDataStatus(params.name, params.color)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name,
            color: this.color
        }
    }

    get isValid(): boolean {
        return this.name.length > 0 && this.color != null
    }
}