import { SkFormData } from "./form-data"

export class FormDataConsole extends SkFormData {
    public license: ILicense | null

    constructor(license: ILicense | null) {
        super()

        this.license = license
    }

    static create() {
        return new FormDataConsole(null)
    }

    static update(params: IConsole) {
        const form = new FormDataConsole(
            params.license
        )

        form.code = params.code

        return form
    }

    toParams() {
        return {
            license_code: this.license?.code
        }
    }
}