<script setup lang="ts">
defineProps<{
    path: string
    radio: IRadio | null
}>()

const emits = defineEmits<{
    selected: [IRadio]
    close: []
}>()

// methods
function onSelect(item: IRadio) {
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
            {{ item.imei }}

            <span v-if="item.model" class="sk-link">
                <span class="badge-color" :style="{ backgroundColor: item.model.color }"></span>
                {{ item.model.name }}
            </span>
        </template>
    </Picker>
</template>