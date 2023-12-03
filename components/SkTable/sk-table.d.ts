// Table
export interface SkTableColumn {
    title: string
    altTitle?: string
    key: string
    width?: number
    align?: 'left' | 'center' | 'right'
    formatter?: (value: any) => string
}

export interface SkTablePropsBase<T> {
    columns?: SkTableColumn[]
    data: T[]
    loading?: boolean
    hover?: boolean
}

export interface SkTablePropsBaseGrid<T> extends Omit<SkTablePropsBase<T>, 'columns'> {
}

export interface SkTableProps<T> extends Omit<SkTablePropsBase<T>, 'data'> {
    table: ITable<T> | null
    gridView?: boolean
}

export type SkTableEmits<T> = {
    onRowClick: [row: T]
}

// Slots
export interface SkTableSlotsBase<T> {
    [name: string]: (props: { value: any, item: T, column: SkTableColumn }) => VNode
}

export interface SkTableSlotsBaseGrid<T> {
    cell?: (props: { item: T }) => VNode
}

export interface SkTableSlots<T> extends SkTableSlotsBase<T>, SkTableSlotsBaseGrid<T> {
    toolbar?: {}
    actions?: {}
}

// Pagination
export interface SkPaginationProps {
    pagination: IPagination
}

export type SkPaginationEmits = {
    onPage: [page: number]
}