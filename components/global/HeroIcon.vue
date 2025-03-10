<template>
    <component :is="iconComponent" v-bind="$attrs" class="w-6 h-6" />
</template>
  
<script>
    import * as HeroIcons from "@heroicons/vue/24/solid";

    export default {
        props: {
            icon: {
                type: String,
                required: true
            }
        },
        computed: {
            iconComponent() {
                return HeroIcons[this.icon] || null;
            }
        }
    };
</script>  