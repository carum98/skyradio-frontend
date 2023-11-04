// Table
interface SkTableColumn {
    title: string
    key: string
    formatter?: (value: any) => string
}

export interface SkTablePropsBase<T> {
    columns?: SkTableColumn[]
    data: T[]
    loading?: boolean
}

export interface SkTableProps<T> extends Omit<SkTablePropsBase<T>, 'data'> {
    table: ITable<T> | null
}

export type SkTableEmits<T> = {
    onRowClick: [row: T]
}

// Pagination
export interface SkPaginationProps {
    pagination: IPagination
}

export type SkPaginationEmits = {
    onPage: [page: number]
}