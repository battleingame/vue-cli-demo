<template>
    <div class="board-wrapper">
        <header class="board-header">{{title}}</header>
        <section class="board-body">
            <div class="honor-wrapper">
                <div class="second honor">
                    <div class="img">
                        <img :src="require('@/assets/png/second.png')" alt />
                    </div>
                    <div class="text-wrapper">
                        <div class="name animated fadeIn" v-show="name.second">{{name.second}}</div>
                    </div>
                </div>
                <div class="first honor">
                    <div class="img">
                        <img :src="require('@/assets/png/first.png')" alt />
                    </div>
                    <div class="text-wrapper">
                        <div class="name animated fadeIn" v-show="name.first">{{name.first}}</div>
                    </div>
                </div>
                <div class="third honor">
                    <div class="img">
                        <img :src="require('@/assets/png/third.png')" alt />
                    </div>
                    <div class="text-wrapper">
                        <div class="name animated fadeIn" v-show="name.third">{{name.third}}</div>
                    </div>
                </div>
            </div>
            <div class="list-wrapper">
                <li class="list-item list-header">
                    <div class="rank">排名</div>
                    <div class="name">姓名</div>
                    <div class="waihu relative">
                        外呼通话数
                        <div class="header-svg" v-show="form.sortField==='total_calls_offered'">
                            <img src="@/assets/svg/shaixuan.svg" alt />
                        </div>
                    </div>
                    <div class="successNum relative">
                        {{type ===1 ?'成功招募医生数':'成功覆盖医生数'}}
                        <div class="header-svg" v-show="form.sortField==='success_hcp_num'">
                            <img src="@/assets/svg/shaixuan.svg" alt />
                        </div>
                    </div>
                    <div class="jiange relative">
                        平均通话间隔
                        <div class="header-svg" v-show="form.sortField==='avg_interval'">
                            <img src="@/assets/svg/shaixuan.svg" alt />
                        </div>
                    </div>
                    <div class="time relative">
                        总通话时长
                        <div class="header-svg" v-show="form.sortField==='total_call_time'">
                            <img src="@/assets/svg/shaixuan.svg" alt />
                        </div>
                    </div>
                </li>
                <ul class="main-wrapper">
                    <content-Item v-for="(item ) in list" :key="item.i" :listItem="item" :active='form.sortField'/>
                </ul>
                <ul class="bottom">
                    <Item v-for="(item) in bottomN" :key="item.i" :listItem="item" :active='form.sortField' />
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
import { queryDrugUserWorkData } from "@/api/kanban";
import Item from "./Item.vue";
import contentItem from "./contentItem";
export default {
    props: {
        query: {
            type: String,
            default: "success_hcp_num"
        },
        last: Array,
        title: String,
        form: {
            type: Object,
            default: () => {
                return {
                    // sortField: "成功医生数",
                    uninvolvedIds: [],
                    page: 1,
                    pageSize: 10
                };
            }
        },
        type: {
            type: Number,
            default: () => {
                return 1;
            }
        },
        changeTime: Function
    },
    components: { Item, contentItem },
    data() {
        return {
            list: [],
            pageTimer: null,
            bottomN: [],
            data: {},
            loading: null,
            name: {
                first: null,
                second: null,
                third: null
            }
        };
    },
    mounted() {
        this.getList();
        this.pageInterval();
    },
    methods: {
        // 初始化数据
        getList() {
            this.loading = this.$loading({
                lock: true
            });
            queryDrugUserWorkData({ ...this.form, type: this.type })
                .then(res => {
                    this.loadingInstance;
                    this.data = res;
                    const { bottomN, list, topN } = res;
                    this.bottomN = this.formaterList(bottomN);
                    this.list = this.formaterList(list);
                    topN.forEach(item => {
                        if (item.rankNum === 1) {
                            this.name.first = item.drugUserName;
                        } else if (item.rankNum === 2) {
                            this.name.second = item.drugUserName;
                        } else {
                            this.name.third = item.drugUserName;
                        }
                    });
                    this.$emit("changeTime", res.calcTime);
                    this.loading.close();
                })
                .catch(() => {
                    this.loading.close();
                });
        },

        //处理数据格式
        formaterList(list = [], array = []) {
            list.forEach(item => {
                array.push({
                    rankNum: item.rankNum,
                    arrList: [
                        {
                            ...item
                        }
                    ]
                });
            });
            return array;
        },

        changeList() {
            queryDrugUserWorkData({ ...this.form, type: this.type }).then(
                res => {
                    this.data = res;
                    const { bottomN, list, topN } = res;
                    this.list.map((item, i) => {
                        // if (list[i]) {
                        setTimeout(() => {
                            item.arrList.push({ ...list[i] });
                        }, i * 100);
                        // } else {
                        //     item.arrList = [];
                        // }
                    });
                    this.bottomN.map((item, i) => {
                        if (
                            bottomN[i].drugUserId != item.arrList[0].drugUserId
                        ) {
                            item.rankNum = bottomN[i].rankNum;
                            item.arrList.push({ ...bottomN[i] });
                        }
                    });
                    if (topN.length > 0) {
                        topN.forEach(item => {
                            if (item.rankNum === 1) {
                                this.name.first = item.drugUserName;
                            } else if (item.rankNum === 2) {
                                this.name.second = item.drugUserName;
                            } else {
                                this.name.third = item.drugUserName;
                            }
                        });
                    } else {
                        this.name = {
                            first: null,
                            second: null,
                            third: null
                        };
                    }

                    this.$emit("changeTime", res.calcTime);
                }
            );
        },
        changForm() {
            // console.log(this.form);
            // 清空数据重新赋值
            this.list = [];
            this.bottomN = [];
            this.data = {};
            this.form.page = 1;
            this.name = {
                first: null,
                second: null,
                third: null
            };
            this.getList();
            this.pageInterval();
        },
        // 开始15s轮询
        pageInterval() {
            this.pageTimer && clearInterval(this.pageTimer);
            this.pageTimer = null;
            this.pageTimer = setInterval(() => {
                if (this.form.page >= this.data.totalPage) {
                    this.form.page = 0;
                }
                this.form.page = ++this.form.page;
                this.changeList();
            }, 15000);
        }
    },
    beforeDestroy: function() {
        this.timer && clearInterval(this.timer); //在Vue实例销毁前，清除我们的定时器
        this.pageInterval && clearInterval(this.pageInterval);
    }
};
</script>

