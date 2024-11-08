<template>
    <div class="dynamic_page_content_block mt-2">
        <div class="container">            
            <div class="row">
                <div class="col-md-3">
                    <div class="content_wrapper_block mb-3">
                        <div v-if="pre_loader">
                            <div v-for="(n,i) in 3" :key="i">
                                <CardViewProductPreLoader />
                            </div>
                        </div>
                        <div v-else>
                            <div class="filter_block" v-if="$device.isMobile">
                                <div @click="float_filter_open=true"><i class="fa fa-filter"></i> Filter</div>
                                <FloatFilterBlock v-if="float_filter_open" />
                            </div>
                            <FilterItemsBlock v-else />
                        </div>
                    </div>
                </div>
                <div class="col-md-9 mb-3">
                    <div class="content_wrapper_block">
                        <div v-if="pre_loader" class="row">
                            <div v-for="(n,i) in 12" class="col-md-3 mb-3" :key="i">
                                <CardViewProductPreLoader />
                            </div>
                        </div>
                        <template v-else-if="data.length>0">
                            <div class="content_list_block">
                                <div class="row">
                                    <div v-for="(item,index) in data" :key="index" class="col-6 col-md-3 mb-2 pl-1 pr-1">
                                        <MobileCardViewProduct v-if="$device.isMobile" :item="item" />
                                        <CardViewProduct v-else :item="item" />
                                    </div>
                                </div>
                            </div>
                            <div v-if="pagination_show" class="row mt-3">
                                <div class="col-md-12 mb-3" align="center">
                                    <span class="total_record_block">Total records: {{ pagination_config.data.total }}</span>
                                </div>
                                <div class="col-md-12">
                                    <Pagination :config="pagination_config" />
                                </div>
                            </div>
                        </template>
                        <div v-else>
                            <EmptyContentBlock />
                        </div>
                    </div>

                    <RecommendedProducts :pp_custom="[[425,2],[768,3],[990,4]]" />
                    <HotProducts :pp_custom="[[425,2],[768,3],[990,4]]" />
                </div>
            </div>

            <!-- <template v-if="!pre_loader && data.length==0">
                <RecommendedProducts />
                <HotProducts />
            </template> -->
        </div>
    </div>
</template>
<script>
import FloatFilterBlock from './FloatFilterBlock'
import FilterItemsBlock from '@/components/content_display/FilerItemsBlock'
import CardViewProduct from '@/components/content_display/CardViewProduct'
import MobileCardViewProduct from '~/components/content_display/MobileCardViewProduct'
import CardViewProductPreLoader from '@/components/content_display/CardViewProductPreLoader'
import EmptyContentBlock from '@/components/content_display/EmptyContentBlock'
import RecommendedProducts from '@/pages/frontend/components/RecommendedProducts'
import HotProducts from '@/pages/frontend/components/HotProducts'
export default {
    name: 'DynamicPageContentBlock',
    components: {
        FloatFilterBlock,
        FilterItemsBlock,
        CardViewProduct,
        MobileCardViewProduct,
        CardViewProductPreLoader,
        EmptyContentBlock,
        RecommendedProducts,
        HotProducts
    },
    data(){
        return {
            pre_loader: true,
            pagination_show: false,
            data: [],
            float_filter_open: false,
            pagination_config: {
                data: [],
                lang: 'en',
                align: 'center',
                action: ''
            },
            cur_page: (this.$route.query.page>0?this.$route.query.page:1),
            limit: 20
        }
    },
    watch: {
        $route(to, from){
            this.float_filter_open = false
            this.load_req_data()
        }
    },
    mounted(){
        this.float_filter_open = false
        this.load_req_data()
    },
    methods: {
        async load_req_data(pg=this.cur_page){
            this.pre_loader = true;
            this.pagination_show = false
            this.data = [];            

            if(this.$parent.srch_keyword){
                let obj = {}; obj['keyword'] = this.$parent.srch_keyword;
                this.$router.push({ query: Object.assign({}, this.$route.query, obj) });
            }

            // console.log('Query', this.$route.query)

            let qry_str = '', getQueryObj = this.$route.query, queryObjLen = Object.keys(getQueryObj).length, srch_info_text = '';
            if(queryObjLen > 0){
                for(var key in getQueryObj){
                    qry_str = qry_str + (qry_str==''?'?':'&') + key + '=' + getQueryObj[key]
                    srch_info_text = srch_info_text + (srch_info_text==''?'':', ') + getQueryObj[key]
                }
            }else srch_info_text = 'All';

            // console.log('Get Strign', qry_str)

            this.$parent.breadcrumb_data = {
                pre_loader: true,
                srch_info_text: srch_info_text
            };

            this.$axios.get('/api/products/search' + qry_str + (this.limit>0? (qry_str==''?'?':'&') + 'limit=' + this.limit:'') + (pg>1?'&page=' + pg:''), this.$parent.header_config).then( (response) => {
                console.log('Get Data', response.data.data)
                if(response.data.data.length>0){
                    this.data = response.data.data
                    this.pagination_config.data = response.data.meta                    
                    this.pagination_show = true
                }
                
                this.$parent.breadcrumb_data.pre_loader = false
                this.pre_loader = false
                this.cur_page = pg
            }).catch(e => {
                console.log(e)                
                this.pre_loader = false;
            });
        }
    }
}
</script>
<style scoped>
    .content_wrapper_block{
        display: block;
        background-color: #fff;
        padding: 15px;
        box-shadow: 0 0 25px #ddd;
    }
    .content_list_block{
        padding: 2px 8px
    }
    .filter_block{
        display: block;        
    }
</style>