export class FormDataModality {
    public name: string

    constructor(name: string) {
        this.name = name
    }

    static create() {
        return new FormDataModality('')
    }

    static update(params: IModality) {
        return new FormDataModality(params.name)
    }

    toParams() {
        return {
            name: this.name
        }
    }
}