import { SkFormData } from "./form-data"

export class FormDataProvider extends SkFormData {
    public name: string
    public color: string

    constructor(name: string, color: string) {
        super()
        this.name = name
        this.color = color
    }

    static create() {
        return new FormDataProvider('', '')
    }

    static update(params: ISimProvider) {
        const form = new FormDataProvider(params.name, params.color)

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