<script setup lang="ts">
defineProps<{
    path: string
    radio: IClient | null
}>()

const emits = defineEmits<{
    selected: [IClient]
    close: []
}>()

// methods
function onSelect(item: IClient) {
    emits('selected', item)
    emits('close')
}
</script>

<template>
    <Picker
        :path="path"
        :value="radio"
        @selected="onSelect"
    >
        <template #option="{ item }">
            <div>
                <SkAvatar class="mr-1" :alt="item.name" :color="item.color" />
                {{ item.name }}
            </div>  
        </template>
    </Picker>
</template>