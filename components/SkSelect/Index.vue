<script setup lang="ts" generic="T">
import type { SkSelectProps, SkSelectEmits, SkSelectSlots } from './sk-select'

defineProps<SkSelectProps<T>>()
defineEmits<SkSelectEmits<T>>()
defineSlots<SkSelectSlots<T>>()

const show = ref(false)
</script>

<template>
    <div class="sk-select">
        <SkSelectInput 
            :label="label"
            @click.native="show = !show"
        />

        <SkSelectOptions 
            :options="options"
            :show="show"
            :value="value"
            @onData="$emit('onData')"
        >
            <template #option="{ item }">
                <slot name="option" :item="item">
                    {{ item }}
                </slot>
            </template>
        </SkSelectOptions>
    </div>
</template>