<script setup lang="ts">
defineEmits<{
    remove: [IRadio]
}>()

defineProps<{
    radio: IRadio
}>()
</script>

<template>
    <input
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
        v-model="radio.sim"
    />

    <button type="button" @click="$emit('remove', radio)">
        <IconsTrashBin />
    </button>
</template>

<style>
.add-radio-item {
    display: grid !important;
    grid-template-columns: 235px 1fr 70px 1fr 35px;
    gap: 20px;
}
</style>