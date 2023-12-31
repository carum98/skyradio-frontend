// Select
export type SkSelectOptions<T> = {
    options: T[]
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
export type SkSelectProps<T> = Omit<SkSelectOptions<T>, 'show' | 'uniqueId'> & Omit<SkSelectInput<T>, 'uniqueId'> & {
    required?: boolean
}

// Emits
export type SkSelectEmits<T> = SkSelectOptionsEmits<T> & SkSelectInputEmits<T>

// Slots
export type SkSelectSlots<T> = {
    option: (props: { item: T }) => any
}