export class FormDataModel {
    public name: string

    constructor(name: string) {
        this.name = name
    }

    static create() {
        return new FormDataModel('')
    }

    static update(params: IModality) {
        return new FormDataModel(params.name)
    }

    toParams() {
        return {
            name: this.name
        }
    }
}