<script setup lang="ts">
import Chart from 'chart.js/auto'

const chart = ref<HTMLCanvasElement>()

onMounted(() => {
    const ctx = chart.value?.getContext('2d')

    if (!ctx) return

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                label: 'Cantidad',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
            }],

        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Modelos'
                }
            }
        }
    })
})
</script>

<template>
    <div style="width: 250px;">
        <canvas ref="chart"></canvas>
    </div>
</template>