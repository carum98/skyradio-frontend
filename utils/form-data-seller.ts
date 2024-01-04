import { SkFormData } from "./form-data"

export class FormDataSeller extends SkFormData {
    public name: string

    constructor(name: string) {
        super()
        this.name = name
    }

    static create() {
        return new FormDataSeller('')
    }

    static update(params: ISeller) {
        const form = new FormDataSeller(params.name)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name
        }
    }

    get isValid(): boolean {
        return this.name.length > 0
    }
}