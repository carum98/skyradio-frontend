<script setup lang="ts">
const props = withDefaults(defineProps<{
    radio: IRadio
    hideSim?: boolean
    hideName?: boolean
}>(), {
    hideSim: false,
    hideName: false
})

defineEmits<{
    remove: [IRadio]
}>()

const templateColumns = computed(() => {
    const columns = {
        name: '235px',
        imei: '1fr',
        model: '70px',
        sim: '1fr',
        remove: '35px'
    }

    if (props.hideName) {
        delete columns.name
    }

    if (props.hideSim) {
        delete columns.sim
    }

    return Object.values(columns).join(' ')
})
</script>

<template>
    <div class="add-radio-item">
        <input
            v-if="!hideName"
            type="text"
            class="sk-input"
            placeholder="Nombre del radio"
            v-model="radio.name" 
        />

        {{ radio.imei }}

        <span v-if="radio.model" class="sk-link">
            <span class="badge-color" :style="{ backgroundColor: radio.model.color }"></span>
            {{ radio.model.name }}
        </span>

        <SelectSim
            v-if="!hideSim"
            v-model="radio.sim"
        />

        <button type="button" @click="$emit('remove', radio)">
            <IconsTrashBin />
        </button>
    </div>
</template>

<style>
.add-radio-item {
    display: grid !important;
    grid-template-columns: v-bind(templateColumns);
    gap: 20px;

    background-color: var(--table-color);
    padding: 15px 20px;
    border-radius: 15px;
    display: flex;
    align-items: center;

    & button {
        margin-left: auto;
    }
}
</style>