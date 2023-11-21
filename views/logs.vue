<script setup lang="ts">
import type { NuxtApp } from '#app'

const props = defineProps<{
    path: string,
    app: NuxtApp
}>()

// data
let links: HTMLAnchorElement[] = []

const list = ref<HTMLUListElement | null>(null)
const items = ref<ILog[]>([])

// methods
function message(log: ILog) {
    let message = log.message

    const matches = message.match(/{{\s*[\w\.]+\s*}}/g)

    if (matches) {
        matches.forEach((match) => {
            const key = match.replace(/[{}]/g, '').trim()

            if (key === 'radio') {
                const route = props.app.$router.resolve({
                    name: 'radios-profile',
                    params: {
                        code: log.values.radio?.code
                    }
                })

                message = message.replace(match, `<a href="${route.path}">${log.values.radio?.imei}</a>`)
            }

            if (key === 'client') {
                const route = props.app.$router.resolve({
                    name: 'clients-profile',
                    params: {
                        code: log.values.client?.code
                    }
                })

                message = message.replace(match, `<a href="${route.path}">${log.values.client?.name}</a>`)
            }

            if (key === 'sim') {
                message = message.replace(match, `${log.values.sim?.number}`)
            }
        })
    }

    return message
}

function addListeners() {
    links = Array.from(list.value?.querySelectorAll('a[href^="/"]') ?? [])

    links.forEach((link) => {
        link.addEventListener('click', navigate)
    })
}

function removeListeners() {
    links.forEach((link) => {
        link.removeEventListener('click', navigate)
    })
}

function navigate(event: Event) {
    event.preventDefault()

    const a = event.target as HTMLAnchorElement
    const path = new URL(a.href).pathname

    props.app.$router.push(path)
}

// lifecycle
onMounted(async () => {
    const { data } = await $fetch<ITable<ILog>>(props.path)

    items.value = data.map((log) => ({
        ...log,
        message: message(log)
    }))

    nextTick(() => {
        removeListeners()
        addListeners()
    })
})

onUnmounted(() => {
    removeListeners()
})
</script>

<template>
    <ul ref="list">
        <li v-for="(log, index) in items" :key="index">
            <p v-html="log.message"></p>

            <div>
                <p>{{ log.created_at }}</p>
                <p>{{ log.user?.name }}</p>
            </div>
        </li>
    </ul>
</template>