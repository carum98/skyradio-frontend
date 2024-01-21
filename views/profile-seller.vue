<script setup lang="ts">
const props = defineProps<{
    code: string
}>()

// data
const { data: seller, refresh } = await useFetch<ISeller>(`/api/sellers/${props.code}`)

const { navigateToAction } = useActions(refresh)

// methods
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

        <TableClients
            :path="`/api/clients?per_page=5&sellers[code][equal]=${code}`"
            hide-seller
        />
    </main>
</template>