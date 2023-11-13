export class FormDataClient {
    public name: string
    public modality: IModality | null
    public seller: ISeller | null

    constructor(name: string, modality: IModality | null, seller: ISeller | null) {
        this.name = name
        this.modality = modality
        this.seller = seller
    }

    static create() {
        return new FormDataClient('', null, null)
    }

    static update(params: IClient) {
        return new FormDataClient(params.name, params.modality, params.seller)
    }

    toParams() {
        return {
            name: this.name,
            modality_code: this.modality?.code,
            seller_code: this.seller?.code
        }
    }
}
