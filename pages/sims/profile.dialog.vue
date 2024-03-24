<script setup lang="ts">
const { code } = defineProps<{
    code: string
}>()

defineEmits(['close'])

const { data: sim, refresh } = await useFetch<ISim>(`/api/sims/${code}`)
</script>

<template>
    <section class="sk-card sk-card--flex-column">
        <CopyValue :value="sim?.number ?? ''">
            <h2>{{ sim?.number }}</h2>
        </CopyValue>

        <div class="d-2-haft">
            <p v-if="sim?.provider">
                Proveedor:
                <SkLinkDialog
                    name="providers-profile"
                    :props="{ code: sim.provider.code }"
                    class="sk-link"
                >
                    <span class="badge-color" :style="{ backgroundColor: sim.provider.color }"></span>
                    {{ sim.provider.name  }}
                </SkLinkDialog>
            </p>
        </div>

        <p v-if="sim?.radio">
            Radio:
            <SkLinkDialog
                name="radios-profile"
                :props="{ code: sim.radio.code }"
                class="sk-link"
            >
                {{ sim.radio.imei  }}
            </SkLinkDialog>
        </p>
        <p v-if="sim?.radio?.client">
            Cliente:
            <NuxtLink
                :to="{ name: 'clients-profile', params: { code: sim.radio.client.code }  }"
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: sim.radio.client.color }"></span>
                {{ sim.radio.client.name }}
            </NuxtLink>
        </p>

        <ActionsDropdownSim 
            v-if="sim"
            :sim="sim"
            :refresh="refresh"
        />
    </section>
</template>