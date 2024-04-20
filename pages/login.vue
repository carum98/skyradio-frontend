<script setup lang="ts">
import { FetchError } from 'ofetch'

const toast = useToast()

useHead({
    bodyAttrs: {
        class: 'login-page'
    }
})

definePageMeta({
  layout: 'login',
})

const router = useRouter()

async function onSubmit(e: Event){
    try {
        const formData = new FormData(e.target as HTMLFormElement)
        const params = Object.fromEntries(formData)

        await $fetch('/api/login', {
            method: 'POST',
            body: params
        })

        router.push('/')
    } catch (data) {
        let error = data as FetchError

        toast.open({
            title: 'Error!!',
            type: 'error',
            message: error.statusCode === 400 
                ? 'Correo o contraseña incorrectos'
                : 'Error al iniciar sesión',
        })
    }
}
</script>

<template>
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
            name="email"
            placeholder="Correo" 
        />
        <label>
            Contraseña
        </label>
        <input 
            class="sk-input"
            type="password"
            name="password"
            placeholder="Contraseña" 
        />
        <button type="submit" class="sk-button block">
            Iniciar sesión
        </button>
    </form>
</template>