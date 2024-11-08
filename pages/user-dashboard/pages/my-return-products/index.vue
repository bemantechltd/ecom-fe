<template>
    <div :class="['my_return_products_block',{mobile_device:$device.isMobile}]">
        <div class="content_block">
            <ContentListMobile v-if="$device.isMobile" :data="contents" :content_loader="content_loader" ref="list_block" />
            <ContentList v-else :data="contents" :content_loader="content_loader" ref="list_block" />

            <div v-if="!$device.isMobile && pagination_show" class="row mt-3">
                <div class="col-md-12 mb-3" align="center">
                    <span class="total_record_block">Total records: {{ pagination_config.data.total }}</span>
                </div>
                <div class="col-md-12">
                    <Pagination :config="pagination_config" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ContentList from './content-list-view'
import ContentListMobile from './content-list-view-mobile'
export default {
    name: 'MyReturnProductsBlock',
    components: {
        ContentList,
        ContentListMobile
    },
    data(){
        return {
            cur_path: this.$route.path,
            content_loader: false,
            pagination_show: false,
            contents: [],
            pagination_config: {
                data: [],
                lang: 'en',
                align: 'center',
                action: ''
            },
            cur_page: (this.$route.query.page>0?this.$route.query.page:1),
            limit: 10,
            user_id: this.$store.state.auth_info.user_data.id,
            user_access_token: this.$store.state.auth_info.user_data.token
        }
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
    mounted(){
        if(this.edit_content_id || this.$route.query.action=='new') this.entry_form_open = true
        else this.load_data()
    },
    methods: {
        async load_data(pg=this.cur_page){
            let url = '/api/product-return-request/my-status'+ (this.limit>0?'?limit=' + this.limit:'');

            this.content_loader = true
            this.pagination_show = false
            this.contents = [];
            this.$axios.get(url, this.header_config).then( (response) => {
                console.log(response)
                if(response.data.data.length>0){
                    this.contents = response.data.data
                    this.pagination_config.data = response.data.meta
                    this.pagination_show = true
                }
                this.content_loader = false
                this.cur_page = pg
            }).catch(e => {
                this.$toast.error('Failed!!!', {icon: "error_outline"})
                this.content_loader = false
            });
        }
    }
}
</script>
<style scoped>
    .my_return_products_block{
        padding: 15px 15px 120px 15px
    }
    .content_block{
        display: block;
        padding: 15px;
    }
    .mobile_device .content_block{
        padding: 0
    }
</style>
