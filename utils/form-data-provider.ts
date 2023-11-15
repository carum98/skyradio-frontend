import { SkFormData } from "./form-data"

export class FormDataProvider extends SkFormData {
    public name: string

    constructor(name: string) {
        super({ name })
        this.name = name
    }

    static create() {
        return new FormDataProvider('')
    }

    static update(params: ISimProvider) {
        const form = new FormDataProvider(params.name)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name
        }
    }
}