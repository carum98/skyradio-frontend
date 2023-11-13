export class FormDataStatus {
    public name: string

    constructor(name: string) {
        this.name = name
    }

    static create() {
        return new FormDataStatus('')
    }

    static update(params: IRadioStatus) {
        return new FormDataStatus(params.name)
    }

    toParams() {
        return {
            name: this.name
        }
    }
}