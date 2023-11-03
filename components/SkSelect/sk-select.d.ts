// Select
export type SkSelectOptions<T> = {
    options: T[]
    show: boolean
    search: string
}

export type SkSelectOptionsEmits<T> = {
    'update:value': [value: T]
    'update:search': [value: string]
    onData: []
}

// Input
export type SkSelectInput<T> = {
    label: string
    value: T
}

export type SkSelectInputEmits<T> = Pick<SkSelectOptionsEmits<T>, 'update:value' | 'update:search'>

// Props
export type SkSelectProps<T> = Omit<SkSelectOptions<T>, 'show'> & SkSelectInput<T>

// Emits
export type SkSelectEmits<T> = SkSelectOptionsEmits<T> & SkSelectInputEmits<T>

// Slots
export type SkSelectSlots<T> = {
    option: (props: { item: T }) => any
}