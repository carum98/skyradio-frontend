<script setup lang="ts">
const chartType = ref('modalities')

const { data } = await useFetch<IClientsStats>(`/api/clients/stats/all`, {
    transform: (data: IClientsStats) => {
        // Add a random color to each item of sellers
        data.sellers.forEach(seller => seller.color = getRandomColor())

        return data
    }
})
</script>

<template>
    <div>
        <div class="d-flex justify-content-center mb-1">
            <SkSwitch 
                v-model="chartType"
                :items="[
                    { label: 'Modalidades', value: 'modalities' },
                    { label: 'Vendedores', value: 'sellers' },
                    { label: 'Radios', value: 'radios' }
                ]"
            ></SkSwitch>
        </div>
        <div v-if="data">
            <SkChart
                v-if="chartType === 'sellers'"
                :data="data.sellers" 
                show-list
            />
            <SkChart 
                v-if="chartType === 'modalities'"
                :data="data.modality"
                show-list
            />
        </div>
    </div>
</template>