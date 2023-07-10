import * as bcryptjs from 'bcryptjs';

/**
 * 密码加密
 * @param password 注册密码
 * @returns 加密后的密码
 */
export const encryptPwd = (password) => {
  return bcryptjs.hashSync(password, 10);
};

/**
 * 密码校验
 * @param password 登录密码
 * @param encryptPassword 加密过的密码
 * @returns 是否一致
 */
export const comparePwd = (password, encryptPassword) => {
  return bcryptjs.compareSync(password, encryptPassword);
};

// /**
//  * 加密处理 - 同步方法
//  * bcryptjs.hashSync(data, salt)
//  *    - data  要加密的数据
//  *    - slat  用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
//  */
// const hashPassword = bcryptjs.hashSync(password, 10)

// /**
//  * 校验 - 使用同步方法
//  * bcryptjs.compareSync(data, encrypted)
//  *    - data        要比较的数据, 使用登录时传递过来的密码
//  *    - encrypted   要比较的数据, 使用从数据库中查询出来的加密过的密码
//  */

// const isOk = bcryptjs.compareSync(password, encryptPassword)
