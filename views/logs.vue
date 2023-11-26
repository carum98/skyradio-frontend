<script setup lang="ts">
const props = defineProps<{
    path: string,
}>()

const router = useRouter()
const routerModal = useRouterModal()

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
                const a = document.createElement('a')
                a.href = `?name=profile-radio&code=${log.values.radio?.code}`
                a.dataset.type = 'modal'
                a.innerText = log.values.radio?.imei ?? ''

                message = message.replace(match, a.outerHTML)
            }

            if (key === 'client') {
                const route = router.resolve({
                    name: 'clients-profile',
                    params: {
                        code: log.values.client?.code
                    }
                })

                const a = document.createElement('a')
                a.href = route.path
                a.innerText = log.values.client?.name ?? ''

                message = message.replace(match, a.outerHTML)
            }

            if (key === 'sim') {
                const a = document.createElement('a')
                a.href = `?name=profile-sim&code=${log.values.sim?.code}`
                a.dataset.type = 'modal'
                a.innerText = log.values.sim?.number ?? ''

                message = message.replace(match, a.outerHTML)
            }
        })
    }

    return message
}

function addListeners() {
    links = Array.from(list.value?.querySelectorAll('a[href]') ?? [])

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
    const isModal = a.dataset.type === 'modal'

    const path = new URL(a.href)

    if (isModal) {
        routerModal.push({
            name: path.searchParams.get('name') as 'profile-radio' | 'profile-sim',
            props: Object.fromEntries(path.searchParams.entries())
        })
    } else {
        router.push(path.pathname)
    }
}

// lifecycle
onMounted(async () => {
    const { data } = await $fetch<ITable<ILog>>(props.path)

    items.value = data.map((log) => ({
        ...log,
        created_at: formatDate(new Date(log.created_at)),
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
    <ul ref="list" class="list-logs">
        <li class="list-logs__item" v-for="(log, index) in items" :key="index">
            <div class="list-logs__item__detial">
                <p>{{ log.created_at }}</p>
                <p>{{ log.user?.name }}</p>
            </div>

            <p class="list-logs__item__message" v-html="log.message"></p>
        </li>
    </ul>
</template>
