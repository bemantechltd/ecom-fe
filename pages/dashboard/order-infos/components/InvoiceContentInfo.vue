<template>
    <div :class="['page',{hide:copy_for==2}]">
        <div class="head_section_block">
            <div class="bill_from_block">
                <label>Bill From</label>
                <div>{{ $parent.app_name }}</div>
                <div v-html="$store.state.site_basic_config_data.printer_line_txt"></div>
            </div>
            <div class="copy_for_block">
                <p v-if="copy_for==1">Office Copy</p>
                <p v-else>Customer Copy</p>
            </div>
            <div class="company_logo">
                <Logo />
            </div>
        </div>
        <div class="ship_bill_section_block">
            <div class="ship_to_block">
                <label>Ship To</label>
                <div v-html="$parent.sel_data.shipping_address"></div>                        
                <div v-html="$parent.sel_data.contact_no"></div>                        
                <div v-html="$parent.sel_data.email"></div>
            </div>
            <div class="bill_to_block ml-3 mr-3">
                <label>Bill To</label>
                <div v-html="$parent.sel_data.billing_address"></div>
            </div>
            <div class="order_info">
                <div class="order_id">
                    <b>Invoice #</b><span>{{ $parent.sel_data.order_id }}</span>
                </div>
                <div class="ordered_at">
                    <b>Invoice Date</b>
                    <span>{{ $parent.sel_data.created_at }}</span>
                </div>
            </div>
        </div>                
    
        <div class="product_info mt-4">                    
            <template v-if="Object.keys($parent.sel_data).length>0">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th class="price_block">Unit Cost</th>
                            <th class="price_block">Line Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in $parent.sel_data.order_items_info" :key="index">
                            <td>
                                <div class="item_view_block">
                                    <div class="img">
                                        <nuxt-img v-if="item.product_photo_info && item.product_photo_info[0].product_photo_data"
                                            format="webp"
                                            :src="item.product_photo_info[0].product_photo_data.content"
                                        />
                                        <img v-else class="empty-img" src="~/assets/images/empty-product.png" />
                                    </div>
                                    <div class="info">                    
                                        <div class="title text_overflow max_one_line_allow">
                                            {{ item.product_title }}
                                        </div>
                                        <div class="unit_price_type text_overflow max_one_line_allow">
                                            {{ item.product_price_type }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td align="center">{{ item.qty }}</td>
                            <td class="price_block"><PriceViewBlock :data="item.price" /></td>
                            <td class="price_block"><PriceViewBlock :data="(item.price * item.qty).toFixed(2)" /></td>
                        </tr>
                        <!-- <tr>
                            <td colspan="3" align="right">Subtotal ({{ $parent.sel_data.order_items_info.length }} items)</td>
                            <td class="price_block"><PriceViewBlock :data="$parent.sel_data.total_amount.toFixed(2)" /></td>
                        </tr>
                        <tr>
                            <td colspan="3" align="right">VAT ({{ $parent.sel_data.vat_amount }}%)</td>
                            <td class="price_block"><PriceViewBlock :data="(($parent.sel_data.total_amount * $parent.sel_data.vat_amount)/100).toFixed(2)" /></td>
                        </tr>
                        <tr>
                            <td colspan="3" align="right">Discount</td>
                            <td class="price_block"><PriceViewBlock :data="$parent.sel_data.discount.toFixed(2)" /></td>
                        </tr>
                        <tr>
                            <td colspan="3" align="right">Delivery fee</td>
                            <td class="price_block">
                                <template v-if="$parent.sel_data.delivery_fee>0"><PriceViewBlock :data="$parent.sel_data.delivery_fee.toFixed(2)" /></template>
                                <template v-else>Free</template>
                            </td>
                        </tr> -->
                    </tbody>
                    <!-- <tfoot>
                        <tr>
                            <th colspan="3" class="price_block" align="right">Total</th>
                            <th class="price_block"><PriceViewBlock :data="$parent.sel_data.total_payable.toFixed(2)" /></th>
                        </tr>
                    </tfoot>                             -->
                </table>
                <!-- <OrderDetailsReceiptInfo :data="$parent.sel_data.order_items_info" />
                <hr style="border: 1px dashed #ddd" />
                <OrderSummaryInfo :data="$parent.sel_data" /> -->
            </template>
        </div>

        <div class="order_summary_others_block">
            <div>
                <div class="payment_method_block">
                    <label>Payment Method</label>
                    <div v-if="$parent.sel_data.choose_payment_type==1">Cash On Delivery</div>
                    <div v-if="$parent.sel_data.choose_payment_type==2">Digital Payment</div>
                </div>
            </div>
            <div class="summary_block">
                <OrderSummaryInfo :data="$parent.sel_data" />
            </div>
        </div>
        
        <hr />

        <div class="footer_section">
            <div class="powered_by">
                <span>Powered by <a href="https://tamannapharmacy.com" target="_blank"><img src="/_ipx/images/powered-by.png" title="Powered by image" alt="Powered by image" /></a></span>
            </div>
            <div class="developer_info">
                <span>Developed by <a href="https://orangebd.com" target="_blank"><img src="/_ipx/images/developer.logo.png" title="Developer logo" alt="Developer logo" /></a></span>
            </div>
        </div>
    </div>
</template>
<script>
// import OrderDetailsReceiptInfo from './OrderDetailsReceiptInfo'
import OrderSummaryInfo from './OrderSummaryInfo'
import PriceViewBlock from '@/components/content_display/price/ViewBlock'
import Logo from '@/components/Logo'
export default {
    name: 'InvoiceContentInfo',
    props: ['copy_for'],
    components: {
        Logo,
        PriceViewBlock,
        // OrderDetailsReceiptInfo,
        OrderSummaryInfo
    },
}
</script>
<style lang="scss" scoped>
    .page{
        display: block;
        &.hide,.copy_for_block{
            display: none;
        }
        .head_section_block {
            display: flex;
            padding-bottom: 15px;
            border-bottom: 1px solid #ddd;

            & > div{
                width: 50%;

                &.copy_for_block{
                    text-align: center;
                    & > p{
                        display: inline-block;
                        margin: 0; padding: 0;
                        font-size: 12px; color: #535353
                    }
                }
                
                label {
                    font-size: 12px; font-weight: bold;
                }

                &:last-child{
                    margin-left: auto;
                    img{
                        max-height: 60px;
                        object-fit: contain
                    }
                }
            }
        }
        .ship_bill_section_block{
            display: flex;        
            padding-top: 15px;        
            font-size: 12px;        

            & > div{
                width: 100%;
                
                label {
                    font-size: 12px; font-weight: bold;
                }
            }

            & > div.order_info{
                
                & > div{
                    display: flex;
                    width: 100%;

                    & > span{
                        margin-left: auto;
                    }
                }
            }
        }

        .product_info{
            display: block;
            font-size: 12px;

            thead{
                background-color: #ddd;
            }
            tfoot{
                background-color: #eee;
            }

            th,td{
                padding: 7px 15px
            }
            
            .price_block{
                text-align: right
            }

            .item_view_block{
                display: flex;                

                .img{
                    width: 60px;
                    height: 40px;
                    margin-right: 10px;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    background-color: #eee;
                
                    & > img{
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        &.empty-img{
                            padding: 5px
                        }
                    }
                }

                .info{
                    margin-right: 10px;
                    & > .title{
                        font-size: 13px;
                    }
                    & > .unit_price_type{
                        font-size: 11px;
                    }
                }
            }
        }
        .order_summary_others_block{
            display: flex;
            margin-top: 25px;

            & > div{
                width: 50%;

                .payment_method_block {
                    display: block;
                    border: 1px solid #ddd;
                    margin-right: 25px;
                    font-size: 12px;

                    & > label{
                        padding: 5px 15px;
                        background-color: #eee;
                        width: 100%; margin: 0;
                        border-bottom: 1px solid #ddd;
                        display: block; font-weight: bold;
                    }

                    & > div{
                        display: block;
                        padding: 5px 15px;
                    }
                }

                &.summary_block{
                    padding: 0 15px
                }
            }
        }
        .footer_section{
            display: flex;

            & > div{            
                font-size: 12px;

                &.developer_info{
                    margin-left: auto;
                }

                img{
                    max-height: 16px; object-fit: contain;
                }
            }
        }
    }
</style>
<style scoped>
    .bill_from_block > div >>> p{
        margin-bottom: 0; font-size: 12px;
    }
    .ship_to_block >>> .address_dtl .address_lbl,
    .bill_to_block >>> .address_dtl .address_lbl{
        display: inline-block;
        white-space: nowrap;
        padding: 1px 10px;        
        margin-right: 5px;
        background-color: #ddd;
        color: #333;
        font-weight: 600;
        border-radius: 25px;
        font-size: 10px;
    }
</style>