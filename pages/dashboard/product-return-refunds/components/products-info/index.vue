<template>
    <div class="product_info_block">        
        <div class="head_section">
            <div>
                <SrchInputBlock />
            </div>
            <div class="ml-3">
                <CategoryListBlock />
            </div>
            <div class="ml-3">
                <div class="action_btn">
                    <span class="submit_btn" @click="load_products"><i class="fa fa-search"></i></span>
                </div>
            </div>
        </div>
        <hr class="mt-2 mb-2" />
        <template v-if="content_loader">
            <div class="row">
                <div v-for="(n,i) in 20" :key="i" class="col-6 col-md-4 mb-3">                
                    <CardViewProductPreLoader />
                </div>
            </div>
        </template>
        <template v-else-if="products.length>0">
            <LoadMyProducts :data="products" />
        </template>
        <template v-else>
            <EmptyContentBlock />
        </template>

        <div v-if="pagination_show" class="row mt-3">
            <div class="col-md-12 mb-3" align="center">
                <span class="total_record_block">Total records: {{ pagination_config.data.total }}</span>
            </div>
            <div class="col-md-12">
                <Pagination :config="pagination_config" />
            </div>
        </div>
    </div>
</template>
<script>
import SrchInputBlock from './srch-input-block.vue'
import CategoryListBlock from './category-list-block.vue'
import LoadMyProducts from './load-products.vue'
import EmptyContentBlock from '@/components/content_display/EmptyContentBlock'
import CardViewProductPreLoader from '@/components/content_display/CardViewProductPreLoader'
export default {
    name: 'ProductInfoBlock',
    scrollToTop: true,
    components: {        
        EmptyContentBlock,
        CardViewProductPreLoader,
        SrchInputBlock,
        CategoryListBlock,
        LoadMyProducts        
    },
    data() {
        return {
            content_loader: false,
            pagination_show: false,            
            category_list: [],
            products: [],
            pagination_config: {
                data: [],
                lang: 'en',
                align: 'center',
                action: ''
            },
            srch_keyword: '',
            product_cat_id: '',
            cur_page: (this.$route.query.page>0?this.$route.query.page:1),
            limit: 20,
            user_access_token: this.$store.state.auth_info.user_data.token
        }
    },
    watch: {
        $route(to, from){
            if(to.query.page) this.load_products(to.query.page)
            else this.load_products()
        },
        // srch_keyword: function(val){
        //     this.load_products()
        // }
    },
    computed: {
        header_config (){
            let obj = {
                headers: {
                    'Authorization': 'Bearer ' + this.user_access_token,
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': this.user_access_token
                }
            };
            return obj;
        }
    },
    mounted() {
        this.load_categories();

        this.load_products();
    },
    methods: {
        async load_categories(){            
            let url = '/api/categories';
            
            this.category_list = [];
            this.$axios.get(url, this.header_config).then( (response) => {
                console.log(response)
                this.category_list = response.data.data
            }).catch(e => {
                this.$toast.error('Category load failed!!!', {icon: "error_outline"})
            });
        },
        load_products: function(pg=this.cur_page){
            let url = '/api/products'+ (this.limit>0?'?limit=' + this.limit:'') + (pg>1?'&page=' + pg:'') + (this.srch_keyword?'&keyword=' + this.srch_keyword:'') + (this.product_cat_id?'&cat_id=' + this.product_cat_id:'');

            this.content_loader = true
            this.pagination_show = false
            
            this.products = [];
            this.$axios.get(url, this.header_config).then( (response) => {
                console.log(response)
                if(response.data.data.length>0){
                    this.products = response.data.data
                    this.pagination_config.data = response.data.meta
                    this.total_rows = this.pagination_config.data.total
                    this.pagination_show = true
                }                

                this.content_loader = false                
                this.cur_page = pg
            }).catch(e => {
                this.$toast.error('Product load failed!!!', {icon: "error_outline"})
            });
        }
    }
}
</script>
<style scoped>
    .product_info_block{
        display: block;
        /* padding: 15px */
    }
    .head_section{
        display: flex;
        height: 30px
    }
    .head_section > div{
        align-self: center;
    }
    .product_info_block >>> .seach_input_block.mobile_device.float_menu{
        margin-left: 0
    }
    .action_btn{
        display: block;
        text-align: center
    }
    .submit_btn{        
        display: block;
        width: 30px; height: 30px;
        line-height: 30px;
        font-size: 12px;
        font-weight: bold;
        background-color: #ff6600;
        color: #fff;
        cursor: pointer;
        text-align: center;
        border-radius: 50px;
        transition: all 0.4s;
    }
    .submit_btn:hover{
        background-color: #cd5200;
    }
</style>