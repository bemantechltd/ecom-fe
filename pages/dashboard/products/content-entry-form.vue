<template>
    <div class="content_entry_form_block">
        <RainbowLoader v-if="req_submit" />
        <div class="row">
            <div class="col-md-8">
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
                    <div class="mb-4">
                        <label class="product_label">
                            <span>Product Title</span>
                            <span v-if="cur_slug!==formData.slug && duplicate_check && duplicate_found" class="warning"><i class="fa fa-check"></i> Already exist</span><span v-else-if="cur_slug!==formData.slug && duplicate_check" class="success"><i class="fa fa-check"></i> Available</span>
                            <span v-else>---</span>
                        </label>
                        <div class="product_info">
                            <input type="text" placeholder="Enter product title" class="form-control" v-model="formData.product_title" @keyup="slug_config" ref="product_title" />
                            <i v-if="duplicate_check_allow" @click="check_product_exist" :class="['fa','fa-sync',{'fa-spin':duplicate_check_preload}]"></i>
                        </div>
                        <div v-if="formData.slug"><small>URL: {{ product_page_url }}/{{ formData.slug }}</small></div>
                    </div>
                    <!-- <div class="mb-4">
                        <label>Slug</label>
                        <div><input type="text" placeholder="Enter slug" class="form-control" v-model="formData.slug" readonly /></div>
                    </div> -->

                    <div class="mb-4">
                        <ProductInfoSetup ref="product_info_list" />
                    </div>

                    <div class="mb-4">
                        <ProductPriceSetup ref="product_price_list" />
                    </div>

                    <div class="mb-4">
                        <ProductPhotoGallery ref="product_photo_list" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div v-if="form_loader" class="row">
                    <div class="col-md-12">
                        <div class="info_block">
                            <FormBlockLoader :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                            <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                            <FormBlockLoader class="mt-2" :cols="1" :height="65" :r1="true" :r2="true" :r1_w="50" :r2_w="100" :r1_h="20" :r2_h="25" />
                        </div>
                    </div>
                </div>
                <div v-else class="info_block">
                    <div class="item_block mb-4">
                        <label>Choose Categories</label>
                        <div class="list_block" ref="category_block">
                            <CategoryList v-if="$parent.category_list && $parent.category_list.length>0" :items="$parent.category_list" :cat_parent_ids="cat_parent_ids" :cat_ids="formData.cat_id" />
                        </div>
                    </div>
                    <div class="item_block mb-4">
                        <label>Choose Company</label>                        
                        <select v-model="formData.company_id" class="form-control parent-dropdown">
                            <option value="">Select One</option>
                            <template v-for="(item,index) in $parent.pharma_company_list" >
                                <option :key="index" :value="item.id">{{ item.company_name }}</option>
                            </template>
                        </select>
                    </div>                    
                    <div class="item_block mb-4">
                        <label>Choose Product Type</label>                        
                        <select v-model="formData.product_type_id" class="form-control parent-dropdown">
                            <option value="">Select One</option>
                            <template v-for="(item,index) in $parent.product_type_list" >
                                <option :key="index" :value="item.id">{{ item.type_title }}</option>
                            </template>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label>Generics</label>
                        <GenericsManagement />
                    </div>
                    <!-- <div class="mb-4">
                        <label>Treatment For (Disease)</label>
                        <DiseaseManagement />
                    </div> -->
                    <div class="mb-4">
                        <label>Tags</label>
                        <TagsManagement />
                    </div>
                    <div class="mb-4">
                        <label>Top Selected</label>
                        <SwithcBtn :status="formData.selected" :index="'selected'" />
                        <input type="hidden" v-model="formData.selected" />
                    </div>
                    <div class="mb-4">
                        <label>Registered</label>
                        <SwithcBtn :status="formData.registered" :index="'registered'" />
                        <input type="hidden" v-model="formData.registered" />
                    </div>
                    <div>
                        <label>Status</label>
                        <SwithcBtn :status="formData.status" :index="'status'" />
                        <input type="hidden" v-model="formData.status" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SwithcBtn from '@/components/action_buttons/SwitchBtn'
