<template>
    <div class="search-container" :class="isSelecting && 'selecting'">
        <div class="search-title" @click="open">
            代表
            <div class="top">
                <img src="@/assets/svg/arrow-down.svg" alt v-if="!isSelecting" />
                <img src="@/assets/svg/arrow-up.svg" alt v-else />
            </div>
        </div>
        <div class="search animated fadeIn" v-if="isSelecting">
            <div class="input">
                <div class="icon">
                    <img src="./search.svg" alt />
                </div>
                <input type="text" placeholder="输入代表姓名" @input="input" />
            </div>
            <ul class="search-content" v-show="list.length>0">
                <li
                    v-for="item in list"
                    :key="item.drugUser_id"
                    class="search-item"
                    @click="selected(item)"
                >
                    <div class="check-box">
                        <img
                            :src="require(`./${item.checked ? 'selected' : 'noSelected'}.svg`)"
                            alt
                        />
                    </div>
                    <div class="text">{{item.drugUserName}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { queryDrugUserList } from "@/api/kanban";
export default {
    props: ["screen"],
    data() {
        return {
            isSelecting: false,
            list: [
                {
                    drugUserId: 1,
                    name: "123",
                    checked: true
                },
                {
                    drugUserId: 2,
                    name: "123",
                    checked: true
                },
                {
                    drugUserId: 3,
                    name: "123",
                    checked: true
                },
                {
                    drugUserId: 4,
                    name: "123",
                    checked: true
                },
                {
                    drugUserId: 5,
                    name: "123",
                    checked: true
                }
            ],
            uninvolvedIds: []
        };
    },
    mounted() {
        let that = this;
        $(document).on("click", function(e) {
            let dom = $(".search-container")[0]; // 自定义div的class
            if (dom) {
                // 如果点击的区域不在自定义dom范围
                if (!dom.contains(e.target)) {
                    that.isSelecting = false;
                    that.$emit("screen", that.uninvolvedIds);
                }
            }
        });
        this.getList();
    },
    methods: {
        getList(name = "") {
            queryDrugUserList({ name }).then(res => {
                this.list = res;
            });
        },
        selected(item) {
            if (
                item.checked===true &&
                this.uninvolvedIds.findIndex(ele => ele === item.drugUserId) ===
                    -1
            ) {
                this.uninvolvedIds.push(item.drugUserId);
            } else if(item.checked===false) {
                this.uninvolvedIds = this.uninvolvedIds.filter(ele => {
                    // console.log(ele, item.drugUserId, ele === item.drugUserId);
                    return ele !== item.drugUserId;
                });
            }
            item.checked = !item.checked;
        },
        open() {
            this.isSelecting = true;
            this.getList();
        },
        input(e) {
            this.getList(e.target.value);
        }
    }
};
</script>

<style lang='less'>
.search-container {
    width: 150px;
    height: 44px;
    position: relative;
    &.selecting {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        .search-title {
            color: #17cdcc;
        }
    }

    .search-title {
        position: relative;
        color: #ffffff;
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        text-indent: 40px;
        line-height: 44px;
        position: relative;
        .top {
            position: absolute;
            display: block;
            width: 16px;
            height: 10px;
            right: 70px;
            top: -2px;
            img {
                width: 100%;
                line-height: 0;
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
                font-size: 0;
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
            height: 260px;
            overflow-y: auto;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(48, 48, 48, 1);
            line-height: 16px;
            .check-box {
                height: 16px;
                width: 16px;
                line-height: 0;
                margin-right: 8px;
            }
            .search-item {
                display: flex;
                padding: 15px;
                &:hover {
                    background: rgba(214, 242, 242, 1);
                }
            }
        }
    }
}
</style>