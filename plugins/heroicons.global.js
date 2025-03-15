import { defineNuxtPlugin } from "#app";
import { defineComponent, h } from "vue";
import * as HeroIcons from "@heroicons/vue/24/solid";

export default defineNuxtPlugin((nuxtApp) => {
    const HeroIcon = defineComponent({
        props: {
            icon: { type: String, required: true }
        },
        render() {
            const Component = HeroIcons[this.icon];
            return Component ? h(Component, { ...this.$attrs }) : null;
        }
    });

    nuxtApp.vueApp.component("HeroIcon", HeroIcon);
});
