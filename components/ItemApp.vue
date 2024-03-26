<script setup lang="ts">
defineProps<{
    app: IAppForm
}>()

defineEmits<{
    remove: [IAppForm]
}>()
</script>

<template>
    <div class="item-row">
        <input
            type="text"
            class="sk-input"
            placeholder="Nombre"
            v-model="app.name" 
        />

        <SelectLicense
            show-clear
            v-model="app.license"
        />

        <button type="button" @click="$emit('remove', app)">
            <IconsTrashBin />
        </button>
    </div>
</template>

<style scoped>
.item-row {
    grid-template-columns: 235px 1fr 35px;
}
</style>