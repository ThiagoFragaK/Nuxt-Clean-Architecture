<template>
    <ModalComponent 
        :modalTitle="productTitle"
        ref="modal"
    >
        <div v-if="isLoaded" class="card">
            <img :src="product.image" class="card-img-top mx-auto d-block small-img" :alt="product.title">
            <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text">{{ product.description }}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Category: {{ product.category }}</li>
                <li class="list-group-item">Price: ${{ product.price }}</li>
                <li class="list-group-item">Rate: {{ product.rating.rate }} ({{ product.rating.count }} avaliações)</li>
            </ul>
        </div>
        <LoadingComponent v-else class="mb-4" />
    </ModalComponent>
</template>

<script>
import FakerService from "@/services/FakerService.js";
import LoadingComponent from "../global/LoadingComponent.vue";
import ModalComponent from "../global/ModalComponent.vue";

export default {
    components: {
        LoadingComponent,
        ModalComponent,
    },
    data: () => ({
        isLoaded: false,
        product: {
            id: undefined,
            category: "",
            description: "",
            image: "",
            price: 0,
            rating: {
                rate: 0,
                count: 0,
            },
            title: "",
        },
    }),
    methods: {
        open(productId) {
            this.product.id = productId;
            this.$refs.modal.open();
            this.getProductById();
        },
        close() {
            this.$refs.modal.close();
        },
        getProductById() {
            this.isLoaded = false;
            FakerService.getProductByID(this.product.id)
                .then((response) => {
                    if(response.error !== undefined) {
                        return this.$notify({
                            title: "Product details",
                            text: response.error,
                            icon: "error"
                        });
                    }
                    this.product = response;
                })
                .finally(() => {
                    this.isLoaded = true;
                });
        },
    },
    computed: {
        productTitle() {
            return this.isLoaded ? this.product.title : "Loading product details..";
        }
    }
}
</script>

<style scoped>
.small-img {
    max-width: 200px;
    height: auto;
}
</style>