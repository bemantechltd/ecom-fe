<template>
    <div class="data_info_form_block">
        <template v-if="$parent.edit_status[column]">
            <div class="form_block edit_content">
                <span v-if="type=='dropdown'" :class="isize?isize:''">
                    <template v-if="onchange">
                        <select v-model="$parent.formData[column]" @change="$parent[onchange]">
                            <option value="">Choose One</option>
                            <option v-for="(item,index) in data" :key="index" :value="item[vf]">{{ item[tf] }}</option>
                        </select>
                    </template>
                    <template v-else>
                        <select v-model="$parent.formData[column]">
                            <option value="">Choose One</option>
                            <option v-for="(item,index) in data" :key="index" :value="vf?item[vf]:index">{{ tf?item[tf]:item }}</option>
                        </select>
                    </template>
                </span>

                <span v-else-if="type=='radio'" :class="['radio_item_list','square',isize?isize:'']">
                    <template v-for="(item,index) in data">
                        <span :key="index" :value="index" @click="$parent.formData[column]=index" :class="{active:$parent.formData[column]==index}"><span v-html="item.icon" class="mr-2"></span> {{ item.title }}</span>
                    </template>
                </span>

                <span v-else-if="type=='date'" :class="isize?isize:''">
                    <datetime type="date" input-class="date_input" v-model="$parent.formData[column]" zone="Asia/Dhaka" />
                </span>

                <span v-else-if="type=='textarea'" :class="['textarea',isize?isize:'']">
                    <textarea-autosize
                        :placeholder="placeholder"
                        v-model="$parent.formData[column]"
                        :min-height="30"
                        :max-height="450"
                        @keyup.enter="$parent.submit_form"
                    />
                </span>

                <span v-else :class="isize?isize:''"><input :type="type" :placeholder="placeholder" v-model="$parent.formData[column]" @keyup.enter="$parent.submit_form" @keyup="check_validate(column)" /></span>
                <!-- <span class="ml-2 remove" @click="edit_mode_off(column)"><i class="fa fa-times"></i></span> -->
                <!-- <span class="ml-2 save"><i class="fa fa-save"></i></span> -->
            </div>
            <div v-if="$parent.check_avail && $parent.check_avail[column] && $parent.check_avail[column]['status']">
                <span v-if="$parent.check_avail[column]['loader']" class="check_availability_loader">Checking...<i class="fa fa-cog fa-spin"></i></span>
                <template v-else-if="$parent.check_avail[column]['available']">
                    <div class="verify_ins_msg">Check {{ column }} for activation code</div>
                    <span class="verify_code"><input type="number" v-model="$parent.validate_code[column]" placeholder="Enter Code" min="1" /></span>
                    <span class="check_btn" @click="$parent.submitForActivate(column)"><i class="fa fa-check"></i> Activate</span>
                </template>
                <template v-else>
                    <div v-if="$parent.check_avail[column]['msg']" class="verify_ins_msg">{{ $parent.check_avail[column]['msg'] }}</div>
                    <span v-if="$parent.check_avail[column]['verified']" class="verify_msg"><i class="fa fa-check"></i> {{ column }} User verified and updated</span>
                    <span v-else-if="$parent.check_avail[column]['exist']" class="exist_msg"><em>Already exist.</em></span>
                    <span v-if="!$parent.check_avail[column]['verified']" class="check_btn" @click="$parent.checkAvailability(column)"><i class="fa fa-check"></i> Check available</span>
                </template>
            </div>
        </template>
        <div class="form_block view_content" v-else>
            <span v-if="$parent.formData[column]">
                <template v-if="type=='dropdown'">
                    <template v-for="(item,index) in data">
                        <span v-if="vf && tf && item[vf]==$parent.formData[column]" :key="index">{{ item[tf] }}</span>
                        <span v-else-if="index==$parent.formData[column]" :key="index">{{ item }}</span>
                    </template>
                </template>
                <template v-else-if="type=='radio'">{{ data[$parent.formData[column]][tf] }}</template>
                <template v-else-if="type=='date'">{{ $parent.formData[column] | luxon('dd-MM-yyyy') }}</template>
                <template v-else>{{ $parent.formData[column] }}</template>
            </span>
            <span v-else><em>[Not provided]</em></span>
            <span class="ml-2 edit" @click="$parent.edit_status[column]=true"><i class="fa fa-pen"></i></span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DataInfoFormBlock',
    props: ['column','type','placeholder','data','isize','vf','tf','onchange'],
    methods: {
        check_validate: function(column){
            if(this.$parent.need_validate && this.$parent.need_validate[column]){
                if(this.$parent.formData[column]!==this.$store.state.auth_info.user_data[column]){
                    this.$nextTick(() => {
                        this.reset_check_avail(column)
                        this.$parent.check_avail[column]['status'] = true
                    })
                }else{
                    this.$nextTick(() => {
                        this.reset_check_avail(column)
                    })
                }
            }
        },
        edit_mode_off: function(column){
            this.$parent.edit_status[column] = false
            if(this.$parent.check_avail[column]['status']){
                this.$parent.formData[column] = this.$store.state.auth_info.user_data[column]
                this.$nextTick(() => {
                    this.reset_check_avail(column)
                })
            }
        },
        reset_check_avail: function(column){
            this.$parent.check_avail[column]['status'] = false
            this.$parent.check_avail[column]['loader'] = false
            this.$parent.check_avail[column]['exist'] = false
            this.$parent.check_avail[column]['available'] = false
            this.$parent.check_avail[column]['msg'] = ''
        }
    }
}
</script>
<style scoped>
    .form_block{
        display: flex;
        min-height: 26px;
        width: 100%;
    }
    .form_block >>> select,
    .form_block >>> input,
    .form_block >>> textarea,
    .form_block >>> .date_input{
        border: 1px solid #ddd;
        font-size: 13px;
        border-radius: 3px;
        padding: 2px 5px;
        width: 100%;
    }
    .form_block >>> textarea{
        padding: 5px 10px;
    }
    .form_block > span{
        align-self: center;
    }
    .form_block > span.full{
        width: 100%;
    }
    .form_block > span.textarea{
        align-self: baseline;
        width: 100%;
    }
    .form_block > span.radio_item_list{
        align-self: baseline;
    }
    .form_block > span.radio_item_list.square > span{
        display: inline-block;
        padding: 8px 15px; margin: 0 10px;
        border: 1px solid #ddd; border-radius: 5px;
        cursor: pointer;
    }
    .form_block  > span.radio_item_list.square > span.active{
        border-color: #b64545; color: #b64545; background-color: #f7f7f7; font-weight: bold;
    }
    .form_block  > span.radio_item_list.square > span:first-child{
        margin-left: 0;
    }
    .form_block > span > i{
        color: #999; font-size: 12px;
        cursor: pointer;
    }
    .form_block > span.remove > i{
        color: #b64545;
    }
    .form_block > span.save > i{
        color: #538053;
    }
    .form_block > span.edit > i{
        color: #999;
    }
    .verify_ins_msg{
        display: block;
        font-size: 10px;
        margin-top: 5px;
    }
    span.exist_msg{
        display: inline-block;
        color: #f16837;
        font-size: 10px;
        font-weight: bold
    }
    span.verify_msg{
        display: inline-block;
        text-transform: capitalize;
        color: #2d7e2d;
        font-size: 10px;
        font-weight: bold
    }
    span.verify_code{
        display: inline-block;
        width: 85px; margin-right: 5px
    }
    span.verify_code > input {
        display: inline-block;
        width: 100%;
        font-size: 10px;
        border: 1px solid #ddd;
        padding: 0 5px;
        text-align: center;
        border-radius: 3px
    }
    span.check_btn{
        font-size: 10px;
        color: #fff;
        display: inline-block;
        background-color: #f16837;
        padding: 0px 10px;
        border-radius: 15px;
        cursor: pointer;
    }
    span.check_availability_loader{
        display: inline-block;
        font-size: 10px;
        color: #6374b1;
        font-weight: bold;
    }
</style>
