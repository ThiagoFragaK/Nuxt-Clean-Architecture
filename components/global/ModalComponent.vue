<template>
    <div class="modal fade" :class="{ show: isVisible }" tabindex="-1" role="dialog" style="display: block;" v-if="isVisible" @click.self="handleBackdropClick">
        <div class="modal-dialog" :class="computedSizeClass" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div v-if="hideBtns" class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="close">{{ cancelBtn }}</button>
                    <button type="button" class="btn btn-primary" @click="$emit('confirm')">{{ confirmBtn }}</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show" v-if="isVisible"></div>
</template>
  
<script>
    export default {
        props: {
            modalTitle: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                required: false,
                default: 'md'
            },
            hideBtns: {
                type: Boolean,
                required: false,
                default: false,
            },
            confirmBtn: {
                type: String,
                required: false,
                default: 'OK'
            },
            cancelBtn: {
                type: String,
                required: false,
                default: 'Cancel'
            },
            closeOnBackdrop: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        data() {
            return {
                isVisible: false
            };
        },
        computed: {
            computedSizeClass() {
                return this.size === 'lg' ? 'modal-lg' : this.size === 'sm' ? 'modal-sm' : '';
            }
        },
        methods: {
            open() {
                this.isVisible = true;
                document.body.classList.add('modal-open');
            },
            close() {
                this.isVisible = false;
                document.body.classList.remove('modal-open');
            },
            handleBackdropClick() {
                if (this.closeOnBackdrop) {
                    this.close();
                }
            },
        }
    };
</script>
  
<style>
    .modal {
        display: block;
        background: rgba(0, 0, 0, 0.5);
    }
</style>
