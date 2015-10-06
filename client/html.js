module.exports = function (debug) {
    var styles = ''
    var scripts = ''

    if (debug) { // 开发模式
        scripts = `
            <script src="//localhost:8090/client/static/main.js"></script>
        `
    } else { // 生产模式
        scripts = `
            <script src="/static/main.js"></script>
        `

        styles = `
            <link href="/static/main.css" rel="stylesheet"></link>
        `
    }

    return `
    <!DOCTYPE html>
    <html lang="zh-cn">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible"
          content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1">
    <meta name="format-detection"
          content="telephone=no">

    <meta name="keywords"
          content="">
    <meta name="description"
          content="">
    <meta property="qc:admins"
          content="53260245576773571556375"/>

    ${styles}

    <title>测试</title>

    <body></body>

    ${scripts}
    </html>
    `
}