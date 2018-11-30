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
             <cover-view class="marker-address">
                 <cover-view class="marker-address-text">{{address}}</cover-view>
                 <cover-view class="marker-address-detail">{{ recommend }}</cover-view>
                 <navigator url="/pages/prepost/done">确定</navigator>
             </cover-view>
        </map>
    </div>
</template>
<script>
    import { wxAuthorize,reverseGeocoder } from '@/utils/wxUtils';
    import { mapGetters,mapActions } from 'vuex'
    const QQMapWX = require('./../../../static/js/qqmap-wx-jssdk.min.js');
    const qqmapsdk = new QQMapWX({
        key: 'LAJBZ-KTMW4-NLVUV-X5PSU-TDH4S-OMFJV'
    });
    let touchTimeStamp = 0;
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
            ...mapActions([
                'saveAddress'
            ]),
            getLocation(){
               wxAuthorize('scope.userLocation').then((data) =>{
                   wx.getLocation({
                       type:'gcj02',
                       success:(data)=>{
                           console.log(data);
                           this.map.lng = data.longitude;
                           this.map.lat = data.latitude;
                           this.mapCtx = wx.createMapContext("map-express");
                           this.getAddressTxt(qqmapsdk,this.map);
                       }
                   })
               }).catch(e => {

               });

           },
            handleRegionChange(e){
                console.log('handleRegionChange', e)
            },
            handleRegionBegin({ timeStamp }){
                touchTimeStamp = timeStamp;
            },
            handleRegionEnd({ timeStamp }){
                //判断移动时间是否太短
                if (timeStamp - this.touchTimeStamp < 50) return false;

                this.mapCtx.getCenterLocation({
                    success:  async (data) => {
                        let _lng = data.longitude - this.map.lng;
                        let _lat = data.latitude - this.map.lat;
                        //判断移动距离是否太短
                        if (Math.abs(_lng) < 0.0011 && Math.abs(_lat) < 0.0011) return false;
                        this.map.lng = data.longitude;
                        this.map.lat = data.latitude;
                        // let _data = await reverseGeocoder(qqmapsdk,this.map);
                        // console.log(_data)
                        this.getAddressTxt(qqmapsdk,this.map);
                    }
                })
            },
            getAddressTxt(qqmapsdk,{lat,lng}){
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: lat,
                        longitude: lng
                    },
                    get_poi:1,
                    success:(data) =>{
                        if(data.status == 0){
                            this.saveAddress(data.result);
                        }
                        console.log('reverseGeocoder:',data);
                    },
                    fail:(e)=>{
                        console.log('reverseGeocoderError:',e);
                    }
                })
            }
        },
        computed: {
            ...mapGetters([
                'address',
                'recommend',
                'pois'
            ])
        },
        onShow() {
          this.getLocation()
        }
    };
</script>

<style lang="scss">
  .post-container{
      #map-express{
          height: calc(100vh - 80px);
          width: 100%;
      }
      .center-marker{
          position: fixed;
          left: 50%;
          top: calc(50% - 52px);
          transform: translate(-50%,-50%);
          width:35px;
          height: 35px;
          .marker-img{
              width: 35px;
              height: 35px;
          }
      }
      .marker-txt{
          position: fixed;
          left: 50%;
          top: calc(50% - 82px);
          transform: translate(-50%,-50%);
          font-size: 12px;
          padding: 4px 8px;
          text-align: center;
          border-radius: 50%;
          line-height: 12px;
          color: #43c3ff;
      }
      .marker-address{
          position: fixed;
          bottom:0px;
          left: 0;
          width: 100%;
          height: 80px;
          background: #fff;
          border-bottom: 1px solid #f1f1f1;

      }
  }

</style>
