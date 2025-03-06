<template>
    <div>
        <ProductComponent />
    </div>
</template>

<script>
    import ProductComponent from "~/components/products/ProductModal.vue";
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