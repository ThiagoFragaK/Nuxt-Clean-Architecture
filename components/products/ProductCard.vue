<template>
    <div class="card fixed-card">
        <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img :src="product.image" class="img-fixed rounded-start" :alt="product.title">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ product.title }}</h5>
                    <p class="card-text text-truncate">{{ product.description }}</p>
                    <p class="card-text">
                        <small class="text-body-secondary">Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</small>
                    </p>
                    <p class="card-text"><strong>Price: ${{ product.price }}</strong></p>
                    <div class="d-flex gap-2">
                        <div class="col-9">
                            <button 
                                type="button" 
                                class="btn btn-primary w-100"
                                @click="$emit('show-details', product.id)"
                            >
                                See details
                            </button>
                        </div>
                        <div class="col-3">
                            <button 
                                type="button" 
                                class="btn btn-primary cart-btn"
                                @click="handleItemInCart(product.id)"
                            >
                                <HeroIcon v-if="isProductInCart(product.id)" icon="XMarkIcon" class="icon-size"/>
                                <HeroIcon v-else icon="ShoppingCartIcon" class="icon-size"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useShoppingCartStore } from "@/stores/shoppingCart";
    import HeroIcon from "@/components/global/HeroIcon.vue";
    export default {
        props: {
            product: {
                type: Object,
                required: true,
            },
        },
        components: {
            HeroIcon,
        },
        data: () => ({
            shoppingCart: useShoppingCartStore(),
        }),
        methods: {
            handleItemInCart(productId) {
                if(this.isProductInCart(productId)) {
                    this.$notify({
                        title: "Shopping cart",
                        text: "Item removed from your cart.",
                        icon: "success"
                    });
                    this.shoppingCart.removeItemFromCart(productId);
                    return this.$emit("remove-item");
                }

                this.$notify({
                    title: "Shopping cart",
                    text: "Item added from your cart.",
                    icon: "success"
                });
                this.shoppingCart.addItemToCart(productId);
            },
            isProductInCart(productId) {
                return this.cartItens.find(id => id === productId);
            },
        },
        computed: {
            cartItens() {
                return this.shoppingCart.totalItens;
            },
        }
    }
</script>

<style>
    .cart-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .icon-size {
        width: 1.5rem;
        height: 1.5rem;
    }
</style>