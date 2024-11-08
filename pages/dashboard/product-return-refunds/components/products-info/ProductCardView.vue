<template>
    <div class="item_block">
        <div class="overlay_action_block">
            <div class="price_type_block">
                <span v-for="(price_item,price_index) in item.product_price_infos" :key="price_index" :class="{active:price_index==sel_price_type_index}" @click="sel_price_type_index=price_index">{{ price_item.product_price_type_data.type_title }}</span>
            </div>
            <div class="price_block">
                <!-- <PriceViewBlock :data="item.product_price_infos[sel_price_type_index].price" :animate="true" /> -->                        
                <template v-if="item.product_price_infos[sel_price_type_index].discount_price">
                    <PriceViewBlock :data="item.product_price_infos[sel_price_type_index].discount_price" :animate="true" />
                </template>
                <template v-if="item.product_price_infos[sel_price_type_index].price">
                    <PriceViewBlock :data="item.product_price_infos[sel_price_type_index].price" :discount="item.product_price_infos[sel_price_type_index].discount_price?true:false" />
                    
                    <template v-if="item.product_price_infos[sel_price_type_index].discount_price">
                        <DiscountPercentageBlock :regular_price="item.product_price_infos[sel_price_type_index].price" :discount_price="item.product_price_infos[sel_price_type_index].discount_price" :animate="true" />
                    </template>
                </template>                        
            </div>
            <div class="quantity_info">
                <div class="mb-2" v-if="quantity>1">
                    <span v-if="$store.state.sel_lang=='bn'">মোট </span>
                    <span v-else>Total</span>
                    <template v-if="item.product_price_infos[sel_price_type_index].discount_price">
                        <PriceViewBlock :data="item.product_price_infos[sel_price_type_index].discount_price * quantity" :lang="$store.state.sel_lang" />
                    </template>
                    <template v-else>
                        <PriceViewBlock :data="item.product_price_infos[sel_price_type_index].price * quantity" :lang="$store.state.sel_lang" />
                    </template>
                </div>
                <QuantityActionBlock :quantity="quantity" />                        
            </div>
            <div class="action_btn">
                <span class="cart" @click="add_to_cart(item)"><i class="fa fa-shopping-cart"></i> Add to Cart</span>
            </div>
        </div>            
        <div class="img">
            <template v-if="item.product_photo_infos.length>0 && item.product_photo_infos[0].product_photo_data">                            
                <clazy-load :src="item.product_photo_infos[0].product_photo_data.content">
                    <img :src="item.product_photo_infos[0].product_photo_data.content">
                    <div class="preloader" slot="placeholder">
                        <img src="/_ipx/images/logo.png" />
                    </div>
                </clazy-load>
            </template>                
            <template v-else>
                <clazy-load :src="require('~/assets/images/empty-product.png')">
                    <img class="empty-img" :src="require('~/assets/images/empty-product.png')">
                    <div class="preloader" slot="placeholder">
                        <img src="/_ipx/images/logo.png" />
                    </div>
                </clazy-load>
            </template>
        </div>
        <div class="info">
            <div class="top-block clearfix">
                <span class="company_info float-left">
                    <img v-if="item.company_info && item.company_info.logo" :src="item.company_info.logo" :title="item.company_info.company_name" />
                    <i v-else class="fa fa-store-alt"></i>
                </span>                            
            </div>
            <div class="title text_overflow max_two_lines_allow">{{ item.product_title }}</div>
            <div class="generic text_overflow max_two_lines_allow mb-2">
                <template v-if="item.generic_info.length > 0">                
                    <template v-for="(generic,gi) in item.generic_info">
                        <template v-if="gi>0"> + </template><template>{{ generic.generics_data_info.generic_name }}</template>
                    </template>
                </template>
                <template v-else>
                    <small>---</small>
                </template>
            </div>
            <div class="mb-2 clearfix">
                <div v-if="item.product_price_infos.length > 0" class="price_info float-left">
                    <div :class="{'regular_price_view':item.product_price_infos[0].discount_price}" v-if="item.product_price_infos[0].price">
                        <PriceViewBlock :data="item.product_price_infos[0].price" :discount="item.product_price_infos[0].discount_price?true:false" />
                        <template v-if="item.product_price_infos[0].discount_price">
                            <DiscountPercentageBlock :regular_price="item.product_price_infos[0].price" :discount_price="item.product_price_infos[0].discount_price" />
                        </template>
                    </div>
                    <div v-if="item.product_price_infos[0].discount_price">
                        <PriceViewBlock :data="item.product_price_infos[0].discount_price" />
                    </div>                    
                </div>            
            </div>            
        </div>
    </div>
