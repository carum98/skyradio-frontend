import { SkFormData } from "./form-data"

export class FormDataModality extends SkFormData {
    public name: string

    constructor(name: string) {
        super({ name })
        this.name = name
    }

    static create() {
        return new FormDataModality('')
    }

    static update(params: IModality) {
        const form = new FormDataModality(params.name)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name
        }
    }
}