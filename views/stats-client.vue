<script setup lang="ts">
const chartType = ref('modalities')

const { data } = await useFetch<IClientsStats>(`/api/clients/stats/all`, {
    transform: (data: IClientsStats) => {
        // Add a random color to each item of sellers
        data.sellers.forEach(seller => seller.color = getRandomColor())

        return data
    }
})

function removeDuplicateObjects(arr: any[], property: string) {
  return [...new Map(arr.map(obj => [obj[property], obj])).values()];
}

const clients = computed(() => {
    const items = (data?.value?.clients || []).map(item => toRaw(item))

    const availableModels = removeDuplicateObjects(items.map(item => item.models).flat(), 'code')

    const models: {
        label: string
        backgroundColor: string
        data: number[]
    }[] = availableModels.map((model, index) => {
        return {
            label: model.name,
            backgroundColor: model.color,
            borderSkipped: false,
            borderRadius: {
                topLeft: 5,
                topRight: 5,
                bottomLeft: 5,
                bottomRight: 5
            },
            data: items.map(item => item.models.find(m => m.code === model.code)?.count || 0)
        }
    })

    return {
        labels: items.map(item => item.name),
        datasets: models
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
            <div v-if="chartType === 'radios'" style="height: 630px; overflow-y: scroll;">
                <SkBarHorizontal 
                    :label="clients.labels"
                    :datasets="clients.datasets"
                />
            </div>
        </div>
    </div>
</template>