<script setup lang="ts">
definePageMeta({
  layout: false,
})

const router = useRouter()

const form = reactive({
    email: '',
    password: ''
})

async function onSubmit(e: Event){
    e.preventDefault()

    const data = await useFetch('/api/login', {
        method: 'POST',
        body: form
    })

    console.log(data)
    
    // Redirect to dashboard
    router.push('/')
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <input type="email" placeholder="Email" v-model="form.email" />
        <input type="password" placeholder="Password" v-model="form.password" />
        <button type="submit">Login</button>
    </form>
</template>