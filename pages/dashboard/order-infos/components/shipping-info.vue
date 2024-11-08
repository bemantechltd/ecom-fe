<template>
    <div class="shipping_info_block">        
        <div class="row">
            <div class="col-md-6 mb-3">
                <label>Full Name</label>                
                <div><input type="text" v-model="$parent.shipping_info.full_name" placeholder="Enter full name" /></div>
            </div>
            <div class="col-md-6 mb-3">
                <label>Contact Number</label>
                <div><input type="text" v-model="$parent.shipping_info.contact_no" placeholder="Enter contact name" /></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mb-3">
                <label>Region</label>                        
                <div>
                    <select v-model="$parent.shipping_info.region_id">
                        <option value="">Select One</option>
                        <template v-for="(item,key) in $parent.regions">
                            <option :value="item.id" :key="key">{{ item.title }}</option>
                        </template>
                    </select>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <label>City</label>                        
                <div>
                    <select v-model="$parent.shipping_info.city_id">
                        <option value="">Select One</option>
                        <template v-for="(item,key) in cities">
                            <option :value="item.id" :key="key">{{ item.title }}</option>
                        </template>
                    </select>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <label>Area</label>
                <div>
                    <select v-model="$parent.shipping_info.area_id">
                        <option value="">Select One</option>
                        <template v-for="(item,key) in areas">
                            <option :value="item.id" :key="key">{{ item.title }}</option>
                        </template>
                    </select>
                </div>
            </div>
            <div class="col-md-7 mb-3">
                <label>Address</label>
                <div>
                    <textarea-autosize
                        :placeholder="'Enter the house no, road etc'"                    
                        v-model="$parent.shipping_info.address"
                        :min-height="30"
                        :max-height="450"
                    />
                </div>
            </div>
            <div class="col-md-5 mb-3">
                <label>Destination type</label>                        
                <div>
                    <select v-model="$parent.shipping_info.label_id">
                        <template v-for="(item,key) in $store.state.shipping_addr_labels">
                            <option :value="key" :key="key">{{ item.title }}</option>
                        </template>                                
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ShippingInfoBlock',
    data(){
        return {            
            cities: [],
            areas: [],
        }
    },
    watch: {
        get_region_id: function(){
            this.load_cities();
        },
        get_city_id: function(){
            this.load_areas();
        }
    },
    computed:{
        get_region_id: function(){
            return this.$parent.shipping_info.region_id
        },
        get_city_id: function(){
            return this.$parent.shipping_info.city_id
        }
    },
    mounted() {
        this.load_cities();
        this.load_areas();
    },
    methods: {
        async load_areas(){
            if(this.$parent.shipping_info.city_id=='') return false

            let url = '/api/areas?city_id=' + this.$parent.shipping_info.city_id;            

            this.areas = [];
            this.$axios.get(url, this.$parent.$parent.header_config).then( (response) => {
                console.log(response)
                this.areas = response.data.data
            }).catch(e => {
                this.$toast.error('Area load failed!!!', {icon: "error_outline"})
            });
        },
        async load_cities(){            
            if(this.$parent.shipping_info.region_id=='') return false

            let url = '/api/cities?region_id=' + this.$parent.shipping_info.region_id;            

            this.cities = [];
            this.$axios.get(url, this.$parent.$parent.header_config).then( (response) => {
                console.log(response)
                this.cities = response.data.data
            }).catch(e => {
                this.$toast.error('City load failed!!!', {icon: "error_outline"})
            });
        },
    }
}
</script>
<style scoped>
    .shipping_info_block{
        padding: 10px
    }    
    .shipping_info_block >>> select,
    .shipping_info_block >>> input,
    .shipping_info_block >>> textarea,
    .shipping_info_block >>> .date_input{
        border: 1px solid #ddd;
        font-size: 13px;
        border-radius: 3px;
        padding: 2px 5px;
        width: 100%;
    }
    .shipping_info_block >>> textarea{
        padding: 5px 10px;
    }
    .shipping_info_block > span{
        align-self: center;
    }
    .shipping_info_block > span.full{
        width: 100%;
    }
    .shipping_info_block > span.textarea{
        align-self: baseline;
        width: 100%;
    }
</style>