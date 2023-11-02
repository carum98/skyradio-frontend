// Select
export type SkSelectOptions<T> = {
    options: T[]
    show: boolean
}

export type SkSelectOptionsEmits<T> = {
    'update:modelValue': [value: T]
    onData: []
}

// Input
export type SkSelectInput<T> = {
    label: string
    modelValue: T
}

export type SkSelectInputEmits<T> = Pick<SkSelectOptionsEmits<T>, 'update:modelValue'>

// Props
export type SkSelectProps<T> = Omit<SkSelectOptions<T>, 'show'> & SkSelectInput<T>

// Emits
export type SkSelectEmits<T> = SkSelectOptionsEmits<T> & SkSelectInputEmits<T>

// Slots
export type SkSelectSlots<T> = {
    option: (props: { item: T }) => any
}