<script setup lang="ts">
import Chart from 'chart.js/auto'

type ChartData = {
    name: string
    color: string
    count: number
}

const props = defineProps<{
    data: ChartData[]
    showList?: boolean
}>()

// data
const canvas = ref<HTMLCanvasElement>()
let chart: Chart<"doughnut", number[], string>

// hooks
watch(() => props.data, () => {
    chart.data.labels = props.data.map(item => item.name)
    chart.data.datasets[0].data = props.data.map(item => item.count)
    chart.data.datasets[0].backgroundColor = props.data.map(item => item.color)

    chart.update()
})

// lifecycle
onMounted(() => {
    const ctx = canvas.value?.getContext('2d')

    if (!ctx) return

    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: props.data.map(item => item.name),
            datasets: [{
                data: props.data.map(item => item.count),
                backgroundColor: props.data.map(item => item.color),
                borderRadius: 10,
                spacing: 3,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.label || ''
                            const value = context.formattedValue || ''

                            return `${label}: ${value}`
                        }
                    }
                }
            },
            cutout: 60,
            borderColor: '#FFFFFF00',
        }
    })
})

onUnmounted(() => {
    chart.destroy()
})
</script>

<template>
    <div style="height: 200px; width: 200px; margin: auto;">
        <canvas ref="canvas"></canvas>
    </div>
    <div v-if="props.showList" class="mt-1">
        <ul class="list-group">
            <li
                v-for="item in props.data"
                :key="item.name"
                class="d-flex justify-content-between align-items-center"
            >
                <p>
                    <span class="badge-color mr-1" :style="{ backgroundColor: item.color }"></span>
                    {{ item.name }}
                </p>
                <span class="counter"> {{ item.count }}</span>
            </li>
        </ul>
    </div>
</template>