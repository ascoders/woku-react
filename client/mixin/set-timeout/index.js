"use strict"

// 自动销毁timeout
module.exports = {
    componentWillMount: function () {
        this.__timers = {}
    },
    componentWillUnmount: function () {
        Object.keys(this.__timers).forEach(id => {
            clearTimeout(id)
        })
    },

    setTimeout: function (fn, duration) {
        var timer = setTimeout(() => fn.call(this), duration)
        this.__timers[timer] = true
        return timer
    },
    clearTimeout: function (id) {
        clearTimeout(id)
        delete this.__timers[id]
    }
}