<template>
    <div class="cart_item_list_view">
        <template v-if="$store.state.cart_info.total_cart_items>0">
            <template v-for="(list,id) in $store.state.cart_info.cart_items">
                <template v-for="(item,tid) in list">
                    <div :id="'item-' + id + '-' + tid" :key="'ci-' + id + '-' + tid" class="item">
                        <div class="img">
                            <template v-if="item.product_image">
                                <clazy-load :src="item.product_image">
                                    <img :src="item.product_image" :title="item.product_title" :alt="item.product_title">
                                    <div class="preloader" slot="placeholder">
                                        <img src="/_ipx/images/logo.png" title="Preloader image" alt="Preloader image" />
                                    </div>
                                </clazy-load>
                            </template>
                            <template v-else>
                                <clazy-load src="@/assets/images/empty-product.png">
                                    <img class="empty-img" src="@/assets/images/empty-product.png" title="Empty Product" alt="Empty Product">
                                    <div class="preloader" slot="placeholder">
                                        <img src="/_ipx/images/logo.png" title="Preloader image" alt="Preloader image"/>
                                    </div>
                                </clazy-load>
                            </template>
                        </div>
                        <div class="info">
                            <div class="top_section">
                                <div class="product_info">
                                    <div class="title text_overflow max_one_line_allow">
                                        <nuxt-link :to="{path: '/'+ $store.state.product_dtl_path + '/' + item.product_slug}">{{ item.product_title }}</nuxt-link>                                    
                                    </div>
                                    <div class="price_type">{{ item.price_type }}</div>
                                </div>
                                <div class="del_btn" @click="removeCartItem(id,tid)"><i class="fa fa-trash"></i></div>
                            </div>
                            <div class="bottom_section">
                                <PriceUpdateBlock :product_id="id" :price_type_id="tid" :item="item" />
                            </div>
                        </div>
                    </div>
                </template>
            </template>
        </template>
        <template v-else>
            <EmptyCartBlock />
        </template>
    </div>
</template>
<script>
// import PriceViewBlock from '~/components/content_display/price/ViewBlock'
import PriceUpdateBlock from './price/PriceUpdateBlock'
import EmptyCartBlock from './EmptyCartBlock'
import { mapMutations } from 'vuex'
import $ from 'jquery'
export default {
    name: 'CatItemListViewBlock',
    components: {
        // PriceViewBlock,
        PriceUpdateBlock,
        EmptyCartBlock
    },
    mounted(){
        // get total cart amount
        this.total_cart_amount()
    },
    methods: {
        ...mapMutations({
            update_cart_item_quantity: 'cart_info/UPDATE_CART_ITEMS_QUANTITY',
            remove_cart_item: 'cart_info/REMOVE_CART_ITEM',
            total_cart_amount: 'cart_info/TOTAL_CART_AMOUNT'
        }),
        async removeCartItem(id,tid){
            let obj = {
                id: id,
                ptid: tid
            }
            await this.remove_cart_item(obj)
            
            this.total_cart_amount()            
            
            $('#item-' + id + '-' + tid).remove();

            // this.$toast.success('Item removed from cart', {icon: "Success"});
            this.$notify.success({
                title: 'Success',
                message: 'Item removed from cart',
                position: 'bottomLeft',
                transitionIn: 'bounceInRight',
                transitionOut: 'fadeOutLeft',
                timeout: 1500
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .cart_item_list_view > .item{
        display: flex;
        width: 100%;
        padding: 10px 15px;
        border-bottom: 1px solid #ddd;
    }
    .cart_item_list_view > .item .img{
        align-self: center;
        width: 60px;
        height: 50px;
        /* background-color: #eee; */
        border: 1px solid #ddd;
    }
    .img .loaded,
    .img .loading,
    .img .preloader{
        width: 100%; height: 100%
    }
    .img .preloader{        
        background-color: #f5f5f5;
    }
    .img img{
        width: 100%; height: 100%; object-fit: contain;
    }
    .img .preloader img,
    .img .empty-img{
        padding: 5px;
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
    }
    .cart_item_list_view > .item .info{    
        align-self: center;
        margin-left: 10px;
        width: calc(100% - 70px);
        height: 50px;
    }
    .cart_item_list_view > .item .info > .top_section{
        display: flex;
        align-self: center;
        height: 30px;
    }
    .cart_item_list_view > .item .info > .top_section > .product_info{
        align-self: center;
    }
    .cart_item_list_view > .item .info > .top_section > .product_info > .title,
    .cart_item_list_view > .item .info > .top_section > .product_info > .title a{
        text-align: left;
        font-size: 12px;
        color: rgb(40, 50, 104);
        font-weight: bold;
    }
    .cart_item_list_view > .item .info > .top_section > .product_info > .price_type{
        font-size: 11px; color: #666; text-align: left;
    }
    .cart_item_list_view > .item .info > .top_section > .del_btn{
        margin-left: auto;
        align-self: center;
        cursor: pointer;
        color: #666;
        font-size: 12px;
        transition: all 0.4s;
    }
    .cart_item_list_view > .item .info > .top_section > .del_btn:hover{
        color: $sys_brand_color;
    }
    .cart_item_list_view > .item .info > .bottom_section{        
        align-self: center;
        height: 25px;
    }
</style>