import CategoryList from './components/category-list'
import TagsManagement from './components/TagsManagement'
import DiseaseManagement from './components/DiseaseManagement'
import GenericsManagement from './components/GenericsManagement'
import ProductInfoSetup from './components/product-info-setup/index'
import ProductPriceSetup from './components/product-price-setup/index'
import ProductPhotoGallery from './components/product-photo-gallery/index'
export default {
    name: 'ContentEntryFromBlock',
    props: {
        edit_content_id: Number        
    },
    components: {
        SwithcBtn,
        CategoryList,
        TagsManagement,
        GenericsManagement,
        DiseaseManagement,
        ProductInfoSetup,
        ProductPriceSetup,
        ProductPhotoGallery
    },    
    data(){
        return {            
            product_info_type_list: [],
            product_price_type_list: [],
            cat_parent_ids: {},
            form_loader: false,
            cur_slug: '',
            formData: {
                product_title: '',
                slug: '',
                cat_id: {},
                company_id: '',
                product_type_id: '',
                product_infos: [],
                product_price_infos: [],
                product_photo_infos: [],
                tags: '',
                generics: '',
                disease: '',
                registered: true,
                selected: false,
                status: true
            },
            duplicate_check_allow: this.edit_content_id?false:true,
            duplicate_check_preload: false,
            duplicate_check: this.edit_content_id?true:false,
            duplicate_found: false,
            tags: [],
            generics: [],
            disease: [],
            req_submit: false,
            form_action: 'save'
        }
    },
    computed: {
        product_page_url () {
            return process.env.BASE_URL + '/' + this.$store.state.product_dtl_path
        },
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
    mounted(){
        if(this.edit_content_id) this.load_req_data(this.edit_content_id);
        if(this.$store.state.form_submit_status) this.formSubmit();                

        // load product types
        // this.load_product_types();

        $(document).on('click', '.item_block.active', function(){
            $(this).find('i').removeClass('fa-check-square active').addClass('fa-square');
            $(this).removeClass('active');
            $(this).addClass('inactive');
        });

        $(document).on('click','.item_block.inactive', function(){
            $(this).find('i').removeClass('fa-square').addClass('fa-check-square active');
            $(this).removeClass('inactive');
            $(this).addClass('active');
        });
    },
    methods: {
        switch_data(index,status){
            this.formData[index] = status
        },
        slug_config(){            
            this.formData.slug = this.$strSlug(this.formData.product_title)

            if(this.cur_slug==this.formData.slug){
                this.duplicate_check_allow = false
                this.duplicate_check = true
                this.duplicate_found = false
            }else{
                this.duplicate_check_allow = true
                this.duplicate_check = false
                this.duplicate_found = false
            }
        },
        check_product_exist(){
            let url = '/api/products/exist-check';
            this.duplicate_check_preload = true
            this.$axios.post(url, {                
                slug: this.formData.slug
            }, this.$parent.header_config).then( (response) => {
                console.log(response)
                if(response.data.status) this.duplicate_found = true
                else this.duplicate_found = false

                this.duplicate_check = true
                this.duplicate_check_preload = false
            }).catch(e => {
                this.$toast.error('Product duplicate check failed!!!', {icon: "error_outline"})
                this.duplicate_check = false
                this.duplicate_check_preload = false
            });
        },                        
        async load_product_info_types(){            
            let url = '/api/product-info-types';
            
            this.product_info_type_list = [];
            this.$axios.get(url, this.$parent.header_config).then( (response) => {
                console.log(response)
                this.product_info_type_list = response.data.data
            }).catch(e => {
                this.$toast.error('Product info type load failed!!!', {icon: "error_outline"})
            });        
        },
        async load_product_price_types(){            
            let url = '/api/product-price-types';
            
            this.product_price_type_list = [];
            this.$axios.get(url, this.$parent.header_config).then( (response) => {
                console.log(response)
                this.product_price_type_list = response.data.data
            }).catch(e => {
                this.$toast.error('Product price types load failed!!!', {icon: "error_outline"})
            });        
        },
        async load_req_data(id){
            this.form_loader = true;
            
            this.$axios.get('/api/products/edit/' + id, this.$parent.header_config).then( (response) => {
                console.log('Get Data', response.data.data)
                let getData = response.data.data;

                this.cur_slug = getData.slug

                /**
                 * Selected Categories
                 */
                let getCatIds = {};
                getData.cat_ids.forEach((v,i) => {
                    getCatIds[v.product_cat_id] = true
                });

                /**
                 *  Selected Generics
                 */
                let getGenerics = [], genericList = [];
                getData.generic_info.forEach((v,i) => {
                    getGenerics[i] = {};
                    getGenerics[i]['tiClasses'] = [];
                    getGenerics[i]['text'] = v.generics_data_info.generic_name
                    getGenerics[i]['tiClasses'][0] = 'ti-valid'
                    genericList.push(v.generics_data_info.generic_name)
                });
                this.generics = getGenerics

                /**
                 *  Selected Disease
                 */
                let getDisease = [], diseaseList = [];
                getData.disease_info.forEach((v,i) => {
                    getDisease[i] = {};
                    getDisease[i]['tiClasses'] = [];
                    getDisease[i]['text'] = v.disease_data_info.disease_title
                    getDisease[i]['tiClasses'][0] = 'ti-valid'
                    diseaseList.push(v.disease_data_info.disease_title)
                });
                this.disease = getDisease

                /**
                 * Product Infos data
                 */
                let getProductInfos = [];
                getData.product_infos.forEach((v,i) => {
                    let obj = {
                        index: i,
                        id: v.product_info_type_id,
                        title: v.product_info_type_data.type_title,
                        content: v.content
                    }

                    getProductInfos.push(obj);                    
                });
                
                /**
                 * Product price infos data
                 */
                let getProductPriceInfos = [];
                getData.product_price_infos.forEach((v,i) => {
                    let obj = {
                        index: i,
                        id: v.product_price_type_id,
                        title: v.product_price_type_data.type_title,
                        price: v.price,
                        discount_price: v.discount_price?v.discount_price:0,
                        min_qty: v.min_qty,
                        max_qty: v.max_qty,
                        remarks: v.remarks
                    }

                    getProductPriceInfos.push(obj);                    
                });

                /**
                 * Product photo infos
                 */
                let getProductPhotoInfos = [];
                getData.product_photo_infos.forEach((v,i) => {
                    if(v.product_photo_data) getProductPhotoInfos.push(v.product_photo_data);                    
                });
                
                /**
                 *  Selected Tags
                 */
                let getTags = [], tagList = [];
                getData.tag_info.forEach((v,i) => {
                    getTags[i] = {};
                    getTags[i]['tiClasses'] = [];
                    getTags[i]['text'] = v.tags_data_info.tag_title
                    getTags[i]['tiClasses'][0] = 'ti-valid'
                    tagList.push(v.tags_data_info.tag_title)
                });
                this.tags = getTags

                this.formData = {
                    product_title: getData.product_title,                
                    slug: getData.slug,
                    cat_id: getCatIds,
                    company_id: getData.company_id_info?getData.company_id_info.product_company_id:'',
                    product_type_id: getData.product_type_id_info?getData.product_type_id_info.product_type_id:'',
                    product_infos: getProductInfos,
                    product_price_infos: getProductPriceInfos,
                    product_photo_infos: getProductPhotoInfos,
                    generics: genericList,
                    disease: diseaseList, 
                    tags: tagList,
                    registered: getData.registered,
                    selected: getData.selected,
                    status: getData.status
                }

                this.form_loader = false;
                if(this.$route.query.action=='edit') this.form_action = 'update';
            }).catch(e => {
                console.log(e)
                this.$toast.error('Failed!!!', {icon: "error_outline"})
                this.form_loader = false;
            });
        },
        async formSubmit(){
            this.$parent.form_submit_state(false)

            if(this.formData.product_title.trim()==''){
                this.$toast.error('Please enter type title', {icon: "Warning"});
                this.$refs.product_title.focus();
                return false;
            } else if(this.formData.slug.trim()==''){
                this.$toast.error('Please enter slug', {icon: "Warning"});
                return false;
            } else if(Object.keys(this.formData.cat_id).length==0){
                this.$toast.error('Please choose category', {icon: "Warning"});
                this.$refs.category_block.focus();
                return false;
            } else if(!this.duplicate_check){
                this.$toast.error('Please check product availability', {icon: "Warning"});
                this.$refs.product_title.focus();
                return false;
            } else if(this.duplicate_found){
                this.$toast.error('This product has already inserted. Try another one.', {icon: "Warning"});
                this.$refs.product_title.focus();
                return false;
            }

            if(confirm('Are you sure to submit it?')){
                // setup submitted data
                let submit_data = {
                    id: this.$parent.user_id,
                    access_token: this.$parent.user_access_token,
                    data: this.formData,
                    action: this.form_action,
                    edit_id: this.edit_content_id
                }

                // call for submit
                this.req_submit = true;
                
                await this.$parent.productSubmit(submit_data);

                console.log('Get Data', this.$store.state.product.submit_data);
                
                this.req_submit = false;

                if(!this.$store.state.product.submit_data){
                    this.$toast.error(this.$store.state.product.submit_data.msg, {icon: "Warning"});
                    return false
                }else{
                    this.$parent.load_data();

                    await this.$swal("Good job!", "Data has been "+ (this.form_action == 'save'?'inserted':'updated') +" successfully.", "success");

                    if(this.form_action == 'save'){
                        this.form_reset();
                        this.$parent.add_new_entity(false)
                    }
                }
            }            
        },
        form_reset(){
            this.formData = {
                product_title: '',
                slug: '',
                cat_id: {},
                company_id: '',
                product_type_id: '',
                product_infos: [],
                product_price_infos: [],
                product_photo_infos: [],
                tags: '',
                generics: '',
                disease: '',
                registered: true,
                selected: false,
                status: true
            }
        }
    }
}
</script>
<style scoped>
    .product_label{
        display: flex;
        height: 20px;
    }
    .product_label > span{
        align-self: center;        
    }
    .product_label > span:last-child{
        margin-left: auto;
        font-size: 12px;
        color: #ccc
    }
    .product_label > span.warning{
        color: #CD0000
    }
    .product_label > span.success{
        color: #336633
    }
    .product_info{
        display: flex;
        height:40px;
        background-color: #eee;
        border: 1px solid #ddd;
        border-radius: 3px;
        transition: all 0.4s;
    }    
    .product_info > input{
        border: none;
        outline: none;
    }
    .product_info > i{
        margin-left: auto;
        align-self: center;        
        width: 50px; text-align: center;
        background-color: #eee;
        cursor: pointer;
        transition: all 0.4s;
    }
    .product_info > i:hover{
        font-size: 12px;
    }
    .form_block,.info_block{
        display: block;
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 20px;
    }
    .list_block{
        border: 1px solid #dddddd;
        overflow-y: auto;
        height: 140px;
        padding: 5px;
        border-radius: 5px
    }
    .info_block .parent-dropdown{
        margin: 0; padding: 0
    }
    .info_block .parent-dropdown >>> option{
        padding: 10px
    }
</style>