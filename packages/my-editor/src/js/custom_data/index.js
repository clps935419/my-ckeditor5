const chinesObj = {
    a: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
    b: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    c: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    d: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌'],
};
let listArr = {
    test1: [chinesObj['a'], chinesObj['b'], chinesObj['c'], chinesObj['d']],
    test2: [chinesObj['b'], chinesObj['c'], chinesObj['d'], chinesObj['a']],
    default: [chinesObj['d'], chinesObj['c'], chinesObj['b'], chinesObj['a']],
};

function updateArr(name, arr) {
    listArr[name] = arr;
}
export { listArr, chinesObj, updateArr };
