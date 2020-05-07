<template>
    <div class="body">
        <div class="main-container">
            ceshi
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
           
        };
    },
    
    mounted() {
       
    },
    methods: {
      
    },
    beforeDestroy: function() {
    }
};
</script>
<style lang='less' >
.body {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    &::after {
        content: " ";
        position: absolute;
        height: 180px;
        width: 100%;
        background: linear-gradient(
            180deg,
            rgba(23, 205, 204, 1) 0%,
            rgba(23, 205, 204, 0.3) 61%,
            rgba(255, 255, 255, 0) 100%
        );
        top: 0;
        left: 0;
    }
}
.main-container {
    width: 1920px;
    margin: 0 auto;
    z-index: 1;
    position: relative;
    .header {
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 30px;
        padding-right: 54px;
        padding-left: 50px;
        position: relative;
        .selects {
            display: flex;
        }
        .tongji {
            position: absolute;
            top: 90px;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 18px;
            color: #17cdcc;
            font-family: PingFangSC-Regular, PingFang SC;
        }
        .title {
            position: absolute;
            top: 45px;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 40px;
            font-weight: bold;
            font-family: BigruixianBlackGBV10;
        }
        .time {
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
        }
    }
    .list-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        margin-top: 20px;
        .list-wrapper {
            height: 756px;
        }
        .line {
            position: absolute;
            width: 2px;
            bottom: 26px;
            left: calc(50% - 1px);
            height: 800px;
            background: rgba(232, 232, 232, 1);
        }
    }
}
</style>  