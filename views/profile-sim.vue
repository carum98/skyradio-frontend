<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

// data
const sim = ref<ISim | null>(null)

// methods
async function getData() {
    sim.value = await $fetch(`/api/sims/${props.code}`)
}

// lifecycle
onMounted(getData)
</script>

<template>
    <main v-if="sim">
        <section class="sk-card sk-card--flex-column" style="width: 600px;">
            <h2>{{ sim.number }}</h2>

            <div class="d-2-haft">
                <p v-if="sim.provider">
                    Proveedor:
                    <SkLinkModal
                        name="profile-provider"
                        :props="{ code: sim.provider.code }"
                        class="sk-link"
                    >
                        <span class="badge-color" :style="{ backgroundColor: sim.provider.color }"></span>
                        {{ sim.provider.name  }}
                    </SkLinkModal>
                </p>
                <p>
                    Serial:
                    {{ sim.serial ?? '-' }}
                </p>
            </div>

            <div class="d-2-haft" v-if="sim.radio">
                <p>
                    Radio:
                    <SkLinkModal
                        name="profile-radio"
                        :props="{ code: sim.radio.code }"
                        class="sk-link"
                    >
                        {{ sim.radio.imei  }}
                    </SkLinkModal>
                </p>
                <p v-if="sim.radio.client">
                    Cliente:
                    <NuxtLink
                        :to="{ name: 'clients-profile', params: { code: sim.radio.client.code }  }"
                        class="sk-link"
                    >
                       <span class="badge-color" :style="{ backgroundColor: sim.radio.client.color }"></span>
                        {{ sim.radio.client.name }}
                    </NuxtLink>
                </p>
            </div>

            <ActionsDropdownSim 
                :sim="sim"
                :refresh="getData"
            />
        </section>
    </main>
</template>