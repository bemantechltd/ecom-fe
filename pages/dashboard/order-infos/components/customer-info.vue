<template>
    <div class="customer_info_block">
        <div class="srch_block">
            <input type="text" v-model="$parent.customer_id" placeholder="Enter Email or Mobile number" @keyup.enter="checkExistUser" />
            <i class="fa fa-search"></i>
        </div>
        <div class="loader_block mt-2" v-if="form_loader">
            <span><i class="fa fa-cog fa-spin"></i> Loading...wait</span>
        </div>
        <div v-if="message" class="msg_block mt-2 mb-2"><i class="fa fa-info-circle"></i> {{ message }}</div>
        <div v-else-if="$parent.new_customer" class="mt-2 mb-2"><i class="fa fa-user-circle"></i> New Customer</div>            
        <div v-else-if="$parent.customer_info!==''" class="user_info mt-2">
            <template v-if="$parent.customer_info">
                <div class="photo"><i class="fa fa-user"></i></div>
                <div class="info">
                    <div class="name">
                        <template v-if="$parent.customer_info.user_info && $parent.customer_info.user_info.full_name"><b>{{ $parent.customer_info.user_info.full_name }}</b></template>
                        <template v-else>
                            <em>[Name not provided]</em>
                        </template>
                    </div>
                    <div v-if="$parent.customer_info.email" class="email">
                        <em><i class="fa fa-envelope"></i> {{ $parent.customer_info.email }}</em>
                    </div>
                    <div v-if="$parent.customer_info.mobile" class="mobile">
                        <em><i class="fa fa-phone"></i> {{ $parent.customer_info.mobile }}</em>
                    </div>
                </div>
            </template>            
        </div>
    </div>
</template>
<script>
export default {
    name: 'CustomerInfoBlock',
    data(){
        return {
            form_loader: false,            
            message: ''            
        }
    },
    methods: {
        get_full_address(v){
            // console.log(v)
            return '<div class="contact_person">'+ v.full_name +'</div><div class="address_dtl"><span class="address_lbl ' + (v.label_id==1?'home':'office') + '"><em>'+ this.$store.state.shipping_addr_labels[v.label_id].icon +'</em> '+ this.$store.state.shipping_addr_labels[v.label_id].title +'</span><span>'+ v.address +'</span></div>';
        },
        checkExistUser: async function(){
            this.form_loader = true
            this.message = ''
            this.$parent.new_customer = false
            this.$parent.form_reset()
            
            this.$axios.get('/api/users/check/' + this.$parent.customer_id, this.$parent.$parent.header_config).then( (response) => {
                console.log('Get Data', response.data)

                if(response.data){
                    if(response.data.data) this.$parent.customer_info = response.data.data
                    else if(response.data.msg) this.message = response.data.msg
                    else this.$parent.new_customer = true
                    if(response.data.default_addresses) {
                        response.data.default_addresses.forEach(v => {
                            if(v.default_shipping_address) this.$parent.shipping_info = v
                            if(v.default_billing_address) this.$parent.billing_info = v
                        })
                    }                    
                }

                this.form_loader = false
            }).catch(e => {
                console.log(e)
                this.$toast.error('Failed!!!', {icon: "error_outline"})
                this.form_loader = false
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    $bg_color: #f7f7f7;

    .msg_block{
        color: #CD0000
    }

    .customer_info_block{
        display: block;
        padding: 15px;
        
        & > div.srch_block{
            display: flex;
            background-color: $bg_color;
            padding: 0 10px;
            border-radius: 5px;
            height: 36px;
            border: 1px solid #ddd;

            & > *{
                align-self: center;                
            }

            & > input{
                width: 100%;
                border: none; background-color: $bg_color
            }

            & > i{
                cursor: pointer;
            }
        }

        & > .user_info{
            display: flex;            
            width: 100%;

            & > .photo{
                width: 65px;
                text-align: center;
                background-color: #f7f7f7;
                border: 1px solid #ddd;
                border-radius: 3px;
                height: 65px;
                line-height: 65px;
                font-size: 30px;
                color: #ccc;
            }

            & > .info{
                width: calc(100% - 75px);
                margin-left: 10px;

                & > i{
                    color: #999;
                }
            }
        }
    }
</style>