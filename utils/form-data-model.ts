import { SkFormData } from "./form-data"

export class FormDataModel extends SkFormData {
    public name: string

    constructor(name: string) {
        super({ name })
        this.name = name
    }

    static create() {
        return new FormDataModel('')
    }

    static update(params: IModality) {
        const form = new FormDataModel(params.name)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name
        }
    }
}