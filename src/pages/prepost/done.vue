<template>
    <div class="done-container">
        <div class="done-txt">您要寄件的地址{{address}}({{recommend}}),稍候会有同事与你联系，请保持您的电话畅通</div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "done",
        data() {
            return {}
        },
        components: {},
        methods: {},
        computed: {
            ...mapGetters([
                'address',
                'recommend'
            ])
        },
        onShow() {
        }
    }
</script>

<style lang="scss"></style>
