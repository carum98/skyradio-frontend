import { SkFormData } from './form-data'

export class FormDataUser extends SkFormData {
    constructor (
        public name: string,
        public email: string,
        public password: string | null,
        public role: string,
    ) {
        super()
    }

    static create() {
        return new FormDataUser('', '', null, 'user')
    }

    static update(params: IUser) {
        const form = new FormDataUser(
            params.name,
            params.email,
            null,
            params.role,
        )

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name || undefined,
            email: this.email || undefined,
            password: this.password || undefined,
            role: this.role || undefined,
        }
    }
}