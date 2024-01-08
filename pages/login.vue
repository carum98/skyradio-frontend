<script setup lang="ts">
useHead({
    bodyAttrs: {
        class: 'login-page'
    }
})

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
        <form class="sk-form login-form" @submit.prevent="onSubmit">
            <img 
                src="/logo.png" 
                alt="Logo" 
                width="80" 
                height="80"
            />

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
                Iniciar sesión
            </button>
        </form>
    </main>

    <footer>
        Hecho con 💙 por <a href="https://carum.dev" target="_blank">@carum98</a>
    </footer>
</template>