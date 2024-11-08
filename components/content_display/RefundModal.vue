<template>
    <div :class="['refund_drawer_view_block',{mobile_device:$device.isMobile}]">
        <div class="black_mask_overlay" @click="$parent.close_refund_modal"></div>
        <div class="content clearfix">
            <div class="header">
                <div class="info">
                    <i class="fa fa-stream"></i>
                    <span class="pl-2">Order Return Request</span>
                </div>
            </div>
            <div class="main_content_block">
                <!-- <pre>{{ getProductPhoto }}</pre> -->
                <div class="product_info">
                  <div class="image">
                    <template v-if="getProductPhoto">
                      <img :src="getProductPhoto.product_photo_data.content" :alt="getProductPhoto.product_photo_data.content_title" :title="getProductPhoto.product_photo_data.content_title" />
                    </template>
                  </div>
                  <div class="info">
                    <div class="title">{{ data.product_title }}</div>
                    <div class="qty">Qty: {{ data.qty }}</div>
                    <div class="price">Price: {{ $store.state.currency_info.symbol }} {{ data.price }}</div>
                  </div>
                </div>
                <div class="row mt-3">
                    <label class="col-md-12">Return Reason</label>
                    <div class="col-md-12">
                        <select v-model="formData.return_reason_id" name="language_type" class="form-control" @change="checkDtlReqStatus()">
                            <option value="">Choose One</option>
                            <template v-if="$parent.return_reason_types.length > 0">
                              <option v-for="(item,index) in $parent.return_reason_types" :value="item.id" :key="index">{{ item.reason_title }}</option>
                            </template>
                        </select>
                    </div>
                </div>
                <div class="row mt-3">
                    <label class="col-md-12">Description <template v-if="dtl_req_allow">(Required)</template><template v-else>(Optional)</template></label>
                    <div class="col-md-12">
                        <textarea-autosize
                            :placeholder="'Write here...'"
                            v-model="formData.description"
                            :min-height="30"
                            :max-height="450"
                        />
                    </div>
                </div>

                <div class="row mt-3">
                    <label class="col-md-12">Upload Images (Optional)</label>
                    <div class="col-md-12">
                      <div v-if="formData.photos.length > 0" class="photo_list">
                          <div v-for="(photo,index) in formData.photos" class="image_preview" :key="index">
                              <img :src="photo" />
                              <span @click="browseImage(index)">change</span>
                              <i class="close_btn" @click="remove_photo_item(index)">x</i>
                          </div>
                          <div v-if="formData.photos.length<photo_limit" class="add_more" @click="browseImage()"><i class="fa fa-plus"></i></div>
                      </div>
                      <div v-else class="default_image_upload_block" @click="browseImage()">
                          <i class="fa fa-images"></i>
                          <p class="mt-2">You can upload product photos for strong evidence</p>
                      </div>
                      <input style="display: none"  type="file" accept="image/*" @input="pickFile" ref="fileInput">
                    </div>
                </div>

                <hr />

                <div class="action_btn" align="right">
                    <span v-if="pre_loader">
                        <i class="fa fa-cog fa-spin"></i> Submitting...wait
                    </span>
                    <span v-else @click="return_request_submit()"><i class="fa fa-check-circle mr-1"></i> Request Submit</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RefundModalViewBlock',
    props: ['data','order_id'],
    data(){
        return {
            inputFile: '',
            sel_photo_index: '',
            base_url: process.env.BASE_URL,
            formData: {
                order_id: this.order_id,
                order_item_pk: this.data.id,
                return_reason_id: '',
                description: '',
                photos: []
            },
            dtl_req_allow: false,
            photo_limit: 6,
            pre_loader: false
        }
    },
    computed: {
        getProductPhoto: function(){
          return this.data.product_photo_info.length>0?this.data.product_photo_info[0]:''
        }
    },
    mounted(){
        document.body.classList.add('popup_open')
    },
    methods: {
        checkDtlReqStatus: function(){
          if(this.$parent.return_reason_types.length>0){
              this.$parent.return_reason_types.map(item => this.dtl_req_allow = (item.id==this.formData.return_reason_id && item.dtl_req?true:false))
          }
        },
        remove_photo_item: function(index){
            this.formData.photos.splice(index,1)
        },
        browseImage (index='') {
            this.sel_photo_index = index
            this.$refs.fileInput.click()
        },
        pickFile () {
            let elm = this
            let input = elm.$refs.fileInput
            let file = input.files
            if (file && file[0]) {
                let reader = new FileReader
                reader.onload = e => {
                    if(elm.sel_photo_index) elm.formData.photos[elm.sel_photo_index] = e.target.result
                    else elm.formData.photos.push(e.target.result)
                }
                reader.readAsDataURL(file[0])
                // this.$emit('input', file[0])
            }
        },
        return_request_submit: function(id){
            let url = '/api/product-return-request/store';

            if(this.formData.return_reason_id==''){
                this.$toast.error('Please choose return reason type', {icon: "Warning"});
                return false;
            }else if(this.dtl_req_allow && this.formData.description==''){
                this.$toast.error('Please enter reason description', {icon: "Warning"});
                return false;
            }

            if(confirm('Are you sure to submit it?')){
                this.pre_loader = true
                this.$axios.post(url, this.formData, this.$parent.header_config).then( async response => {
                    console.log(response)

                    if(response.data.status){

                        // await this.$swal("Good job!", "Data has been saved successfully.", "success")

                        this.$notify.success({
                            title: 'Good job!',
                            message: 'Product return request has been submitted successfully.',
                            position: 'bottomRight',
                            transitionIn: 'bounceInRight',
                            transitionOut: 'fadeOutLeft',
                            timeout: 1500
                        })

                    } else {
                        this.$toast.error(response.data.msg, {icon: "error_outline"})
                    }
                    this.pre_loader = false
                    this.$parent.load_data()
                    this.$parent.close_refund_modal()
                }).catch(e => {
                    this.$toast.error('Failed!!!', {icon: "error_outline"})
                    this.pre_loader = false
                });
            }
        }
    }
}
</script>
<style scoped>
    .refund_drawer_view_block{
        position: relative;
        z-index: 1001;
    }
    .black_mask_overlay{
        position: fixed;
        left: 0; bottom: 0;
        width: 100%; height: 100%;
        background-image: linear-gradient(to top, #000000cc, #66666680);
    }
    .image{
          position: relative;
          margin-top: 5px;
          width: 200px;
          height: 85px;
    }
    .image > .thumnail{
        width: 100%;
        float: left;
        border-radius: 5px;
        height: 100%;
        object-fit: cover
    }
    .default_image_upload_block{
        display: block;
        cursor: pointer;
        background: #f7f7f7;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 15px;
        text-align: center;
        font-size: 10px;
    }
    .default_image_upload_block > i{
        text-align: center;
        font-size: 42px;
        color: #ccc;
    }
    .photo_list{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px
    }
    .photo_list > div{
      width: 94px; height: 94px;
      background: #eee; border: 1px solid #ddd
    }
    .image_preview {
        position: relative;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        display: block;
        margin-top: 10px;
        cursor: pointer;
    }
    .image_preview > img{
      width: 100%; height: 100%; object-fit: contain;
    }
    .image_preview > span {
        position: absolute;
        text-align: center;
        color: white;
        background: #ff4200;
        padding: 0 10px;
        line-height: 18px;
        font-size: 10px;
        border-radius: 25px;
        cursor: pointer;
        opacity: 0;
        bottom: 40%;
        left: 25%;
        transition: all 0.4s;
    }
    .image_preview:hover span {
        opacity: 1;
    }
    .image_preview > .close_btn{
        position: absolute; right: -10px; top: -10px; text-align: center;
        width: 20px; height: 20px; font-size: 10px; color: #ff4200;
        background: #fff; border: 1px solid #ddd;
        border-radius: 50%; cursor: pointer;
        z-index: 1;
    }
    .add_more{
      text-align: center;
      line-height: 96px;
      font-size: 24px;
      color: #999;
      cursor: pointer;
    }

    .content{
        position: fixed;
        color: #333;
        background-color: #fff;
        width: 350px;
        height: 100%;
        /* overflow-y: auto; */
        left: 0;
        top: 0;
        box-shadow: 0 0 15px #333;
    }
    .mobile_device .content{
        width: 300px;
    }
    .label{
        font-size: 13px; font-weight: bold; color: #888;
        margin-bottom: 10px;
    }
    .header{
        display: block;
        height: 60px; padding: 0 15px;
        border-bottom: 1px solid #ddd;
        background-color: #f7f7f7;
    }
    .header > div{
        display: flex;
        height: 100%;
        font-size: 18px;
    }
    .header > div > i,
    .header > div > span{
        align-self: center;
    }
    .header > div > i{
        color: #999;
        font-size: 24px;
    }
    .main_content_block{
        position: absolute;
        top: 60px; left: 0;
        padding: 15px;
        width: 100%;
        height: calc(100% - 60px);
        overflow-y: auto;
    }
    .main_content_block label{
        font-size: 13px; font-weight: 600; color: #666
    }
    .main_content_block > .product_info{
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
    }
    .main_content_block > .product_info > .image{
        width: 75px;
        height: 55px;
        background-color: #eee;
        border: 1px solid #ddd
    }
    .main_content_block > .product_info > .image > img{
        width: 100%; height: 100%; object-fit: contain;
    }
    .main_content_block > .product_info > .info > .title{
        font-weight: 600;
    }
    .main_content_block.delivery_person{
        height: calc(100% - 120px);
    }
    .main_content_block select{
        font-size: 14px;
    }
    .main_content_block textarea{
        width: 100%;
        padding: 5px 7px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
        outline: none
    }
    .action_btn > span{
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        outline: 0;
        background-color: #0097f7;
        color: #fff;
        border: none;
        padding: 5px 15px;
        border-radius: 25px;
        cursor: pointer;
        transition: all .4s;
    }
    .loader{
        display: flex;
        height: 100%;
    }
    .loader > i,
    .loader > div{
        align-self: center;
    }
    @keyframes pulse {
        to {
            box-shadow: 0 0 0 20px rgba(71, 189, 71, 0.4);
        }
    }
</style>
