<template>
    <div class="content_item">
        <span class="remove_item_btn" @click="$parent.remove_prescription(sel_index)">x</span>
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
</template>
<script>
export default {
    name: 'PrescriptionGridViewBlock',
    props: ['item','sel_index']
}
</script>
<style scoped>
    .content_item{
        display: block;
        border: 1px solid #ddd;
        height: 190px
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
    .content_item .remove_item_btn{
        position: absolute;
        width: 20px;
        height: 20px;
        right: 0px;
        top: -5px;
        line-height: 16px;
        border-radius: 50%;
        border: 1px solid #ddd;
        cursor: pointer;
        text-align: center;
        background-color: #fff;
        font-size: 12px;
        color: #CD0000;
        transition: all 0.4s
    }
    .content_item .remove_item_btn:hover{
        background-color: #CD0000; color: #fff
    }
</style>