import { SkFormData } from "./form-data"

export class FormDataLicense extends SkFormData {
    public key: string

    constructor(key: string) {
        super()
        this.key = key
    }

    static create() {
        return new FormDataLicense('')
    }

    static update(params: ILicense) {
        const form = new FormDataLicense(params.key)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            key: this.key || undefined,
        }
    }
}