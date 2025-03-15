import { defineStore } from 'pinia';

export const useShoppingCartStore = defineStore('shoppingCart', {
    state: () => ({
        totalItens: [],
    }),
    getters: {
        shoppingCartCount: (state) => state.totalItens.length,
    },
    actions: {
        addItemToCart(productId) {
            const existingProduct = this.totalItens.find(id => id === productId);
            if (!existingProduct) {
                this.totalItens.push(productId);
            }
        },
        removeItemFromCart(productId) {
            this.totalItens = this.totalItens.filter(id => id !== productId);
        },
    },
});