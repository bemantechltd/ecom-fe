<template>
    <div :class="['seach_input_block',{mobile_device:$device.isMobile},{float_menu:$store.state.nav_bar_float}]">        
        <i v-if="listening" class="fa fa-assistive-listening-systems"></i>
        <i v-else class="fa fa-search"></i>
        <input type="input" v-model="$parent.srch_keyword" :placeholder="listening?listening_placeholder:srch_placeholder" @keyup.enter="search_items" />
        <SpeechRecognition :config="custom_config" />
    </div>
</template>
<script>
import SpeechRecognition from '@/components/SpeechRecognition'
export default {
    name: 'SearchInputBlock',
    components: {
        SpeechRecognition        
    },
    data() {
        return {
            listening: false,
            listening_placeholder: 'Listening, speak for search...',
            srch_placeholder: 'generic name, medicine name etc',
            srch_keyword: '',            
            custom_config: {
                lang: 'en-US',
                // lang: 'bn-BD',
                confidence_level: '', // '0.6'
                action: ''
            },
        }
    },
    watch: {
        srch_keyword: function(val){
            this.$parent.srch_keyword = val
        }        
    },
    methods: {
        search_items: function(){
            if(this.$parent.srch_keyword){                
                this.$parent.load_products()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .seach_input_block{
        position: relative; width: 100%;
        display: flex; padding: 0 4px 0 10px;
        background-color: $light_white;
        border: 1px solid $light_ash;
        /* margin-top: 7px; */
        height: 30px; border-radius: 25px;
    }
    .seach_input_block.float_menu{
        margin-left: 0;
    }
    .seach_input_block.mobile_device.float_menu{
        margin-left: 25px;
    }
    .seach_input_block > input{
        align-self: center; padding: 0 10px; height: 100%;
        color: $dark_ash; width: 100%; border: none; background-color: transparent;
    }
    .seach_input_block > i{
        align-self: center;
        display:inline-block; font-size: 16px; color: $ash;
    }
</style>
<style scoped>
    .seach_input_block >>> .speech_recongition_block{
        display: inline-block; align-self: center; font-size: 16px; color: #ccc;   
    }
    .seach_input_block >>> .speech_recongition_block .action_btn{
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 14px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.4s;
    }
    .seach_input_block >>> .speech_recongition_block .action_btn.active,
    .seach_input_block >>> .speech_recongition_block .action_btn:hover{
        font-size: 13px;
        background-color: #CD0000;
        color: #f7f7f7;
        border-color: #CD0000;
    }
</style>