import base from "@/api/base";
import axios from "@/request/request";

const api = {

    /*
    *   1.车牌查询
    * ?search=xxxxx
    */
    search_ChePai() {
        console.log('查询的路由为：', base.chepai);
        return axios.get(base.chepai)
    },

    /*
    *   2.根据时间段 车牌查询
    * params={startTime: '',endTime: ''}
    */
    search_time_ChePai(params) {
        return axios.get(base.time_chepai, {params})
    },
    get_collectionCode() {
        return axios.get(base.collectionCode)
    }
}


export default api;
