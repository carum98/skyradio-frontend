import { SkFormData } from './form-data'

export class FormDataClient extends SkFormData {
    public name: string
    public modality: IModality | null
    public seller: ISeller | null

    constructor(name: string, modality: IModality | null, seller: ISeller | null) {
        super({ name, modality, seller })

        this.name = name
        this.modality = modality
        this.seller = seller
    }

    static create() {
        return new FormDataClient('', null, null)
    }

    static update(params: IClient) {
        const form = new FormDataClient(params.name, params.modality, params.seller)

        form.code = params.code

        return form
    }

    toParams() {
        return {
            name: this.name,
            modality_code: this.modality?.code,
            seller_code: this.seller?.code
        }
    }
}
