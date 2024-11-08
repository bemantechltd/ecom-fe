<template>
    <div class="related_products_block">
        <div v-if="pre_loader" class="row">            
            <div v-for="(n,i) in 4" :key="i" class="col-md-12">                
                <CardViewProductPreLoader />
            </div>
        </div>
        <div v-else class="row">
            <div v-for="(item,index) in data" :key="index" class="col-6 col-md-3 mb-3 pr-2 pl-2">
                <MobileCardViewProduct v-if="$device.isMobile" :item="item" />
                <CardViewProduct v-else :item="item" />
            </div>
        </div>
    </div>
</template>
<script>
import CardViewProduct from '~/components/content_display/CardViewProduct'
import MobileCardViewProduct from '~/components/content_display/MobileCardViewProduct'
import CardViewProductPreLoader from '~/components/content_display/CardViewProductPreLoader'
export default {
    name: 'RelatedProductsBlock',
    props: ['generic_info'],
    components: {
        CardViewProduct,
        MobileCardViewProduct,
        CardViewProductPreLoader
    },
    data(){
        return {
            pre_loader: true,
            data: '',
            limit: 8
        }
    },
    mounted(){
        this.load_data();
    },
    methods: {
        async load_data(){
            let filters = '';
            let generic_ids = [];
            this.generic_info.forEach(v => {
                generic_ids.push(v.product_generic_id)
            });

            filters = 'generics=' + JSON.stringify(generic_ids);

            this.pre_loader = true;
            
            this.$axios.get('/api/products/related?' + filters + '&limit=' + this.limit, this.$parent.$parent.header_config).then( (response) => {
                // console.log('Get Data', response.data.data)
                this.data = response.data.data                
                this.pre_loader = false
            }).catch(e => {
                console.log(e)                
                this.pre_loader = false;
            });
        }
    }
}
</script>
<style scoped>
    .related_products_block{
        display: block;
        margin: 0 10px;
    }
</style>