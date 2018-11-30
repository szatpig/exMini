<template>
    <div class="account-container">
        <div class="account-info">
            <img :src="userInfo.avatarUrl" alt="">
            <span>{{userInfo.nickName}}</span>
        </div>
    </div>
</template>

<script>
    import { wxAuthorize,reverseGeocoder } from '@/utils/wxUtils';
    import { mapState } from 'vuex'
    export default {
        name: "account",
        data() {
            return {};
        },
        components: {},
        methods: {},
        computed: {
            ...mapState({
                userInfo:state => state.user.userInfo
            })
        },
        onshow(){
           console.log(this.userInfo)
        },
        onLoad() {
            if(!this.$store.state.user.userInfo){
                wx.navigateTo({url:'/pages/user/auth'});
            }
        }
    };
</script>

<style lang="scss"></style>
