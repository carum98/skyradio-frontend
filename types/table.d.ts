declare global {
    interface ITable<T> {
        data: T[]
        pagination: IPagination
    }
    
    interface IPagination {
        page: number
        per_page: number
        total: number
        total_pages: number
    }
}

export {}