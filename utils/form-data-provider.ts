export class FormDataProvider {
    public name: string

    constructor(name: string) {
        this.name = name
    }

    static create() {
        return new FormDataProvider('')
    }

    static update(params: ISimProvider) {
        return new FormDataProvider(params.name)
    }

    toParams() {
        return {
            name: this.name
        }
    }
}