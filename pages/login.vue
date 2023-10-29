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
    
    // Redirect to dashboard
    router.push('/')
}
</script>

<template>
    <main>
        <form class="sk-form" @submit.prevent="onSubmit">
            <label>
                Correo
            </label>
            <input 
                class="sk-input"
                type="email" 
                placeholder="Correo" 
                v-model="form.email"
            />
            <label>
                Contraseña
            </label>
            <input 
                class="sk-input"
                type="password"
                placeholder="Contraseña" 
                v-model="form.password" 
            />
            <button type="submit" class="sk-button block">
                Login
            </button>
        </form>
    </main>
</template>