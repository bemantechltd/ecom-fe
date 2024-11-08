<template>
    <div :class="['load_products_block',{mobile_device:$device.isMobile}]">
        <div v-for="(item,index) in data" :key="index" class="product_item_block">            
            <ProductCardView :item="item" />
        </div>        
    </div>
</template>
<script>
import ProductCardView  from './ProductCardView'
export default {
    name: 'LoadProductsBlock',
    props: ['data'],
    components: {       
        ProductCardView
    }    
}
</script>
<style lang="scss" scoped>
    .load_products_block{
        display: flex;
        flex-wrap: wrap;        
        height: 460px;
        overflow-y: scroll;

        .product_item_block {
            // flex-grow: 1;
            position: relative;
            width: 33.33%;
            // height: 100px;            
        }
    }

    .mobile_device{
        .product_item_block {
            // flex-grow: 1;
            width: 50%;
        }
    }
</style>