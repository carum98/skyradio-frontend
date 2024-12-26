<script setup lang="ts" generic="T">
const props = defineProps<{
    path: string
    value: T | null
}>()

const emits = defineEmits<{
    selected: [T]
}>()

// data
const items = ref<T[]>([]) as Ref<T[]>
const search = useDebounce('', 500)

// methods
async function onData() {
    const { data } = await $fetch<ITable<T>>(props.path, {
        params: {
            search: search.value || undefined
        }
    })

    items.value = data
}

function onSelect(item: T) {
    emits('selected', item)
}

// hooks
watch(search, onData, {
    immediate: true
})
</script>

<template>
    <input 
        type="text" 
        class="sk-input"
        placeholder="Buscar" 
        v-model="search"
        autofocus
    />

    <ul class="picker-radio">
        <li 
            v-for="item in items" 
            @click="onSelect(item)"
        >
            <slot name="option" :item="item" />
        </li>
    </ul>
</template>

<style>
.picker-radio {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    height: 400px;
    overflow-y: auto;

    & li {
        cursor: pointer;
        background-color: var(--table-color);
        padding: 15px 20px;
        border-radius: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:hover {
            background-color: var(--primary-color);
        }
    }
}
</style>