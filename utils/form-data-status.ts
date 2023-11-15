import { SkFormData } from "./form-data"

export class FormDataStatus extends SkFormData {
    public name: string

    constructor(name: string) {
        super({ name })
        this.name = name
    }

    static create() {
        return new FormDataStatus('')
    }

    static update(params: IRadioStatus) {
        const form = new FormDataStatus(params.name)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name
        }
    }
}