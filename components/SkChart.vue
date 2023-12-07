<script setup lang="ts">
import Chart from 'chart.js/auto'

type ChartData = {
    name: string
    color: string
    count: number
}

const props = defineProps<{
    data: ChartData[]
}>()

const chart = ref<HTMLCanvasElement>()

onMounted(() => {
    const ctx = chart.value?.getContext('2d')

    if (!ctx) return

    new Chart(ctx, {
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
</script>

<template>
    <div style="height: 200px; width: 200px;">
        <canvas ref="chart"></canvas>
    </div>
</template>