// Select
export interface SkSelectOptions<T> {
    options: T[]
    show: boolean
}

export type SkSelectOptionsEmits<T> = {
    input: [value: string]
    onChange: [value: T]
    onData: []
}

// Input
export interface SkSelectInput {
    label: string;
}

export type SkSelectInputEmits = {
    input: [value: string]
}

// Props
export interface SkSelectProps<T> extends Omit<SkSelectOptions<T>, 'show'>, SkSelectInput {
    value: T
}

// Emits
export type SkSelectEmits<T> = SkSelectOptionsEmits<T> & SkSelectInputEmits

// Slots
export type SkSelectSlots<T> = {
    option?: (props: { item: T }) => any
}