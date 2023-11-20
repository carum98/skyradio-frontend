<script setup lang="ts">
const props = defineProps<{
    path: string
}>()

// data
const items = ref<ILog[]>([])

// methods
onMounted(async () => {
    const { data } = await $fetch<ITable<ILog>>(props.path)

    items.value = data
})
</script>

<template>
    <ul>
        <li v-for="(log, index) in items" :key="index">
            <p>{{ log.message }}</p>

            <div>
                <p>{{ log.created_at }}</p>
                <p>{{ log.user?.name }}</p>
            </div>
        </li>
    </ul>
</template>