<script setup lang="ts">
definePageMeta({
    name: 'clients-profile',
    pageTransition: false,
})

const chartType = ref('models')

const route = useRoute()

const code = route.params.code as string

// data
const { data: client, refresh } = await useFetch<IClient>(`/api/clients/${code}`)
const { data: stats, refresh: refreshStats } = await useFetch<IClientStats>(`/api/clients/${code}/stats`)
</script>

<template>
    <main>
        <section class="header-companies-profile mb-1">
            <div class="sk-card sk-card--flex-column">
                <div class="d-flex">
                    <SkAvatar 
                        v-if="client"  
                        :alt="client.name"
                        :color="client.color" 
                        class="mr-1"
                    />

                    <h2>{{ client?.name }}</h2>
                </div>

                <p v-if="client?.seller">
                    Vendedor:
                    <SkLinkModal
                        name="profile-seller"
                        :props="{ code: client.seller.code }"
                        class="sk-link"
                    >
                        {{ client.seller.name }}
                    </SkLinkModal> 
                </p>

                <p v-if="client?.modality">
                    Modalidad:
                    <SkLinkModal
                        name="profile-modality"
                        :props="{ code: client.modality.code }"
                        class="sk-link"
                    >
                        <span class="badge-color" :style="{ backgroundColor: client.modality.color }"></span>
                        {{ client.modality.name  }}
                    </SkLinkModal>
                </p>

                <ActionsDropdownClient
                    v-if="client"
                    :client="client"
                    :refresh="refresh"
                    show-logs
                />
            </div>

            <div v-if="stats">
                <SkSwitch 
                    class="mb-1"
                    v-model="chartType"
                    :items="[
                        { label: 'Modelos', value: 'models' },
                        { label: 'Provedores', value: 'providers' }
                    ]"
                ></SkSwitch>
                <SkChart
                    v-if="chartType === 'models'"
                    :data="stats.models" 
                />
                <SkChart 
                    v-if="chartType === 'providers'"
                    :data="stats.sims_providers"
                />
            </div>
        </section>
        <TableRadios 
            :path="`/api/clients/${code}/radios?per_page=7`"
            enable-table-actions
            enable-client-actions
            hide-client
            hide-stats-button
            @refresh="refreshStats"
        >
            <template #actions="{ openSwap, openRemove, openAdd }">
                <div class="table-actions">
                <button 
                    v-sk-tooltip="ActionsStatic.CHANGE.name"
                    class="button-actions" 
                    :style="{ '--color': ActionsStatic.CHANGE.color }"
                    @click="() => openSwap({ client, radio: null })"
                >
                    <span v-html="ActionsStatic.CHANGE.icon"></span>
                </button>
                <button 
                    v-sk-tooltip="ActionsStatic.REMOVE.name"
                    class="button-actions" 
                    :style="{ '--color': ActionsStatic.REMOVE.color }"
                    @click="() => openRemove({ client, radio: null })"
                >
                    <span v-html="ActionsStatic.REMOVE.icon"></span>
                </button>
                <button 
                    v-sk-tooltip="ActionsStatic.ADD.name"
                    class="button-actions"
                    :style="{ '--color': ActionsStatic.ADD.color }"
                    @click="() => openAdd(client)"
                >
                    <span v-html="ActionsStatic.ADD.icon"></span>
                </button>
            </div>
            </template>
        </TableRadios>
    </main>
</template>

<style>
.header-companies-profile {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 35px;
}
</style>

<style scoped>
.sk-avatar {
    view-transition-name: avatar;
}
</style>
