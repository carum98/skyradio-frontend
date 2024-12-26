<script setup lang="ts">
defineProps<{
    client: IClient
}>()

defineEmits<{
    remove: [IClient]
}>()
</script>

<template>
    <div class="item-row">
        <SkAvatar :alt="client.name" :color="client.color" />

        {{ client.name }}

        <button type="button" @click="$emit('remove', client)">
            <IconsTrashBin />
        </button>
    </div>
</template>

<style scoped>
.item-row {
    grid-template-columns: auto 1fr 35px;
}
</style>