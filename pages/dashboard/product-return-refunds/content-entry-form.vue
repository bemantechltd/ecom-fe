<template>
    <div class="content_entry_form_block">
        <RainbowLoader v-if="req_submit" />
        <div class="row">
            <div class="col-md-5">
                <div v-if="form_loader" class="row">
                    <div class="col-md-12">
                        <div class="info_block">
                            <FormBlockLoader :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                            <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                            <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                        </div>
                    </div>
                </div>
                <template v-else>                    
                    <div class="info_block">
                        <div class="label">
                            <i class="fa fa-shopping-cart"></i>
                            <span>Cart Items</span>
                        </div>
                        <div class="content-wrapper-block">
                            <CartItemListView />
                        </div>
                    </div>
                    <div class="info_block mt-3">
                        <div class="label">
                            <i class="fa fa-user"></i>
                            <span>Customer Info</span>
                        </div>
                        <div class="content-wrapper-block">
                            <CustomerInfoBlock />
                        </div>
                    </div>
                    <template v-if="new_customer || customer_info">
                        <div class="info_block mt-3">
                            <div class="label">
                                <i class="fa fa-shipping-fast"></i>
                                <span>Shipping Info</span>
                            </div>
                            <div class="content-wrapper-block">
                                <ShippingInfoBlock />
                            </div>
                        </div>
                        <div class="info_block mt-3">
                            <div class="label">
                                <i class="fa fa-receipt"></i>
                                <span>Billing Info</span>
                            </div>
                            <div class="content-wrapper-block">
                                <div class="same_as_shipping_info_block" @click="same_as_shipping_info"><i v-if="same_as_shipping" class="far fa-check-circle active"></i><i v-else class="far fa-circle"></i> Same as shipping address</div>
                                <template v-if="!same_as_shipping">
                                    <BillingInfoBlock />
                                </template>
                            </div>
                        </div>
                        <div class="info_block mt-3">
                            <div class="label">
                                <i class="fa fa-question"></i>
                                <span>Extra Instruction</span>
                            </div>
                            <div class="mt-3 mb-3">
                                <ExtraInstructionInfo />
                            </div>
                        </div>
                        <div class="info_block mt-3">
                            <div class="label">
                                <i class="fa fa-credit-card"></i>
                                <span>Choose Payment Method</span>
                            </div>
                            <div class="mt-3 mb-3">
                                <ChoosePaymentType />
                            </div>
                        </div>
                    </template>
                </template>
            </div>
            <div class="col-md-7">
                <div v-if="form_loader" class="row">
                    <div class="col-md-12">
                        <div class="form_block">
                            <FormBlockLoader :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                            <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                            <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                        </div>
                    </div>
                </div>
                <div v-else class="form_block">
                    <ProductInfoListBlock />
                </div>
            </div>            
        </div>
    </div>
