<template>
    <div class="item_view_block">
        <div class="img">
            <nuxt-img v-if="item.product_photo_info && item.product_photo_info[0] && item.product_photo_info[0].product_photo_data"
                format="webp"
                :src="item.product_photo_info[0].product_photo_data.content"
            />
            <img v-else class="empty-img" src="~/assets/images/empty-product.png" />
        </div>
        <div class="info">
            <div class="title text_overflow max_one_line_allow">
                {{ item.product_title }}
            </div>
            <div class="quantity">
                <template v-if="$parent.$parent.edit_receipt">
                    <QuantityActionBlock :quantity="quantity" />
                </template>
                <template v-else>{{ item.qty }}</template> x <PriceViewBlock :data="item.price" />
                <template v-if="$parent.$parent.edit_receipt && $parent.data.length>1">
                    <span class="ml-2" @click="removeItem"><i class="fa fa-trash-alt"></i></span>
                </template>
            </div>
        </div>
        <div class="price">
            <PriceViewBlock :data="total_price" />
        </div>
    </div>
</template>
<script>
import QuantityActionBlock from '@/components/content_display/QuantityActionBlock'
import PriceViewBlock from '@/components/content_display/price/ViewBlock'
import { mapMutations } from 'vuex'
export default {
    name: 'ItemViewBlock',
    props: ['item','index'],
    components: {
        QuantityActionBlock,
        PriceViewBlock
    },    
    data(){
        return {
            min_qty: 1,
            max_qty: 100,
            exist_qty: this.item.qty,
            quantity: this.item.qty
        }
    },
    computed: {
        total_price: function(){
            return (this.item.price * this.item.qty).toFixed(2)
        }
    },
    methods: {
        ...mapMutations({
            selOrderData: 'order_info/SEL_DATA',
            reconfigOrderData: 'order_info/RECONFIG_DATA'
        }),
        removeItem: async function(){
            let obj = {                
                'index': this.index,
                'remove': true
            }
            await this.reconfigOrderData(obj)
        },
        quantity_submit: async function(val){
            if(val<this.min_qty || isNaN(val)) this.quantity = this.min_qty
            else if(this.max_qty && val>this.max_qty) this.quantity = this.max_qty
            else this.quantity = val

            // let obj = Object.assign({}, this.$store.state.order_info.sel_data);
            // obj.order_items_info[this.index].qty = 1            
            let obj = {
                'field': 'order_items_info',
                'index': this.index,
                'qty': this.quantity
            }
            await this.reconfigOrderData(obj)
            // this.selOrderData(obj)                        

            // let total_amount = this.item.price * this.quantity
            // let total_payable = this.item.price * this.quantity
            // this.$parent.$parent.data.order_items_info[this.index].qty = this.quantity
            // this.$parent.$parent.data.total_amount = total_amount
            // this.$parent.$parent.data.total_payable = total_payable
        }
    }
}
</script>
<style scoped>
    .item_view_block{
        display: flex;
    }    
    .img{
        width: 60px;
        height: 40px;
        margin-right: 10px;
        border: 1px solid #ddd;
        border-radius: 3px;
        background-color: #eee;
    }
    .img img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .img img.empty-img{
        padding: 5px
    }
    .info{
        margin-right: 10px;
    }
    .info > .title{
        font-size: 13px;
    }
    .info > .quantity{
        margin-top: 3px;
        font-size: 12px;
    }
    .price{
        margin-left: auto;
        font-size: 13px;        
    }
</style>