<template>
    <div class="prescription_info_block">
        <div class="black_mask_overlay" @click="$parent.my_prescription_list_open=false"></div>
        <div class="content clearfix">
            <div class="info_header">
                <div class="info">
                    <h5>My prescription list</h5>
                </div>
                <div class="img">                    
                    <i class="fa fa-buildings" />
                </div>
            </div>
            <div class="list">
                <MyPrescriptionsBlock :req_sel_prescription="true" />
            </div>
        </div>
    </div>
</template>
<script>
import MyPrescriptionsBlock from '~/pages/user-dashboard/pages/my-prescriptions'
export default {
    name: 'PresctiptionInfoBlock',
    components: {
        MyPrescriptionsBlock
    },
    data() {
        return {
            req_default_setup_index: '',
            sel_prescription_info: ''
        }
    },
    watch: {
        sel_prescription_info: function(data){
            // console.log('Get Prescription', data)
            this.$parent.change_prescription(data)            
        }
    }
}
</script>
<style scoped>
    .my_address_list_block{
        display: block;
    }
    .black_mask_overlay{
        position: fixed;
        left: 0; bottom: 0;
        width: 100%; height: 100%;
        z-index: 999;
        background-image: linear-gradient(to top, #000000cc, #66666680);
    }
    .content{
        position: fixed;
        background-color: #fff;
        min-width: 300px;
        max-width: calc(100% - 350px);
        height: 100%;
        overflow-y: auto;
        left: 0;
        top: 0;
        box-shadow: 0 0 15px #333;
        z-index: 1000;
    }
    .info_header{
        display: flex;
        height: 60px; padding: 0 15px;
        border-bottom: 1px solid #ddd;
    }
    .info_header .img{                
        align-self: center;
        margin-left: auto;
    }
    .info_header .img >>> img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .info_header .img >>> i{
        font-size: 24px;
        color: #aaa;        
    }
    .info_header .info{        
        align-self: center;
    }
    .info_header .info h4{
        margin: 0;
        font-size: 18px;
    }
    .info_header .info sup{
        font-size: 10px;
        padding: 3px 10px;
        /* border: 1px solid #ddd; */
        border-radius: 25px;
        background-color: #f16837;
        color: #fff;
    }
</style>