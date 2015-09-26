var fs = require('fs')
var router = require('koa-router')()

// 遍历文件夹
function scanFolder(path) {
    var folderList = []
    var walk = function (path, folderList) {
        files = fs.readdirSync(path)
        files.forEach(function (item) {
            var tmpPath = path + '/' + item,
                stats = fs.statSync(tmpPath)

            if (stats.isDirectory()) {
                walk(tmpPath, folderList)
                folderList.push(tmpPath)
            }
        })
    }

    walk(path, folderList)

    return folderList
}

var controllers = scanFolder('controllers')

controllers.forEach(function (path) {
    // 遍历出来的各个目录
    var instance
    try {
        instance = require('../' + path)
    } catch (err) {
        return
    }

    // 遍历每个方法
    for (var key in instance) {
        // 完整的api
        var api = instance[key]
        var apiName = key
        if (apiName !== 'index') {
            apiName = '/' + apiName
        } else {
            apiName = ''
        }
        var apiUrl = '/api/' + path.replace('controllers/', '') + apiName

        // 遍历 get post put patch delete
        for (var method in api) {
            switch (method) {
            case 'get':
                if (typeof api[method] === 'object') {
                    api[method].unshift(apiUrl)
                    router.get.apply(router, api[method])
                } else if (typeof api[method] === 'function') {
                    router.get(apiUrl, api[method])
                }
                break
            case 'post':
                if (typeof api[method] === 'object') {
                    api[method].unshift(apiUrl)
                    router.post.apply(router, api[method])
                } else if (typeof api[method] === 'function') {
                    router.post(apiUrl, api[method])
                }
                break
            case 'put':
                if (typeof api[method] === 'object') {
                    api[method].unshift(apiUrl)
                    router.put.apply(router, api[method])
                } else if (typeof api[method] === 'function') {
                    router.put(apiUrl, api[method])
                }
                break
            case 'patch':
                if (typeof api[method] === 'object') {
                    api[method].unshift(apiUrl)
                    router.patch.apply(router, api[method])
                } else if (typeof api[method] === 'function') {
                    router.patch(apiUrl, api[method])
                }
                break
            case 'del':
                if (typeof api[method] === 'object') {
                    api[method].unshift(apiUrl)
                    router.delete.apply(router, api[method])
                } else if (typeof api[method] === 'function') {
                    router.delete(apiUrl, api[method])
                }
                break
            }
        }
    }
})

module.exports = router
