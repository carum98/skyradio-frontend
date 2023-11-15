export abstract class SkFormData {
    private _data: Record<string, any> = {}

    public code: string | null = null

    constructor(data: Record<string, any>) {
        this._data = data
    }

    public abstract toParams(): Record<string, any>

    get isEditing(): boolean {
        return this.code !== null
    }

    static create(): SkFormData {
        throw new Error("Method not implemented.")
    }

    static update(params: any): SkFormData {
        throw new Error("Method not implemented.")
    }

    isDirty(): boolean {
        return Object.keys(this._data).length > 0
    }
}