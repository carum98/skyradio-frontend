<script setup lang="ts">
const { code } = defineProps<{
    code: string
}>()

defineEmits(['close'])

const { data: radio, refresh } = await useFetch<IRadio>(`/api/radios/${code}`)
</script>

<template>
    <section class="sk-card sk-card--flex-column">
        <CopyValue :value="radio?.imei ?? ''">
            <h2>{{ radio?.imei }}</h2>
        </CopyValue>

        <div class="d-2-haft">
            <p>
                Nombre:
                {{ radio?.name }}
            </p>
        </div>

        <div class="d-2-haft">
            <p v-if="radio?.model">
                Modelo:
                <SkLinkDialog
                    name="models-profile"
                    :props="{ code: radio.model.code }"
                    class="sk-link"
                >
                    <span class="badge-color" :style="{ backgroundColor: radio.model.color }"></span>
                    {{ radio.model.name  }}
                </SkLinkDialog>
            </p>
            <p v-if="radio?.status">
                Estado:
                <SkLinkDialog
                    name="status-profile"
                    :props="{ code: radio.status.code }"
                    class="sk-link"
                >
                    <span class="badge-color" :style="{ backgroundColor: radio.status.color }"></span>
                    {{ radio.status.name  }}
                </SkLinkDialog>
            </p>
        </div>

        <div class="d-2-haft">
            <p v-if="radio?.sim">
                SIM:
                <SkLinkDialog
                    name="sims-profile"
                    :props="{ code: radio.sim.code }"
                    class="sk-link"
                >
                    {{ radio.sim.number  }}
                </SkLinkDialog>
            </p>
            <p v-if="radio?.sim?.provider">
                Proveedor:
                <SkLinkDialog
                    name="providers-profile"
                    :props="{ code: radio.sim.provider.code }"
                    class="sk-link"
                >
                    <span class="badge-color" :style="{ backgroundColor: radio.sim.provider.color }"></span>
                    {{ radio.sim.provider.name  }}
                </SkLinkDialog>
            </p>
        </div>

        <p v-if="radio?.client">
            Cliente:
            <NuxtLink
                :to="{ name: 'clients-profile', params: { code: radio.client.code }  }"
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: radio.client.color }"></span>
                {{ radio.client.name }}
            </NuxtLink>
        </p>

        <ActionsDropdownRadio 
            v-if="radio"
            :radio="radio" 
            :refresh="refresh"
        />
    </section>
</template>