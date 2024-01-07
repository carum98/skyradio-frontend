export abstract class SkFormData {
    private _data: Record<string, any> | null = null

    public code: string | null = null

    constructor() {
        setTimeout(() => this._data = this.toParams(), 0) 
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

    get isDirty(): boolean {
        if (this.isEditing) {
            if (this._data === null) {
                return true
            }
            return JSON.stringify(this._data) === JSON.stringify(this.toParams())
        } else {
            return false
        }
    }
}
