<template>
    <div v-if="isLoaded" class="container">
        <div class="row row-cols-1 row-cols-md-2 g-4">
            <div 
                class="col" 
                v-for="product in productsList" 
                :key="product.id"
            >
                <ProductCard 
                    :product="product" 
                    @show-details="openProductModal" 
                />
            </div>
        </div>
    </div>
    <LoadingComponent v-else />
    <ProductModal ref="ProductModal" />
</template>

<script>
import FakerService from "@/services/FakerService.js";
import LoadingComponent from "@/components/global/LoadingComponent.vue";
import ProductModal from "@/components/products/ProductModal.vue";
import ProductCard from "@/components/products/ProductCard.vue";

export default {
    components: {
        LoadingComponent,
        ProductModal,
        ProductCard,
    },
    data: () => ({
        isLoaded: false,
        productsList: [],
        product: {
            id: undefined,
            category: "",
            description: "",
            image: "",
            price: undefined,
            rating: {
                rate: 0,
                count: 0,
            },
            title: "",
        },
    }),
    methods: {
        getProducts() {
            this.isLoaded = false;
            FakerService.getAllProducts()
                .then((response) => {
                    if(response.error !== undefined) {
                        return this.$notify({
                            title: "Products",
                            text: response.error,
                            icon: "error"
                        });
                    }
                    this.productsList = response;
                })
                .finally(() => {
                    this.isLoaded = true;
                });
        },
        openProductModal(productId) {
            this.$refs.ProductModal.open(productId);
        },
        showProduct() {
            this.isProductLoaded = true;
        }
    },
    mounted() {
        this.getProducts();
    }
};
</script>

<style>
    .fixed-card {
        height: 300px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .img-fixed {
        max-width: 100%;
        max-height: 100%;
        height: auto;
        object-fit: contain; 
    }

    .col-md-4 {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card-body {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>