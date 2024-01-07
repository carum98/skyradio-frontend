<script setup lang="ts">
defineProps<{
    required?: boolean
}>()

const colors = [
    '#FF0000',
    '#FF7F00',
    '#FFFF00',
    '#00FF00',
    '#0000FF',
    '#4B0082',
    '#9400D3',
    '#FF00FF',
    '#FFC0CB',
    '#FFA500',
    '#A52A2A',
    '#800000',
    '#808000',
    '#008000',
    '#000080',
]

const color = defineModel<string>()

onMounted(() => {
    if (!color.value) {
        let random = Math.floor(Math.random() * colors.length)
        color.value = colors[random]
    }
})
</script>

<template>
    <div class="sk-color-picker">
        <input 
            style="display: none;"
            :value="color" 
            :required="required"
        />
        <button
            v-for="item in colors" 
            :key="item"
            :style="{ backgroundColor: item }"
            :data-checked="color === item"
            @click.prevent="color = item"
        ></button>
    </div>
</template>