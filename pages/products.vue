<template>
    <div>
        <ProductComponent />
    </div>
</template>

<script>
    import ProductComponent from "@/components/products/ProductComponent.vue";
    export default {
        components: {
            ProductComponent,
        },
        props: {
            product: {
                type: Object,
                required: true,
            }
        },
        mounted() {
            console.log("Producsts")
        }
    }
</script>