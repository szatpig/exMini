<template>
    <div class="auth-container">
        <button open-type="getUserInfo" @getuserinfo="handleUser">微信用户一键登录</button>
    </div>
</template>

<script>
    import { wxAuthorize } from '@/utils/wxUtils';
    export default {
        name: "auth",
        data() {
            return {}
        },
        components: {},
        methods: {
            handleUser(e){
                console.log(e);
                this.$store.dispatch('userInfo',e.mp.detail.userInfo);
                wx.navigateBack({
                    delta: 1
                })
            }
        },
        computed: {},
        onLoad() {

        }
    }
</script>

<style lang="scss"></style>
