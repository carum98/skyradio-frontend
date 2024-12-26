interface IApp {
    code: string
    name: string
    license: ILicense | null
    client: IClient
}

// Interface only for create
interface IAppForm extends Pick<IApp, 'name' | 'license'> {}
