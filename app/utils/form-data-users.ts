import { SkFormData } from './form-data'
import { getRoleByValue } from './roles.static'

export class FormDataUser extends SkFormData {
    constructor (
        public name: string,
        public email: string,
        public password: string | null,
        public role: IRole,
    ) {
        super()
    }

    static create() {
        return new FormDataUser('', '', null, getRoleByValue('user'))
    }

    static update(params: IUser) {
        const form = new FormDataUser(
            params.name,
            params.email,
            null,
            getRoleByValue(params.role),
        )

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name || undefined,
            email: this.email || undefined,
            password: this.password || undefined,
            user_role: this.role?.value || undefined,
        }
    }
}