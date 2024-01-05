<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

const { navigateToAction } = useActions(getData)

// data
const seller = ref<ISeller | null>()

// methods
async function getData() {
    const { data } = await useFetch<ISeller>(`/api/sellers/${props.code}`)
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
            <div class="sk-card sk-card--flex-column">
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

        <Suspense>
            <TableClients
                :path="`/api/clients?per_page=5&sellers[code][equal]=${code}`"
                hide-seller
            />
        </Suspense>
    </main>
</template>