<template>
    <div class="select-container" :class="isSelecting && 'selecting'">
        <div class="search-title" @click="open">
            <div class="search-text">
                {{selectedValue.value}}
                <div class="top">
                    <img src="@/assets/svg/arrow-down.svg" alt v-show="!isSelecting" />
                    <img src="@/assets/svg/arrow-up.svg" alt v-show="isSelecting" />
                </div>
            </div>
        </div>
        <div class="search animated fadeIn" v-show="isSelecting">
            <ul class="search-content">
                <li
                    v-for="(item,i) in list"
                    :key="i"
                    class="search-item"
                    :class="item.value === selectedValue.value && 'selected'"
                    @click="selected(item)"
                >
                    <div class="text">{{item.value}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ["callback"],
    data() {
        return {
            isSelecting: false,
            selectedValue: {
                value: "成功招募/覆盖医生数"
            },
            list: [
                {
                    value: "外呼通话数",
                    id: "total_calls_offered"
                },
                {
                    value: "成功招募/覆盖医生数",
                    id: "success_hcp_num"
                },
                {
                    value: "平均通话间隔",
                    id: "avg_interval"
                },
                {
                    value: "总通话时长",
                    id: "total_call_time"
                }
            ]
        };
    },
    mounted() {
        let that = this;
        $(document).on("click", function(e) {
            let dom = $(".select-container")[0]; // 自定义div的class
            if (dom) {
                // 如果点击的区域不在自定义dom范围
                if (!dom.contains(e.target)) {
                    that.isSelecting = false;
                }
            }
        });
    },
    methods: {
        selected(item) {
            this.isSelecting = false;
            this.selectedValue = item;
            this.$emit("callback", item);
        },
        open() {
            this.isSelecting = true;
        }
    }
};
</script>

<style lang='less' scoped>
.select-container {
     width: 300px;
    height: 44px;
    position: relative;
    &.selecting {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        .search-title {
            color: #17cdcc;
            position: relative;
        }
    }

    .search-title {
        color: #ffffff;
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        text-indent: 40px;
        line-height: 44px;
        display: flex;
        justify-items: flex-start;
        align-content: center;
        .search-text {
            position: relative;
            .top {
                position: absolute;
                width: 16px;
                height: 10px;
                line-height: 0;
                top: 17px;
                right: 3px;
                img {
                    width: 100%;
                }
            }
        }
    }
    .search {
        position: absolute;
        max-height: 308px;
        background: #ffffff;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
        z-index: 2;
        top: 50px;
        .input {
            margin: 8px auto;
            width: 138px;
            height: 32px;
            background: rgba(240, 240, 240, 1);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            border-bottom: 1px solid;
            padding: 0 9px;
            .icon {
                width: 15px;
                height: 14px;
                margin-right: 5px;
                line-height: 0;

                img {
                    width: 100%;
                    height: 100%;
                    line-height: 0;
                }
            }
            input {
                width: 96px;
                background: transparent;
                line-height: 32px;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
            }
        }
        .search-content {
            height: 150px;
            overflow-y: auto;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(48, 48, 48, 1);
            line-height: 16px;
            padding: 10px 0;
            .search-item {
                height: 32px;
                line-height: 32px;
                text-indent: 40px;
                &:hover {
                    background: rgba(214, 242, 242, 1);
                }
                &.selected {
                    background: rgba(23, 205, 204, 1);
                    color: #fff;
                }
            }
        }
    }
}
</style>