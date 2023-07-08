import base from "@/api/base";
import axios from "@/request/request";

const api={

    /*
    *   1.产品列表
    * page
    */
    getGoodsList(params){
        return axios.get(base.goodsList,{params})
    },
    /*
    2. 产品查询
    ?search=xxx&a=xxx
     */
    getGoodsSearch(params){
        return axios.get(base.goodsSearch,{params})
    },
    /*
    * 3.删除商品
    * id
    */
    deleteGoods(data){
        return axios.delete(base.deleteGoods+data+'/')
    },
    /*
    * 4.商品类目选择
    * a
    */
    goodsItemCategory(params){
        return axios.get(base.goodsItemCategory,{params})
    },
    /*
* 4.商品添加
* 参数：title   category sellPoint price num descs
*/
    addGoods(params){
        return axios.post(base.addGoods,params)
    },
    /*
  5. 商品修改 title id  category sellPoint price num descs
   */
    changeGoods(params) {
        return axios.patch(base.changeGoods+params.id+'/',params );
    },
    /*
    6. 登录   username password
    */
    login(params) {
        return axios.post(base.login, params);

    },

    // /*
    //   7. 用户权限  token
    //  */
    // permission(params) {
    //     return axios.get(base.permission, { params });
    // },
}


export default api;
