import { SkFormData } from "./form-data"

export class FormDataModality extends SkFormData {
    public name: string
    public color: string

    constructor(name: string, color: string) {
        super()
        this.name = name
        this.color = color
    }

    static create() {
        return new FormDataModality('', '')
    }

    static update(params: IModality) {
        const form = new FormDataModality(params.name, params.color)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name || undefined,
            color: this.color || undefined,
        }
    }
}