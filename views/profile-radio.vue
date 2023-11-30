<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

// data
const radio = ref<IRadio | null>(null)

// methods
async function getData() {
    radio.value = await $fetch(`/api/radios/${props.code}`)
}

// lifecycle
onMounted(getData)
</script>

<template>
    <main v-if="radio">
        <section class="sk-card sk-card--flex-column" style="width: 600px;">
            <h2>{{ radio.imei }}</h2>

            <div class="d-2-haft">
                <p>
                    Nombre:
                    {{ radio.name }}
                </p>
                <p>
                    Serial:
                    {{ radio.serial ?? '-' }}
                </p>
            </div>

            <div class="d-2-haft">
                <p v-if="radio.model">
                    Modelo:
                    <SkLinkModal
                        name="profile-model"
                        :props="{ code: radio.model.code }"
                        class="sk-link"
                    >
                        <span class="badge-color" :style="{ backgroundColor: radio.model.color }"></span>
                        {{ radio.model.name  }}
                    </SkLinkModal>
                </p>
                <p v-if="radio.status">
                    Estado:
                    <SkLinkModal
                        name="profile-status"
                        :props="{ code: radio.status.code }"
                        class="sk-link"
                    >
                        <span class="badge-color" :style="{ backgroundColor: radio.status.color }"></span>
                        {{ radio.status.name  }}
                    </SkLinkModal>
                </p>
            </div>

            <div class="d-2-haft">
                <p v-if="radio.sim">
                    SIM:
                    <SkLinkModal
                        name="profile-sim"
                        :props="{ code: radio.sim.code }"
                        class="sk-link"
                    >
                        {{ radio.sim.number  }}
                    </SkLinkModal>
                </p>
                <p v-if="radio.sim?.provider">
                    Proveedor:
                    <SkLinkModal
                        name="profile-provider"
                        :props="{ code: radio.sim.provider.code }"
                        class="sk-link"
                    >
                        <span class="badge-color" :style="{ backgroundColor: radio.sim.provider.color }"></span>
                        {{ radio.sim.provider.name  }}
                    </SkLinkModal>
                </p>
            </div>

            <ActionsDropdownRadio 
                :radio="radio" 
                :refresh="getData"
            />
        </section>
    </main>
</template>