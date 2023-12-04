<script setup lang="ts">
definePageMeta({
    name: 'sellers-profile'
})

const route = useRoute()

const { navigateToAction } = useActions(getData)

// data
const seller = ref<ISeller | null>()

// methods
async function getData() {
    const { data } = await useFetch<ISeller>(`/api/sellers/${route.params.code}`)
    seller.value = data.value
}

function openUpdate() {
    navigateToAction({
        name: 'update-seller',
        props: {
            seller: seller.value
        }
    })
}

function openRemove() {
    navigateToAction({
        name: 'remove-seller',
        props: {
            code: seller.value?.code
        }
    })
}

// lifecycle
onMounted(getData)
</script>

<template>
    <main>
        <section class="mb-1">
            <div class="sk-card sk-card--flex-column" style="width: 60%;">
                <h2>{{ seller?.name }}</h2>

                <SkDropdown 
                    class="ml-auto"
                    :options="[
                        {
                            key: 'edit',
                            ...ActionsStatic.UPDATE,
                            action: openUpdate
                        },
                        {
                            key: 'delete',
                            ...ActionsStatic.DELETE,
                            action: openRemove
                        }
                    ]"
                ></SkDropdown>
            </div>
        </section>

        <TableClients
            :path="`/api/clients?sellers[code][equal]=${route.params.code}`"
        />
    </main>
</template>