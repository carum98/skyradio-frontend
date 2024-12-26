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
            minlength="3"
            maxlength="100"
            autofocus
            v-model="app.name" 
        />

        <div>
            <SelectLicense
                show-clear
                v-model="app.license"
            />
            <small v-if="app.license?.is_active">
                La licencia se encuentra en uso
            </small>
        </div>

        <button type="button" @click="$emit('remove', app)">
            <IconsTrashBin />
        </button>
    </div>
</template>

<style scoped>
.item-row {
    grid-template-columns: 230px 1fr 35px;
}
</style>