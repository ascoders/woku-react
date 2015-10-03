import Validator from 'validator'

export default{
    // 帐号登录校验
    check(data){
        // 记录帐号类型 邮箱 / 昵称
        let type = ''

        if (Validator.isNull(data.account)) {
            return {
                ok: false,
                data: '帐号不能为空',
                code: 'account'
            }
        }

        if (Validator.isNull(data.password)) {
            return {
                ok: false,
                data: '密码不能为空',
                code: 'account'
            }
        }

        if (Validator.isEmail(data.account)) { // 是邮箱
            type = 'email'

            if (!Validator.isLength(data.account, 2, 30)) {
                return {
                    ok: false,
                    data: '帐号邮箱长度为2-30',
                    code: 'account'
                }
            }
        } else {
            type = 'nickname'

            if (!Validator.isLength(data.account, 2, 10)) {
                return {
                    ok: false,
                    data: '昵称长度为2-10',
                    code: 'account'
                }
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
            ok: true,
            type: type
        }
    }
}