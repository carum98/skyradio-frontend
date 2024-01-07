import { SkFormData } from './form-data'

export class FormDataClient extends SkFormData {
    public name: string
    public modality: IModality | null
    public seller: ISeller | null
    public color: string

    constructor(name: string, modality: IModality | null, seller: ISeller | null, color: string) {
        super()
        this.name = name
        this.modality = modality
        this.seller = seller
        this.color = color
    }

    static create() {
        return new FormDataClient('', null, null, '')
    }

    static update(params: IClient) {
        const form = new FormDataClient(params.name, params.modality, params.seller, params.color)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name || undefined,
            modality_code: this.modality?.code,
            seller_code: this.seller?.code,
            color: this.color || undefined,
        }
    }
}
