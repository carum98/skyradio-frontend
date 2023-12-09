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
            search: search.value || undefined
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
        placeholder="Buscar" 
        v-model="search"
        autofocus
    />

    <ul class="picker-radio">
        <li 
            v-for="item in items" 
            :key="item.code"
            @click="onSelect(item)"
        >
            {{ item.imei }}

            <span v-if="item.model" class="sk-link">
                <span class="badge-color" :style="{ backgroundColor: item.model.color }"></span>
                {{ item.model.name }}
            </span>
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
    width: 350px;
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