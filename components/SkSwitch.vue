<script setup lang="ts">
type Item = {
    label: string
    value: string
}

const props = defineProps<{
    items: Item[]
}>()

// data
const container = ref<HTMLElement>()
const value = defineModel<string>()
const index = ref<number>(0)

const width = calcWidth()

// methods
function calcWidth() {
    const labels = props.items.map(item => item.label)
    const longest = labels.reduce((a, b) => a.length > b.length ? a : b)

    return longest.length * 11 + 'px'
}

// hooks
watch(value, () => {
    nextTick(() => {
        const inputs = container.value?.querySelectorAll('input') as NodeListOf<HTMLInputElement>
        const checked = container.value?.querySelector('input:checked') as HTMLInputElement

        index.value = Array.from(inputs).indexOf(checked)
    })
})
</script>

<template>
    <div ref="container" class="sk-switch">
        <template v-for="item in items">
            <input 
                type="radio" 
                :id="item.value" 
                :value="item.value" 
                v-model="value"
            />
            <label :for="item.value">
                {{ item.label }}
            </label>
        </template>
    </div>
</template>

<style scoped>
.sk-switch {
    --width: v-bind('width');
    --translateX: calc(var(--width) * v-bind('index'));
    --length: v-bind('items.length');

    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(var(--length), var(--width));
    align-items: center;
    height: 45px;
    border-radius: 25px;
    background-color: var(--table-color);
    padding: 10px;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        inset: 8px;
        height: calc(100% - 16px);
        width: var(--width);
        border-radius: 25px;
        background-color: var(--primary-color);
        transition: all .3s ease;
        z-index: 1;
        transform: translateX(var(--translateX));
    }

    & input {
        display: none;
    }

    & label {
        text-align: center;
        z-index: 2;
    }

    & > * {
        cursor: pointer;
    }
}
</style>