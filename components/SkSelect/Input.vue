<script setup lang="ts">
import type { SkSelectInput } from './sk-select'

defineProps<SkSelectInput>()
</script>

<template>
    <div class="sk-select__input sk-input">
        {{ label }}
    </div>
</template>