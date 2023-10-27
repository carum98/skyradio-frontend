<script setup lang="ts" generic="T extends ITable<any>">
type Select  = T extends ITable<infer R> ? R : never

const props = defineProps<{
    items: T,
    modelValue: Select | null
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', row: Select | null): void
    (e: 'onPage', page: number): void
}>()

// data
const items = ref<Select[]>([])
const show = ref(false)

const value = computed<Select | null>({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

// methods
function onClick(row: Select | null) {
    value.value = row
}

// watch
watch(() => props.items, (value) => {
    items.value = value.data
}, { immediate: true })
</script>

<template>
    <div class="sk-select">
        <div class="sk-select__input" @click="show = !show">
            <slot v-if="value" name="input" :value="value.value">
                {{ value.name  }}
            </slot>
        </div>

        <section class="sk-select__options" :class="{ show }">
            <ul>
                <li v-for="item in items" @click="onClick(item)">
                    <slot name="option" :item="item">
                        {{ item.name }}
                    </slot>
                </li>
            </ul>
        </section>
    </div>
</template>