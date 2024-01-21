interface ILog {
    action: string
    created_at: string
    message: string
    user: {
        code: string
        name: string
    }
    values: {
        radio: {
            code: string
            imei: string
        } | null
        client: {
            code: string
            name: string
        } | null
        sim: {
            code: string
            number: string
        } | null
    }
}