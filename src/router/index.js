import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout"
import ChePai from "@/views/ChePai/index.vue";
import MoHu from "@/views/MoHu";
import ShiJian from "@/views/ShiJian";


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                component: ChePai,
                name: "chepai",
                meta: {
                    // activeMenu: '/',
                    title: "反向查询",
                }
            },
            {
                path: '/time',
                component: ShiJian,
                name: "time",
                meta: {
                    title: "时间段查询"
                }
            },
            {
                path: '/obscure',
                component: MoHu,
                name: "obscure",
                meta: {
                    title: "模糊查询"
                }
            }
        ],
    },


];
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
// 导出了创建的Vue Router实例，以便在其他地方使用
export default router;