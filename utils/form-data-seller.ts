import { SkFormData } from "./form-data"

export class FormDataSeller extends SkFormData {
    public name: string
    public user: IUser | undefined

    constructor(name: string, user?: IUser) {
        super()
        this.name = name
        this.user = user
    }

    static create() {
        return new FormDataSeller('')
    }

    static update(params: ISeller) {
        const form = new FormDataSeller(params.name, params.user)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name || undefined,
            user_code: this.user?.code || undefined,
        }
    }
}