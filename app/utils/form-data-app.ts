import { SkFormData } from "./form-data"

export class FormDataApp extends SkFormData {
    public name: string
    public license: ILicense | null
    public client: IClient | null

    constructor(name: string, license: ILicense | null, client: IClient | null) {
        super()
        this.name = name
        this.license = license
        this.client = client
    }

    static create() {
        return new FormDataApp('', null, null)
    }

    static update(params: IApp) {
        const form = new FormDataApp(params.name, params.license, params.client)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name,
            license_code: this.license?.code,
            client_code: this.client?.code
        }
    }
}