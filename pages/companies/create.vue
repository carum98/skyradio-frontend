<script setup lang="ts">
function send(event: Event) {
    console.log(event)
}
</script>

<template>
    <form @submit.prevent="send">
        <input type="text" />
        <button type="submit">Submit</button>
    </form>
</template>