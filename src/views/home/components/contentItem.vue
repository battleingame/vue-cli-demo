<template>
    <div class="height">
        <div class="content-wrapper" :class="{marquee_top: animate}">
            <div class="list-item item-wrapper" v-for="(item,i) in listItem.arrList " :key="i">
                <div
                    class="rank"
                    v-if="item.rankNum!==1 &&item.rankNum!==2&&item.rankNum!==3"
                >{{item.rankNum}}</div>
                <div
                    v-if="item.rankNum===1 || item.rankNum===2||item.rankNum===3"
                    class="rank award"
                >
                    <div class="rank-img">
                        <img :src="require(`@/assets/png/${item.rankNum}.png`)" alt />
                    </div>
                </div>
                <div class="name">{{item.drugUserName}}</div>
                <div
                    class="waihu in-active"
                    :class="active==='total_calls_offered'&&'active'"
                >{{item.totalCallsOffered}}</div>
                <div
                    class="successNum in-active"
                    :class="active==='success_hcp_num'&&'active'"
                >{{item.successHcpNum}}</div>
                <div
                    class="jiange in-active"
                    :class="active==='avg_interval'&&'active'"
                >{{item.avgInterval}}</div>
                <div
                    class="time in-active"
                    :class="active==='total_call_time'&&'active'"
                >{{item.totalCallTime}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        active: String,
        listItem: {
            type: Object,
            default: () => {
                return {
                    id: 111,
                    arrList: []
                };
            }
        }
    },
    data() {
        return {
            animate: false,
            list: this.listItem
        };
    },
    methods: {
        showMarquee: function() {
            this.animate = true;
            setTimeout(() => {
                this.listItem.arrList.shift();
                this.animate = false;
            }, 500);
        }
    },
    watch: {
        list: {
            deep: true, // 深度监听
            handler(newVal, oldVal) {
                if (
                    newVal.arrList.length > 1 &&
                    JSON.parse(JSON.stringify(newVal)) !==
                        JSON.parse(JSON.stringify(oldVal))
                ) {
                    this.showMarquee();
                }
            }
        }
    }
};
</script>

<style lang='less'>
.height {
    height: 54px;
    overflow: hidden;
}
.content-wrapper {
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
        .rank {
            width: 44px;
            text-align: center;
            &.award {
                display: flex;
                justify-content: center;
            }
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
            text-align: right;
            font-size: 18px;
        }
        .jiange {
            width: 140px;
            text-align: right;
        }
        .time {
            width: 110px;
            text-align: right;
        }
        &.item-wrapper {
            height: 54px;
            font-size: 18px;
            overflow: hidden;
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
            .in-active {
                color: rgba(37, 42, 54, 0.6);
            }
            .active {
                color: #08a8b2;
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
.marquee_top {
    transition: all 0.5s;
    margin-top: -54px;
}
</style>