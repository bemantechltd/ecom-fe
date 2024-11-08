<template>
    <div class="prescription_list_block">
        <div v-if="sel_image_content" class="prescription_view_black_overlay" @click="sel_image_content=''">
            <div class="img"><img :src="sel_image_content" /></div>
        </div>        
        <div class="row">
            <div v-for="(item,key) in data" class="col-6" :key="key">
                <div class="content_item">
                    <div class="black_shade"><i class="fa fa-eye" @click="sel_image_content=item.file_content"></i></div>
                    <div class="img">
                        <img :src="item.file_content" />
                    </div>
                    <div class="prescription_info">
                        <div class="text_overflow max_one_line_allow">{{ item.prescription_title }}</div>
                        <label>Patient</label>
                        <div class="text_overflow max_one_line_allow"><em>Name: {{ item.patient_name }}</em></div>
                        <div class="text_overflow max_one_line_allow"><em>Age: {{ item.patient_age }}</em></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- {{ data }} -->
    </div>
</template>
<script>
export default {
    name: 'PrescriptionListBlock',
    props: ['data'],
    data(){
        return {
            sel_image_content: ''
        }
    }
}
</script>
<style scoped>
    .prescription_view_black_overlay{
        position: fixed;
        background-color: rgba(0,0,0,0.50196);
        overflow-y: auto;
        width: 100%;
        height: 100%;
        text-align: center;
        z-index: 3;
        left: 0;
        top: 0;
    }
    .prescription_view_black_overlay .img{
        position: absolute; max-width: 80%; height: 90%; top: 5%; left: 10%; right: 0;
    }
    .prescription_view_black_overlay .img > img{
        background-color: #fff; padding: 5px; border-radius: 5px;
        max-width: 100%; max-height: 100%; object-fit: contain
    }
    .content_item{
        display: block; position: relative;
        border: 1px solid #ddd;
        height: 190px
    }
    .content_item .black_shade{
        position: absolute;
        left: 0; top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: #00000060;
        text-align: center;
        line-height: 190px;
        transition: all 0.4s;
        z-index: 1
    }
    .content_item:hover .black_shade{
        opacity: 1
    }
    .content_item .black_shade > i{
        width: 36px; height: 36px; line-height: 36px; background-color: #fff; border-radius: 50%;
        cursor: pointer; z-index: 2
    }
    .content_item > .icon{
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 190px;
        font-size: 18px;
        color: #ccc;
    }
    .content_item > .img{
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #ddd;
    }
    .prescription_info{
        display: block; padding: 5px; font-size: 12px
    }
    .prescription_info > label{
        margin: 0;
        font-weight: bold;
        color: #999;
        margin-top: 5px;
    }
    .content_item > .img > img{
        width: 100%; height: 100%; object-fit: contain
    }
</style>