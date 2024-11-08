<template>
    <div class="nav_list_block">
        <template v-if="pre_loader">
            <div v-for="(n,i) in limit" :key="i" class="item_list loader_list">                
                <FormBlockLoader :cols="1" :height="20" :r1="true" :r2="false" :r1_w="100" :r2_w="0" :r1_h="15" :r2_h="0" />
            </div>
        </template>
        <template v-else-if="data.length>0">
            <div v-for="(item,index) in data" :key="index">
                <nuxt-link :to="{path: '/'+ $store.state.search_page_path +'?category=' + item.slug}" class="item_list">
                    <span class="icon">
                        <img v-if="item.icon" :src="item.icon" :title="item.category_name" :alt="item.category_name" />
                        <img v-else src="~/assets/images/empty-product.png" title="Default Image" alt="Default Image">
                        <!-- <i v-else class="fa fa-check"></i> -->
                    </span>                
                    <span class="title text_overflow max_one_line_allow">{{ item.category_name }}</span>
                    <i class="fa fa-angle-right"></i>
                </nuxt-link>
            </div>
        </template>
    </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
export default {
    name: 'NavListBlock',
    data(){
        return {
            pre_loader: false,
            data: [],
            user_access_token: this.$store.state.oauth_token.token,
            limit: 8
        }
    },
    mounted(){
        if($nuxt.isOnline){
            if(this.$store.state.category_info.get_data.length==0) this.load_data()
            else{
                this.data = this.$store.state.category_info.get_data
                localStorage.setItem('category_list', JSON.stringify(this.data))
            }
        }else{
            let getCacheData = localStorage.getItem('category_list')
            this.data = JSON.parse(getCacheData)
        }
    },
    methods: {
        ...mapActions({        
            getCategories: 'category_info/GET_DATA'
        }),
        async load_data(){
            // setup submitted data
            let config_data = {                
                access_token: this.user_access_token,
                limit: this.limit                
            }

            // content pre loader active
            this.pre_loader = true

            // call function for load data
            await this.getCategories(config_data)

            // get products list
            this.data = this.$store.state.category_info.get_data

            // cache store
            localStorage.setItem('category_list', JSON.stringify(this.data))

            // call for submit
            this.pre_loader = false
        }
    }
}
</script>
<style scoped>
    .item_list{
        display: flex;        
        padding: 10px 15px;
        font-size: 13px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
    }
    .loader_list > div{
        width: 100%;
    }
    .item_list > .title{
        align-self: center;
    }
    .item_list > .icon{
        align-self: center;
        margin-right: 10px;
        width: 20px; height: 20px;
        border-radius: 50%;
    }
    .item_list > .icon img{
        width: 100%; height: 100%;
        object-fit: cover;
    }
    .item_list > .icon i{
        border: 1px solid #ddd; text-align: center;
        width: 100%; height: 100%; color: #ccc;
        line-height: 18px; border-radius: 50%;
    }
    .item_list > i{
        align-self: center;
        margin-left: auto;
    }
</style>