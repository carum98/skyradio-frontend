export class FormDataSeller {
    public name: string

    constructor(name: string) {
        this.name = name
    }

    static create() {
        return new FormDataSeller('')
    }

    static update(params: ISeller) {
        return new FormDataSeller(params.name)
    }

    toParams() {
        return {
            name: this.name
        }
    }
}