</template>
<script>
import CustomerInfoBlock from './components/customer-info'
import ProductInfoListBlock from './components/products-info'
import ShippingInfoBlock from './components/shipping-info'
import BillingInfoBlock from './components/billing-info'
import ChoosePaymentType from '@/pages/checkout-page/components/ChoosePaymentType'
import ExtraInstructionInfo from '@/pages/checkout-page/components/ExtraInstructionInfo'
import CartItemListView from '@/components/content_display/CartItemListView'
import SwithcBtn from '@/components/action_buttons/SwitchBtn'
import { mapMutations } from 'vuex'
export default {
    name: 'ContentEntryFromBlock',
    props: {
        edit_content_id: Number
    },
    components: {
        CustomerInfoBlock,
        ProductInfoListBlock,
        ShippingInfoBlock,
        BillingInfoBlock,
        ChoosePaymentType,
        ExtraInstructionInfo,
        CartItemListView,
        SwithcBtn
    },    
    data(){
        return {
            form_loader: false,
            regions: [],            
            customer_info: '',
            customer_id: '',
            new_customer: false,
            shipping_info: {
                full_name: '',
                contact_no: '',
                region_id: '',
                city_id: '',
                area_id: '',                
                address: '',
                label_id: 1                
            },
            billing_info: {
                full_name: '',
                contact_no: '',
                region_id: '',
                city_id: '',
                area_id: '',                
                address: '',
                label_id: 1                
            },
            pre_billing_info: {},
            shipping_billing_info: {
                shipping_address: '',
                billing_address: '',                
                contact_no: '',
                email: ''
            },
            vat_amount: 0,
            discount: 0,
            delivery_fee: this.$store.state.delivery_fee_default,
            extra_instruction: '',
            choose_payment_type: 1,
            same_as_shipping: false,
            req_submit: false,
            form_action: 'save'
        }
    },
    computed: {
        form_submit_status () {
            return this.$store.state.form_submit_status        
        }
    },
    watch: {
        edit_content_id (val) {
            if(val) this.load_req_data(val);
        },
        form_submit_status (status) {
            if(status) this.formSubmit();        
        }
    },
    async mounted(){
        // load region list
        await this.load_regions();

        if(this.edit_content_id) this.load_req_data(this.edit_content_id);
        if(this.$store.state.form_submit_status) this.formSubmit();
    },
    methods: {
        ...mapMutations({
            get_cart_items: 'cart_info/GET_CART_ITEMS'
        }),
        get_full_address(v){
            // console.log(v)
            return '<div class="contact_person">'+ v.full_name +'</div><div class="address_dtl"><span class="address_lbl ' + (v.label_id==1?'home':'office') + '"><em>'+ this.$store.state.shipping_addr_labels[v.label_id].icon +'</em> '+ this.$store.state.shipping_addr_labels[v.label_id].title +'</span><span>'+ v.address +'</span></div>';
        },
        switch_data(index,status){
            this.formData[index] = status
        },
        slug_config(){            
            this.formData.slug = this.$strSlug(this.formData.generic_name)
        },
        async same_as_shipping_info(){
            if(this.same_as_shipping){
                this.same_as_shipping = false
                this.pre_billing_info = this.billing_info
                this.billing_info = this.shipping_info
            }else{
                this.same_as_shipping=true
                this.billing_info = this.pre_billing_info
                this.pre_billing_info = {}
            }
        },
        async load_regions(){            
            let url = '/api/regions';
            
            this.regions = [];
            this.$axios.get(url, this.$parent.header_config).then( (response) => {
                console.log(response)
                this.regions = response.data.data
            }).catch(e => {
                this.$toast.error('Region load failed!!!', {icon: "error_outline"})
            });
        },
        async load_req_data(id){
            this.form_loader = true;
            
            this.$axios.get('/api/order-infos/edit/' + id, this.$parent.header_config).then( (response) => {
                console.log('Get Data', response.data)
                let getData = response.data;

                this.formData = {
                    generic_name: getData.generic_name,                
                    slug: getData.slug,                    
                    status: getData.status
                }

                this.form_loader = false;
                this.form_action = 'update';
            }).catch(e => {
                console.log(e)
                this.$toast.error('Failed!!!', {icon: "error_outline"})
                this.form_loader = false;
            });
        },
        async formSubmit(){
            this.$parent.form_submit_state(false)

            let url = '/api/order-infos/store'; 

            if(this.shipping_info.full_name==''){
                this.$toast.error('Please enter name for shipping info', {icon: "Warning"});
                return false
            }else if(this.shipping_info.contact_no==''){
                this.$toast.error('Please enter contact number for shipping info', {icon: "Warning"});
                return false
            }else if(!this.$validateContactNumber(this.shipping_info.contact_no.trim())){
                this.$toast.error('Please enter valid contact number for shipping info', {icon: "Warning"});
                return false
            }else if(this.shipping_info.region_id==''){
                this.$toast.error('Please choose region for shipping info', {icon: "Warning"});
                return false
            }else if(this.shipping_info.city_id==''){
                this.$toast.error('Please choose city for shipping info', {icon: "Warning"});
                return false
            }else if(this.shipping_info.area_id==''){
                this.$toast.error('Please choose area for shipping info', {icon: "Warning"});
                return false
            }else if(this.shipping_info.address==''){
                this.$toast.error('Please enter address for shipping info', {icon: "Warning"});
                return false
            }
            /**
             * Billing info validation
             */
            else if(!this.same_as_shipping && this.billing_info.full_name==''){
                this.$toast.error('Please enter name for billing info', {icon: "Warning"});
                return false
            }else if(!this.same_as_shipping && this.billing_info.contact_no==''){
                this.$toast.error('Please enter contact number for billing info', {icon: "Warning"});
                return false
            }else if(!this.same_as_shipping && !this.$validateContactNumber(this.billing_info.contact_no.trim())){
                this.$toast.error('Please enter valid contact number for billing info', {icon: "Warning"});
                return false
            }else if(!this.same_as_shipping && this.billing_info.region_id==''){
                this.$toast.error('Please choose region for billing info', {icon: "Warning"});
                return false
            }else if(!this.same_as_shipping && this.billing_info.city_id==''){
                this.$toast.error('Please choose city for billing info', {icon: "Warning"});
                return false
            }else if(!this.same_as_shipping && this.billing_info.area_id==''){
                this.$toast.error('Please choose area for billing info', {icon: "Warning"});
                return false
            }else if(!this.same_as_shipping && this.billing_info.address==''){
                this.$toast.error('Please enter address for billing info', {icon: "Warning"});
                return false
            }

            this.shipping_billing_info.shipping_address = this.get_full_address(this.shipping_info);
            this.shipping_billing_info.contact_no = this.shipping_info.contact_no

            if(this.same_as_shipping) this.shipping_billing_info.billing_address = this.get_full_address(this.shipping_info);
            else this.shipping_billing_info.billing_address = this.get_full_address(this.billing_info);

            let getCarListObj = this.$store.state.cart_info.cart_items
            let getCartItemInfos = []
            for(var pid in getCarListObj){
                for(var tid in getCarListObj[pid]){
                    let obj = {
                        product_id: pid,
                        product_title: getCarListObj[pid][tid].product_title,
                        product_price_type_id: getCarListObj[pid][tid].price_type_id,
                        product_price_type: getCarListObj[pid][tid].price_type,
                        price: getCarListObj[pid][tid].price,
                        qty: getCarListObj[pid][tid].quantity                    
                    }

                    getCartItemInfos.push(obj)
                }
            }

            let formData = {
                cart_item_infos: getCartItemInfos,
                shipping_billing_info: this.shipping_billing_info,
                order_infos: {                    
                    total_amount: this.$store.state.cart_info.total_cart_amount,
                    vat_amount: this.vat_amount,
                    discount: this.discount,
                    delivery_fee: this.delivery_fee,
                    extra_instruction: this.extra_instruction,
                    choose_payment_type: this.choose_payment_type,
                    order_from: 'web'
                },
                customer_id: this.customer_info?this.customer_info.id:'',
                new_customer_id: this.new_customer?this.customer_id: '',
            }                    

            if(confirm('Are you sure to order it?')){
                // call for submit
                this.req_submit = true;

                this.$axios.post(url, formData, this.$parent.header_config).then( async response => {
                    this.req_submit = false
                    if(response.data.status){
                        this.$parent.load_data();

                        localStorage.removeItem('cart_items')
                        this.get_cart_items()
                        
                        this.form_reset();
                        
                        await this.$swal("Thank you!", "Your order has been submitted.", "success")
                    }else{
                        this.$toast.error(response.data.msg, {icon: "error_outline"})
                        this.req_submit = false
                    }
                }).catch(e => {
                    this.$toast.error('Failed!!!', {icon: "error_outline"})
                    this.req_submit = false
                });
            }
        },
        form_reset(){
            this.customer_info = ''
            this.shipping_info = {
                full_name: '',
                contact_no: '',
                region_id: '',
                city_id: '',
                area_id: '',                
                address: '',
                label_id: 1                
            }
            this.billing_info = {
                full_name: '',
                contact_no: '',
                region_id: '',
                city_id: '',
                area_id: '',                
                address: '',
                label_id: 1                
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .form_block,.info_block{
        display: block;
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 20px;
    }
    .info_block{
        padding: 0;

        & > .label {
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 3px;
            /* margin: -20px; */
            padding: 8px 15px;
            border-bottom: 1px solid #ddd;        
            color: #999;
        }
    }    
    .same_as_shipping_info_block{
        display: block; cursor: pointer; padding: 8px 15px;

        & > i{
            color: #71c971
        }
    }
</style>