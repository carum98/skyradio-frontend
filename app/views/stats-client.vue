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
    const availabelProviders = removeDuplicateObjects(items.map(item => item.providers).flat(), 'code')

    const models = availableModels.map((model) => ({   
        label: model.name,
        backgroundColor: model.color,
        data: items.map(item => item.models.find(m => m.code === model.code)?.count || 0)
    }))

    const providers = availabelProviders.map((provider) => ({   
        label: provider.name,
        backgroundColor: provider.color,
        data: items.map(item => item.providers.find(p => p.code === provider.code)?.count || 0)
    }))

    return {
        labels: items.map(item => item.name),
        models,
        providers
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
                    { label: 'Modelos', value: 'models' },
                    { label: 'Proveedores', value: 'providers' }
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
            <div v-if="chartType === 'models'" style="height: 630px; overflow-y: scroll;">
                <SkBarHorizontal 
                    :label="clients.labels"
                    :datasets="clients.models"
                />
            </div>
            <div v-if="chartType === 'providers'" style="height: 630px; overflow-y: scroll;">
                <SkBarHorizontal 
                    :label="clients.labels"
                    :datasets="clients.providers"
                />
            </div>
        </div>
    </div>
</template>