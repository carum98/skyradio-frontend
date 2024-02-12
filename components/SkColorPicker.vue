<script setup lang="ts">
import { colors } from '@utils/colors'

defineProps<{
    required?: boolean
}>()

const color = defineModel<string>()

onMounted(() => {
    if (!color.value) {
        color.value = getRandomColor()
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