import Validator from 'validator'

export default{
    // 帐号注册基本信息校验
    baseCheck(data){
        if (Validator.isNull(data.nickname)) {
            return {
                ok: false,
                data: '昵称不能为空',
                code: 'nickname'
            }
        }

        if (!Validator.isLength(data.nickname, 2, 10)) {
            return {
                ok: false,
                data: '昵称长度为2-10',
                code: 'nickname'
            }
        }

        if (Validator.isNull(data.password)) {
            return {
                ok: false,
                data: '密码不能为空',
                code: 'password'
            }
        }

        if (!Validator.isLength(data.password, 6, 30)) {
            return {
                ok: false,
                data: '密码长度为6-30',
                code: 'password'
            }
        }

        return {
            ok: true
        }
    },

    // 邮箱验证
    emailCheck(data){
        if (!Validator.isEmail(data.email)) {
            return {
                ok: false,
                data: '邮箱格式错误',
                code: 'email'
            }
        }

        return {
            ok: true
        }
    }
}