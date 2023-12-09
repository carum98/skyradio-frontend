<script setup lang="ts">
const props = defineProps<{
    path: string
    radio: IRadio | null
}>()

const emits = defineEmits<{
    selected: [IRadio]
    close: []
}>()

// data
const items = ref<IRadio[]>([])
const search = useDebounce('', 500)

// methods
async function onData() {
    const { data } = await $fetch<ITable<IRadio>>(props.path, {
        params: {
            search: search.value
        }
    })

    items.value = data
}

function onSelect(item: IRadio) {
    emits('selected', item)
    emits('close')
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
        v-model="search"
    />

    <ul class="sk-select-options">
        <li 
            v-for="item in items" 
            :key="item.code"
            @click="onSelect(item)"
        >
            {{ item.imei }}
        </li>
    </ul>
</template>