/**
 * 数组与对象深拷贝
 * @param obj 
 * @returns {Boolean}
 */
export function deepClone(obj) {
    if (obj === null) return null;
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (typeof obj !== "object") return obj;
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === "object" && obj[key] != null ? deepClone(obj[key]) : obj[key];
        }
    }
    return newObj;
}

/**
 * 获取唯一标识
 * @return string    
 */
export function uuid() {
	let s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}
