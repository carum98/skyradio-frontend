<script setup lang="ts">
const props = defineProps<{
    onCreated: (company: ICompany) => void
}>()

async function send(event: Event) {
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const name = data.get("name") as string;

    const company = await $fetch<ICompany>('/api/companies', {
        method: 'POST',
        body: {
            name,
            modality_code: "7b91a1",
            seller_code: "3d2637"
        },
        onRequestError(context) {
            console.log(context.response)
        }
    })

    props.onCreated(company)
}
</script>

<template>
    <form @submit.prevent="send">
        <input name="name" type="text" />
        <button type="submit">Submit</button>
    </form>
</template>