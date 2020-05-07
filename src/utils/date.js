/**
 * 格式化时间
 * 
 * @param  {date} 时间戳
 * @param  {cFormat} 格式
 * @return {fmt} 字符串
 *  * @example formatDate(new Date('2018-01-29'), 'yyyy-MM-dd') // -> 2018/01/29 00:00:00
 */

export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

/**
 * 格式化时间
 * 
 * @param  {str} 字符串
 * @return {String} 字符串
 */
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
//7天后的日期
export     function getDay(){    
    //获取系统当前时间
    var now = new Date(); 
    var nowTime = now.getTime() ; 
    var oneDayTime = 24*60*60*1000 ;
    var dataList=[];
    for(var i = 0 ; i < 7 ; i++){ 
        //显示周一
        var ShowTime = nowTime + i*oneDayTime ; 
//                    var ShowTime = nowTime + (i+1)*oneDayTime ; 
        //初始化日期时间
        var myDate = new Date(ShowTime);
        var year=myDate.getFullYear();    
        var month=myDate.getMonth()+1;  
        var date=myDate.getDate(); 
        console.log(year+"-"+month+"-"+date);
        dataList.push(year+"-"+month+"-"+date)
        var str = "星期" + "日一二三四五六".charAt(myDate.getDay());
        console.log(str);
        console.log(dataList);
    }      
    return dataList      
}
