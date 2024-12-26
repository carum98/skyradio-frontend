<script setup lang="ts">
type FormState = {
    column: string
    order: 'asc' | 'desc'
}

const props = defineProps<{
    inital: FormState | null
}>()

const emits = defineEmits<{
    applied: [Record<string, any>, FormState]
}>()

// data
const form = reactive<FormState>({
    column: props.inital?.column ?? 'created_at',
    order: props.inital?.order ?? 'desc',
})

const fields = [
    { key: 'name', title: 'Nombre' },
    { key: 'created_at', title: 'Fecha de creación' },
    { key: 'updated_at', title: 'Fecha de actualización' }
]

// methods
function onApplied() {
    let query = {
        sort_by: form.column,
        sort_order: form.order,
    }

    emits('applied', query, form)
}

watch(form, onApplied, { deep: true })
</script>

<template>
    <div class="d-2-haft">
        <div class="list-options">
            <button 
                v-for="item in fields"
                :data-active="form.column === item.key"
                @click.prevent="form.column = item.key"
            >
                {{ item.title }}
            </button>
        </div>

        <div class="list-options">
            <button 
                :data-active="form.order === 'asc'"
                @click.prevent="form.order = 'asc'"
            >
                <svg viewBox="0 0 256 256"><path fill="currentColor" d="M36 128a12 12 0 0 1 12-12h68a12 12 0 0 1 0 24H48a12 12 0 0 1-12-12Zm12-52h52a12 12 0 0 0 0-24H48a12 12 0 0 0 0 24Zm132 104H48a12 12 0 0 0 0 24h132a12 12 0 0 0 0-24Zm52.49-100.49l-40-40a12 12 0 0 0-17 0l-40 40a12 12 0 0 0 17 17L172 77v67a12 12 0 0 0 24 0V77l19.51 19.52a12 12 0 0 0 17-17Z"/></svg>
                Ascendente
            </button>

            <button 
                :data-active="form.order === 'desc'"
                @click.prevent="form.order = 'desc'"
            >
                <svg viewBox="0 0 256 256"><path fill="currentColor" d="M128 128a12 12 0 0 1-12 12H48a12 12 0 0 1 0-24h68a12 12 0 0 1 12 12ZM48 76h132a12 12 0 0 0 0-24H48a12 12 0 0 0 0 24Zm52 104H48a12 12 0 0 0 0 24h52a12 12 0 0 0 0-24Zm132.49-20.49a12 12 0 0 0-17 0L196 179v-67a12 12 0 0 0-24 0v67l-19.51-19.52a12 12 0 0 0-17 17l40 40a12 12 0 0 0 17 0l40-40a12 12 0 0 0 0-16.97Z"/></svg>
                Desendente
            </button>
        </div>
    </div>
</template>
