<script setup lang="ts">
definePageMeta({
    name: 'clients-profile'
})

const route = useRoute()

const code = route.params.code as string

// data
const { data: client, refresh } = await useFetch<IClient>(`/api/clients/${code}`)
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
                    <NuxtLink
                        :to="{ name: 'sellers-profile', params: { code: client.seller.code } }"
                        class="sk-link"
                    >
                        {{ client.seller.name }}
                    </NuxtLink> 
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
        </section>
        <TableRadios 
            :path="`/api/clients/${code}/radios`"
            enable-client-actions
            hide-client
        >
            <template #actions="{ openSwap, openRemove, openAdd }">
                <div class="table-actions">
                <button 
                    class="button-actions" 
                    :style="{ '--color': ActionsStatic.CHANGE.color }"
                    @click="() => openSwap({ client, radio: null })"
                >
                    <span v-html="ActionsStatic.CHANGE.icon"></span>
                </button>
                <button 
                    class="button-actions" 
                    :style="{ '--color': ActionsStatic.REMOVE.color }"
                    @click="() => openRemove({ client, radio: null })"
                >
                    <span v-html="ActionsStatic.REMOVE.icon"></span>
                </button>
                <button 
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
    grid-template-columns: 2fr 1fr;
    gap: 25px;
}
</style>
