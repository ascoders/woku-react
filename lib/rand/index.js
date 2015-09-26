// 范围随机数包含最大最小
exports.range = function (min, max) {
    return Math.floor(min + Math.random() * (max - min))
}