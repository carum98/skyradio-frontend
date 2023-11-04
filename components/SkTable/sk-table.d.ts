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
    hover?: boolean
}

export interface SkTableProps<T> extends Omit<SkTablePropsBase<T>, 'data'> {
    table: ITable<T> | null
}

export type SkTableEmits<T> = {
    onRowClick: [row: T]
}

// Slots
export interface SkTableSlotsBase<T> {
    [name: string]: (props: { value: any, item: T, column: SkTableColumn }) => VNode
}

export interface SkTableSlots<T> extends SkTableSlotsBase<T> {
    toolbar?: {}
}

// Pagination
export interface SkPaginationProps {
    pagination: IPagination
}

export type SkPaginationEmits = {
    onPage: [page: number]
}