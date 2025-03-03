<template>
    <div>
        <Navbar />
        <br/>
        <div class="mx-4 my-2">
            <div class="card-body">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "@/components/global/NavbarComponent.vue";
    export default {
        components: {
            Navbar
        },
    };
</script>