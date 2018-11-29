<template>
    <div class="post-container">
        <map id="map-express"
             :longitude="map.lng"
             :latitude="map.lat"
             subkey="LAJBZ-KTMW4-NLVUV-X5PSU-TDH4S-OMFJV"
             enable-rotate="true"
             scale="14"
             @regionchange="handleRegionChange"
             @begin="handleRegionBegin"
             @end="handleRegionEnd"
             show-location >
             <cover-view class="marker-txt">您在这里</cover-view>
             <cover-view class="center-marker">
                    <cover-image class="marker-img" src="./../../images/location.png"></cover-image>
             </cover-view>
             <cover-view>
                 <cover-view></cover-view>
             </cover-view>
        </map>
    </div>
</template>
<script>
    import { wxAuthorize,reverseGeocoder } from '@/utils/wxUtils'
    const QQMapWX = require('./../../../static/js/qqmap-wx-jssdk.min.js');
    const qqmapsdk = new QQMapWX({
        key: 'LAJBZ-KTMW4-NLVUV-X5PSU-TDH4S-OMFJV'
    });
    export default {
        name: "post",
        data() {
            return {
                 map:{
                   lng:113.324520,
                   lat:23.099994
                 },
                 mapCtx:null
            };
        },
        components: {},
        methods: {
           getLocation(){
               wxAuthorize('scope.userLocation').then((data) =>{
                   wx.getLocation({
                       type:'gcj02',
                       success:(data)=>{
                           console.log(data);
                           this.map.lng = data.longitude;
                           this.map.lat = data.latitude;
                           this.mapCtx = wx.createMapContext("map-express");
                       }
                   })
               }).catch(e => {

               });

           },
            handleRegionChange(e){
                console.log('regionChange', e)
            },
            handleRegionBegin(e){
                console.log('regionChange', e)
            },
            handleRegionEnd(e){
                // console.log('regionChange', e)
                this.mapCtx.getCenterLocation({
                    success:(data) => {
                        // console.log(data);
                        this.map.lng = data.longitude;
                        this.map.lat = data.latitude;
                        qqmapsdk.reverseGeocoder({
                            location: {
                                latitude: this.map.lat,
                                longitude: this.map.lng
                            },
                            success:(data) =>{
                                console.log('reverseGeocoder:',data);
                            },
                            fail:(e)=>{
                                console.log('reverseGeocoder:',e);
                            }
                        })

                        // reverseGeocoder(qqmapsdk,_data).then(data => {
                        //     console.log('reverseGeocoder:',data);
                        // })
                    }
                })
            }
        },
        computed: {},
        onShow() {
          this.getLocation()
        }
    };
</script>

<style lang="scss">
  .post-container{
      #map-express{
          height: 100vh;
          width: 100%;
      }
      .center-marker{
          position: fixed;
          left: 50%;
          top: calc(50% - 10px);
          transform: translate(-50%,-50%);
          width:35px;
          height: 35px;
          overflow: auto;
          .marker-img{
              width: 35px;
              height: 35px;
          }
      }
      .marker-txt{
          position: fixed;
          left: 50%;
          top: calc(50% - 38px);
          transform: translate(-50%,-50%);
          font-size: 12px;
          padding: 4px 8px;
          text-align: center;
          border-radius: 50%;
          line-height: 12px;
          color: #43c3ff;
      }
  }

</style>