<style lang='less'  scoped>
.board-wrapper {
    width: 902px;
    font-weight: bold;
    .board-header {
        margin: 0 auto;
        height: 61px;
        width: 497px;
        background: url("../../../assets/png/honor-title.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(255, 255, 255, 1);
        line-height: 50px;
        letter-spacing: 6px;
    }
    .honor-wrapper {
        display: flex;
        height: 95px;
        width: 100%;
        justify-content: space-around;
        margin-top: 23px;
        .honor {
            display: flex;
            width: 210px;
            .name {
                text-align: center;
                font-size: 28px;
                font-family: PingFangSC-Regular, PingFang SC;
                color: rgba(37, 42, 54, 1);
                line-height: 36px;
                width: 120px;
            }
            .juntuan {
                width: 100px;
                height: 40px;
                text-align: center;
                border-radius: 20px;
                border: 1px solid rgba(8, 168, 178, 1);
                font-size: 22px;
                font-family: PingFangSC-Regular, PingFang SC;
                color: rgba(8, 168, 178, 1);
                line-height: 40px;
            }
            .text-wrapper {
                padding-left: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }
        .img {
            width: 70px;
            height: 95px;
        }
        .first {
            .img {
                width: 71px;
            }
        }
    }
    .list-wrapper {
        margin-top: 20px;
        .rank-img {
            width: 24px;
            height: 32px;
        }
        .list-item {
            overflow: hidden;
            display: flex;
            height: 54px;
            line-height: 54px;
            font-size: 18px;
            justify-content: space-around;
            &.list-header {
                height: 54px;
                background: #17cdcc;
                color: #fff;
                font-size: 22px;
                font-family: PingFang-SC-Bold, PingFang-SC;
                font-weight: bold;
            }
            .relative {
                position: relative;
            }
            .rank {
                width: 44px;
                text-align: center;
                &.award {
                    display: flex;
                    justify-content: center;
                    width: 8px;
                    height: 20px;
                    top: 0;
                }
            }
            .header-svg {
                position: absolute;
                transform: rotate(180deg);
                top: 4px;
                right: -14px;
            }
            .name {
                font-weight: bold;
                width: 80px;
                text-align: justify;
            }
            .waihu {
                width: 110px;
                text-align: right;
            }
            .successNum {
                width: 154px;
                font-size: 22px;
                text-align: right;
            }
            .jiange {
                width: 140px;
                text-align: right;
                .header-svg {
                    position: absolute;
                    transform: rotate(360deg);
                    top: -2px;
                    right: -14px;
                }
            }
            .time {
                width: 110px;
                text-align: right;
            }
            &.item-wrapper {
                font-size: 18px;
                .rank {
                    font-family: Arial-BoldMT, Arial;
                    color: rgba(8, 168, 178, 1);
                }
                .name {
                    font-family: PingFangSC-Regular, PingFang SC;
                    color: rgba(8, 168, 178, 1);
                }
                .waihu {
                    font-family: ArialMT;
                    color: rgba(37, 42, 54, 0.6);
                }
                .successNum {
                    font-family: Arial-BoldMT, Arial;
                    color: rgba(8, 168, 178, 1);
                }
                .jiange {
                    font-family: ArialMT;
                    color: rgba(37, 42, 54, 0.6);
                }
                .time {
                    font-family: ArialMT;
                    color: rgba(37, 42, 54, 0.6);
                }
            }
        }
        .scoll-wrapper {
            width: calc(100% - 148px);
            overflow: hidden;
            .scroll-item {
                display: flex;
                justify-content: space-between;
            }
        }
        .main-wrapper {
            height: 540px;
        }
        .bottom {
            .list-item {
                .rank {
                    color: #ec4920;
                }
                .name {
                    color: #ec4920;
                }
                .successNum {
                    color: #ec4920;
                }
                .time {
                    width: 110px;
                    text-align: right;
                }
            }
            .list-item:nth-child(1) {
                background: #ffe8e2;
            }
            .list-item:nth-child(2) {
                background: #fed3c8;
            }
            .list-item:nth-child(3) {
                background: #ffbdac;
            }
        }
    }
}
</style>