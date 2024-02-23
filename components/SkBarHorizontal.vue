<script setup lang="ts">
import Chart from 'chart.js/auto'

const props = defineProps<{
    label: string[]
    datasets: {
        label: string
        backgroundColor: string
        data: number[]
    }[]
}>()

// data
const canvas = ref<HTMLCanvasElement>()

// lifecycle
onMounted(() => {
    const ctx = canvas.value?.getContext('2d')

    if (!ctx) return

    let chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: props.label,
            datasets: props.datasets
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            },
            elements: {
                bar: {
                    borderRadius: 5
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    display: false,
                    stacked: true
                }
            },
            indexAxis: 'y',
            responsive: true
        }
    })

    onUnmounted(() => {
        chart.destroy()
    })
})
</script>

<template>
    <div style="height: 400px; width: 600px; margin: auto;">
        <canvas ref="canvas"></canvas>
    </div>
</template>