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
                    <button 
                        type="button" 
                        class="btn btn-primary"
                        @click="$emit('show-details', product.id)"
                    >
                        See details
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-primary"
                        @click="console.log('Assim')"
                    >
                        <HeroIcon icon="ShoppingCartIcon" class="w-2 h-2"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeroIcon from "@/components/global/HeroIcon.vue";
    export default {
        props: {
            product: {
                type: Object,
                required: true,
            },
            showCartBtn: {
                type: Boolean,
                required: false,
                default: false,
            }
        },
        components: {
            HeroIcon,
        }
    }
</script>