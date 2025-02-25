<template>
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
    <LoadingComponent v-else />
</template>
<script>
import FakerService from "@/services/FakerService.js";
import LoadingComponent from "../global/LoadingComponent.vue";
export default {
    components: {
        LoadingComponent
    },
    props: {
        productID: {
            type: Number,
            required: true,
        },
    },
    data: () => ({
        isLoaded: true,
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
        getProductById() {
            this.isLoaded = false;
            FakerService.getProductByID(this.productID)
                .then((response) => {
                    console.log(response);
                    this.product = response;
                })
                .finally(() => {
                    this.isLoaded = true;
                });
        },
    },
    mounted() {
        console.log(this.productID)
        this.getProductById();
    }
}
</script>

<style scoped>
.small-img {
    max-width: 200px;
    height: auto;
}
</style>