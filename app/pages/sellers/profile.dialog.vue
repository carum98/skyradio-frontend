<script setup lang="ts">
const { code } = defineProps<{
    code: string
}>()

defineEmits(['close'])

const dialog = useDialogs()

// data
const { data: seller, refresh } = await useFetch<ISeller>(`/api/sellers/${code}`)

// methods
function openUpdate(seller: ISeller) {
    dialog.push({
        name: 'sellers-form',
        props: {
            seller
        },
        listeners: {
            onRefresh: refresh
        }
    })
}

function openRemove(seller: ISeller) {
    dialog.confirmRemove({
        name: 'sellers',
        code: seller.code,
        callback: refresh
    })
}
</script>

<template>
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
</template>