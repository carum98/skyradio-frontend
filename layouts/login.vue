<script setup lang="ts">
useHead({
    bodyAttrs: {
        class: 'login-page'
    }
})
</script>

<template>
    <main>
        <slot />
    </main>

    <footer>
        <p>Plaforna para uso interno de <a href="https://skydatalatam.com" target="_blank">SkyData</a></p>
        <p class="mb-1">Desarrollado por <a href="https://carum.dev" target="_blank">Carlos Umaña</a></p>

        <a href="https://play.google.com/store/apps/details?id=com.skydata.skyradio" target="_blank" aria-label="google play" title="Descargar aplicación en Google Play">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 256 283"><path fill="#EA4335" d="M119.553 134.916L1.06 259.061a32.14 32.14 0 0 0 47.062 19.071l133.327-75.934z"/><path fill="#FBBC04" d="M239.37 113.814L181.715 80.79l-64.898 56.95l65.162 64.28l57.216-32.67a31.345 31.345 0 0 0 0-55.537z"/><path fill="#4285F4" d="M1.06 23.487A30.565 30.565 0 0 0 0 31.61v219.327a32.333 32.333 0 0 0 1.06 8.124l122.555-120.966z"/><path fill="#34A853" d="m120.436 141.274l61.278-60.483L48.564 4.503A32.847 32.847 0 0 0 32.051 0C17.644-.028 4.978 9.534 1.06 23.399z"/></svg>
        </a>

        <a href="https://appgallery.huawei.com/app/C110897283" target="_blank" aria-label="appgallery" title="Descargar aplicación en AppGallery" style="margin: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 36 36"><defs><linearGradient id="a" x1="18" x2="18" y1="0" y2="36" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#FB6361"/><stop offset="100%" stop-color="#ED3E45"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path fill="url(#a)" d="M10.101 0C2.705 0 0 2.705 0 10.099v15.802C0 33.295 2.705 36 10.101 36h15.793C33.29 36 36 33.295 36 25.901V10.099C36 2.705 33.295 0 25.899 0Z" style="fill:url(#a)"/><path fill="#fff" d="M15.703 20.88h1.445l-.725-1.687zm-.356.85-.429.98h-.976L16.018 18h.844l2.068 4.71h-1.003l-.423-.98zm15.71.977H32V18h-.944zM27.3 20.685h1.74v-.858H27.3v-.965h2.525v-.859h-3.468v4.707h3.559v-.859H27.3Zm-3.749.556L22.482 18h-.78l-1.07 3.24-1.041-3.237h-1.018l1.643 4.71h.791l1.072-3.094 1.071 3.094h.798l1.639-4.71h-.992Zm-11.05-.543c0 .766-.38 1.175-1.072 1.175-.694 0-1.077-.42-1.077-1.208v-2.662h-.956v2.695c0 1.325.736 2.085 2.02 2.085 1.297 0 2.04-.774 2.04-2.125V18h-.955zM7.115 18h.956v4.713h-.956V20.8H4.956v1.914H4V18h.956v1.901h2.16zM18 12c-3.309 0-6-2.692-6-6h.848A5.158 5.158 0 0 0 18 11.152 5.158 5.158 0 0 0 23.152 6H24c0 3.308-2.692 6-6 6"/></g></svg>
        </a>

        <a href="https://apps.apple.com/cr/app/skyradio/id6499509341" target="_blank" aria-label="app store" title="Descargar aplicación en App Store">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256"><defs><linearGradient id="logosAppleAppStore0" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#17C9FB"/><stop offset="100%" stop-color="#1A74E8"/></linearGradient></defs><path fill="url(#logosAppleAppStore0)" d="M56.064 0h143.872C230.9 0 256 25.1 256 56.064v143.872C256 230.9 230.9 256 199.936 256H56.064C25.1 256 0 230.9 0 199.936V56.064C0 25.1 25.1 0 56.064 0"/><path fill="#FFF" d="m82.042 185.81l.024.008l-8.753 15.16c-3.195 5.534-10.271 7.43-15.805 4.235c-5.533-3.195-7.43-10.271-4.235-15.805l6.448-11.168l.619-1.072c1.105-1.588 3.832-4.33 9.287-3.814c0 0 12.837 1.393 13.766 8.065c0 0 .126 2.195-1.351 4.391m124.143-38.72h-27.294c-1.859-.125-2.67-.789-2.99-1.175l-.02-.035l-29.217-50.606l-.038.025l-1.752-2.512c-2.872-4.392-7.432 6.84-7.432 6.84c-5.445 12.516.773 26.745 2.94 31.046l40.582 70.29c3.194 5.533 10.27 7.43 15.805 4.234c5.533-3.195 7.43-10.271 4.234-15.805l-10.147-17.576c-.197-.426-.539-1.582 1.542-1.587h13.787c6.39 0 11.57-5.18 11.57-11.57c0-6.39-5.18-11.57-11.57-11.57m-53.014 15.728s1.457 7.411-4.18 7.411H48.092c-6.39 0-11.57-5.18-11.57-11.57c0-6.39 5.18-11.57 11.57-11.57h25.94c4.188-.242 5.18-2.66 5.18-2.66l.024.012l33.86-58.648l-.01-.002c.617-1.133.103-2.204.014-2.373l-11.183-19.369c-3.195-5.533-1.299-12.61 4.235-15.804c5.534-3.195 12.61-1.3 15.805 4.234l5.186 8.983l5.177-8.967c3.195-5.533 10.271-7.43 15.805-4.234c5.534 3.195 7.43 10.27 4.235 15.804l-47.118 81.61c-.206.497-.269 1.277 1.264 1.414h28.164l.006.275s16.278.253 18.495 15.454"/></svg>
        </a>
    </footer>
</template>