</template>
<script>
import PriceViewBlock from '@/components/content_display/price/ViewBlock'
import DiscountPercentageBlock from '@/components/content_display/price/DiscountPercentageBlock'
import QuantityActionBlock from '@/components/content_display/QuantityActionBlock'
import { mapMutations } from 'vuex'
export default {
    name: 'ProductCardViewBlock',
    props: ['item'],
    components: {
        PriceViewBlock,
        DiscountPercentageBlock,
        QuantityActionBlock
    },
    data(){
        return {
            sel_price_type_index: 0,
            min_qty: 1,
            max_qty: 100,
            quantity: 1
        }
    },
    watch: {
        sel_price_type_index: function(val){
            this.min_qty = 1
            this.max_qty = ''
            this.quantity = 1
            this.check_qty_restrict()
        }
    },
    mounted(){
        this.check_qty_restrict()
    },
    methods: {
        ...mapMutations({
            add_cart_item: 'cart_info/ADD_CART_ITEMS'
        }),
        quantity_submit: function(val){
            if(val<this.min_qty || isNaN(val)) this.quantity = this.min_qty
            else if(this.max_qty && val>this.max_qty) this.quantity = this.max_qty
            else this.quantity = val
        },
        async add_to_cart(item){
            item.req_quantity = this.quantity
            item.sel_price_type_index = this.sel_price_type_index
            // if(item.product_price_infos[this.sel_price_type_index].discount_price) item.product_price_infos[this.sel_price_type_index].price = item.product_price_infos[this.sel_price_type_index].discount_price
            // alert(this.sel_price_type_index)
            console.log('Cart Item', item)
            
            await this.add_cart_item(item)

            // let get_pos = $('#item-' + item.id).offset().top;
            // console.log(get_pos)

            // this.$toast.success('Item added to cart', {icon: "Success"});
            this.$notify.success({
                title: 'Success',
                message: 'Item added to cart',
                timeout: 1500
            })
        },
        check_qty_restrict: function(){
            if(this.item.product_price_infos[this.sel_price_type_index].min_qty) this.min_qty = this.item.product_price_infos[this.sel_price_type_index].min_qty
            if(this.item.product_price_infos[this.sel_price_type_index].max_qty) this.max_qty = this.item.product_price_infos[this.sel_price_type_index].max_qty
            
            this.quantity = this.min_qty>this.quantity?this.min_qty:this.quantity
        }
    }
}
</script>
<style lang="scss" scoped>
    .item_block{
        display: block;
        position: relative;
        background-color: $white;
        color: $dark_ash;
        border: 1px solid $default_border_color;
        border-radius: 3px;
        margin: 5px;                
        transition: all 0.4s;

        .overlay_action_block{
            position: absolute;
            opacity: 0;
            background-color: #00000099;
            left: 1%;
            top: 1%;
            width: 98%;
            height: 98%;
            z-index: 1;
            border-radius: 5px;
            transition: all 0.4s;

            & > .price_type_block{
                display: block;
                padding: 5px 8px;
                height: 60px;

                & > span{
                    display: inline-block;
                    background: $white;
                    padding: 0px 8px;
                    line-height: 14px;
                    height: 15px;
                    margin: 2px;
                    cursor: pointer;
                    border-radius: 25px;
                    font-size: 9px;
                    box-shadow: 0 0 5px $black;                            

                    &.active{
                        background-color: $sys_brand_color;
                        color: $white;
                    }
                }
            }
            
            & > .price_block{
                display: block;
                padding: 0 10px;
                font-size: 22px;
                color: #fff;                        
            }

            & > .quantity_info{
                position: absolute;
                width: 100%;
                text-align: center;
                color: #fff;
                bottom: 45px;
            }

            .action_btn{
                position: absolute;
                width: 100%;
                text-align: center;
                color: #fff;
                bottom: 12px;

                & > .cart{
                    display: inline-block;
                    height: 28px;
                    line-height: 28px;
                    padding: 0 15px;
                    text-align: center;                    
                    font-size: 10px;
                    background-color: #006699;
                    color: #fff;
                    cursor: pointer;
                    border-radius: 25px;
                    transition: all 0.4s;
                    box-shadow: 0 0 5px #333;
                }
                & > i{
                    display: inline-block; position: relative;
                    background-color: #0088cc; font-size: 10px;
                    width: 24px; height: 24px; margin-right: 5px;
                    line-height: 24px; border-radius: 50%;
                }
            }
        }

        &:hover{
            box-shadow: 0 0 5px #ccc;

            & > .overlay_action_block{
                opacity: 1
            }
        }        

        .img{
            width: 100%;
            height: 80px;
            border-bottom: 1px solid $default_border_color;
        }
        .img .loaded,
        .img .loading,
        .img .preloader{
            width: 100%; height: 100%        
        }
        .img .preloader{        
            background-color: $light_white;
        }
        .img img{
            width: 100%; height: 100%; object-fit: contain;
        }
        .img .preloader img,
        .img .empty-img{
            // padding: 25px;
            -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
            filter: grayscale(100%);
            opacity: 0.6;
        }
        .info{
            display: block;
            margin: 0 12px;
            height: 140px;
        }
        .info > .top-block{
            display: block;                    
        }
        .info > .top-block .company_info{
            position: relative;
            width: 36px;
            height: 36px;        
            text-align: center;
            border: 1px solid $default_border_color;
            background-color: $white;
            margin-top: -20px;
        }
        .info > .top-block .company_info > img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .info > .top-block .company_info > i{
            font-size: 20px;
            color: #cccccc;
            line-height: 34px;
        }
        .info > .title{                                        
            margin: 8px 0;
            color: $title_color_1;
            height: 40px;
        }
        .info > .generic{
            color: #6d3371;
            font-size: 12px;
            line-height: 14px;
        }        
    }    
</style>
<style scoped>
    .quantity_info >>> .quantity_action_block{
        background-color: #fff;                            
        border-radius: 25px;
        overflow: hidden;
        height: 28px;
        line-height: 25px;
    }
</style>