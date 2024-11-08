
<template>
    <div :class="['return_request_action_drawer_view_block',{mobile_device:$device.isMobile}]">
        <div class="black_mask_overlay" @click="$parent.close_action_block"></div>
        <div class="content clearfix">
            <div v-if="pre_loader" class="preloader_block">
                <div class="content_loader">
                    <span>Loading...</span>
                    <i class="fa fa-cog fa-spin"></i>
                </div>
            </div>
            <div class="header">
                <div class="info">
                    <i class="fa fa-notes-medical"></i>
                    <span>Status Update Form</span>
                </div>
            </div>
            <div class="main_content_block">
                <label>Choose One</label>
                <div class="choose_action">
                    <div @click="current_action==2?current_action=1:2">
                        <i v-if="current_action==1" class="far fa-check-circle"></i>
                        <i v-else class="far fa-circle"></i>
                        <span>Accept</span>
                    </div>
                    <div @click="current_action==1?current_action=2:1">
                        <i v-if="current_action==2" class="far fa-check-circle"></i>
                        <i v-else class="far fa-circle"></i>
                        <span>Reject</span>
                    </div>
                </div>
                <template v-if="current_action==2">
                    <label class="mt-3">Why do you reject it ?</label>
                    <div class="reject_reason_block">
                        <textarea-autosize
                          :placeholder="'Write here...'"
                          v-model="reject_reason"
                          :min-height="30"
                          :max-height="450"
                        />
                    </div>
                </template>
                <template v-else>
                    <label class="mt-3">Choose One</label>
                    <div class="choose_action">
                        <div @click="current_accept_action==2?current_accept_action=1:2">
                            <i v-if="current_accept_action==1" class="far fa-check-circle"></i>
                            <i v-else class="far fa-circle"></i>
                            <span>Exchange</span>
                        </div>
                        <div @click="current_accept_action==1?current_accept_action=2:1">
                            <i v-if="current_accept_action==2" class="far fa-check-circle"></i>
                            <i v-else class="far fa-circle"></i>
                            <span>Refund</span>
                        </div>
                    </div>
                </template>

                <hr />

                <div class="action_btn" align="right">
                    <span v-if="pre_loader">
                        <i class="fa fa-cog fa-spin"></i> Submitting...wait
                    </span>
                    <span v-else @click="request_update()"><i class="fa fa-check-circle mr-1"></i> Request Update</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ReturnRequestActionDrawerViewBlock',
    props: ['order_id','req_order_id','req_id'],
    data(){
        return {
            pre_loader: false,
            order_updated: false,
            current_action: 1,
            current_accept_action: 1,
            reject_reason: ''
        }
    },
    mounted(){
        document.body.classList.add('popup_open')
        // this.getDataList = this.data
    },
    methods: {
        fcm_notification_send: function($registration_ids){
            let url = process.env.FCM_NOTIFICATION_URL
            let header_config = {
                headers: {
                    'Authorization': 'Key=' + process.env.FCM_NOTIFICATION_AUTH_KEY,
                    'Content-Type': 'application/json'
                }
            }
            let body_msg = 'Welcome'

            if(this.order_updated) body_msg = 'Status of return request of #' + this.req_order_id + ' has been updated'
            let formData = JSON.stringify({
                "notification": {
                    "title": process.env.APP_NAME,
                    "body": body_msg,
                    "click_action": process.env.BASE_URL,
                    "icon": process.env.BASE_URL + "/icon.png",
                    "type": "timeline"
                },
                "registration_ids": $registration_ids
            })


            this.$axios.post(url, formData, header_config).then( response => {
                console.log(response)
                if(response.data.success){

                    this.$notify.success({
                        title: 'Success',
                        message: 'Notification has been sent to customer',
                        position: 'bottomRight',
                        transitionIn: 'bounceInRight',
                        transitionOut: 'fadeOutLeft',
                        timeout: 1500
                    })

                    this.order_updated = false

                } else {
                    this.$toast.error(response.data.msg, {icon: "error_outline"})
                }
            }).catch(e => {
                this.$toast.error('Failed!!!', {icon: "error_outline"})
                this.pre_loader = false
            });
        },
        request_update: function(id){
            if(this.current_action==2 && this.reject_reason=='') {
                this.$toast.error('Please enter the reject reason', {icon: "Warning"});
                return false;
            }
            if(confirm('Are you sure to update the request?')){
                let url = '/api/product-return-request/update/' + this.req_id;
                let formData = {
                  order_id: this.order_id,
                  status: this.current_action,
                  reject_reason: this.reject_reason,
                  accept_status: this.current_accept_action
                }

                this.pre_loader = true
                this.$axios.post(url, formData, this.$parent.$parent.header_config).then( async response => {
                    console.log(response)

                    if(response.data.status){

                        this.order_updated = true

                        this.$notify.success({
                            title: 'Good job!',
                            message: 'The request has been updated successfully.',
                            position: 'bottomRight',
                            transitionIn: 'bounceInRight',
                            transitionOut: 'fadeOutLeft',
                            timeout: 1500
                        })

                        if(response.data.fcm_token_data.length>0){
                            let getFcmTokenData = response.data.fcm_token_data
                            let getFcmTokenList = []
                            getFcmTokenData.forEach(v => {
                                getFcmTokenList.push(v.token)
                            });

                            this.fcm_notification_send(getFcmTokenList)
                        }

                        this.$parent.$parent.load_data();

                    } else {
                        this.$toast.error(response.data.msg, {icon: "error_outline"})
                    }
                    this.pre_loader = false
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
    .return_request_action_drawer_view_block{
        position: relative;
        z-index: 1001;
    }
    .black_mask_overlay{
        position: fixed;
        left: 0; bottom: 0;
        width: 100%; height: 100%;
        background-image: linear-gradient(to top, #000000cc, #66666680);
    }
    .content{
        position: fixed;
        color: #333;
        background-color: #eee;
        width: 350px;
        height: 100%;
        overflow-y: auto;
        right: 0;
        top: 0;
        box-shadow: 0 0 15px #333;
        transition: all 0.4s;
    }
    .mobile_device .content{
        width: 300px;
    }
    .preloader_block{
        position: absolute;
        width: 100%; height: 100%;
        background-color: #ffffff80;
        z-index: 5
    }
    .preloader_block .content_loader{
        display: block;
        width: 100%;
        padding: 15px;
        text-align: center;
        margin-top: 45%;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        box-shadow: 0 0 5px #ccc;
        background-color: #fff;
    }
    .label{
        font-size: 13px; font-weight: bold; color: #888;
        margin-bottom: 10px;
    }
    .header{
        display: flex;
        height: 60px; padding: 0 15px;
        border-bottom: 1px solid #ddd;
        background-color: #f7f7f7;
    }
    .header > div{
        align-self: center;
        font-size: 18px;
        width: 100%;
    }
    .header > div > i{
        color: #999; margin-right: 5px;
    }
    .header > div.cancel_btn{
        margin-left: auto;
        text-align: right;
    }
    .header > div.cancel_btn > span{
        display: inline-block;
        padding: 2px 10px;
        font-size: 10px;
        font-weight: bold;
        color: #fff;
        background-color: #CD0000;
        cursor: pointer;
        border-radius: 25px;
        transition: all 0.4s
    }
    .header > div.cancel_btn > span:hover{
        background-color: #CC0000; color: #f7f7f7
    }
    .main_content_block{
        position: absolute;
        top: 60px; left: 0;
        width: 100%; padding: 20px;
        height: calc(100% - 60px);
        overflow-y: auto;
    }
    .main_content_block label{
        font-size: 13px; font-weight: 600; color: #666
    }
    .main_content_block > .choose_action{
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .main_content_block > .choose_action > div{
        display: flex;
        gap: 5px;
        align-items: center;
        cursor: pointer;
    }
    .reject_reason_block > textarea{
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
</style>
