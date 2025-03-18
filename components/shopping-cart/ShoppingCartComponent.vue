<template>
    <div v-if="isLoaded && shoppingCart.length > 0" class="container">
        <div class="row row-cols-1 row-cols-md-2 g-4">
            <p>Total items in cart: {{ cartItemCount }}</p>
            <p>Total price of the itens: {{ cartTotalPrice }}</p>
            <div 
                class="col" 
                v-for="product in productsList" 
                :key="product.id"
            >
                <ProductCard 
                    :product="product" 
                    :showCartBtn="false"
                    :showRemoveItemBtn="true"
                    @show-details="openProductModal"
                    @remove-item="setCartItems"
                />
            </div>
        </div>
    </div>
    <div v-else-if="isLoaded" class="d-flex flex-column align-items-center justify-content-center p-4 border rounded">
        <HeroIcon icon="ShoppingCartIcon" class="icon-size"/>
        <h3>Your Shopping cart is empty.</h3>
    </div>
    <LoadingComponent v-else />
    <ProductModal ref="ProductModal" />
</template>

<script>
import { useShoppingCartStore } from "@/stores/shoppingCart";
import PriceFormatter from "@/utils/PriceFormatter.js"
import LoadingComponent from "@/components/global/LoadingComponent.vue";
import ProductModal from "@/components/products/ProductModal.vue";
import ProductCard from "@/components/products/ProductCard.vue";
import FakerService from "@/services/FakerService.js"

export default {
    components: {
        LoadingComponent,
        ProductModal,
        ProductCard,
    },
    data: () => ({
        isLoaded: false,
        cartStore: useShoppingCartStore(),
        shoppingCart: {
            items: [],
            length: 0,
            price: 0,
        },
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
        setCartItems() {
            this.resetCart();
            this.shoppingCart.items = this.cartStore.getCartItens; 
            this.shoppingCart.length =  this.cartStore.shoppingCartCount;
            this.getShoppingCartProducts();
        },
        getShoppingCartProducts() {
            if(this.shoppingCart.length <= 0) {
                this.isLoaded = true;
                return this.$notify({
                    title: "Shopping cart",
                    text: "There're no itens in your cart.",
                    icon: "error"
                });
            }

            this.isLoaded = false;
            this.shoppingCart.items.forEach((id) => {
                FakerService.getProductByID(id)
                    .then((response) => {
                        if(response.error !== undefined) {
                            return this.$notify({
                                title: "Products",
                                text: response.error,
                                icon: "error"
                            });
                        }
                        
                        this.shoppingCart.price += response.price;
                        this.productsList.push(response);
                    });                    
            })
            this.isLoaded = true;
        },
        openProductModal(productId) {
            this.$refs.ProductModal.open(productId);
        },
        showProduct() {
            this.isProductLoaded = true;
        },
        resetCart() {
            this.shoppingCart = {
                items: [],
                length: 0,
                price: 0,
            };
            this.productsList = [];
        }
    },
    computed: {
        cartTotalPrice() {
            return `$ ${PriceFormatter.FormatPrice(this.shoppingCart.price)}`;
        },
        cartItemCount() {
            return this.shoppingCart.length;
        }
    },
    mounted() {
        this.setCartItems();
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