import base from "@/api/base";
import axios from "@/request/request";

const api = {

    /*
    *   1.车牌查询
    * ?search=xxxxx
    */
    search_ChePai(params) {
        return axios.get(base.chepai, {params})
    },

}


export default api;
