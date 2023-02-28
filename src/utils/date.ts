
/**
 * 日期 时间 相关
 */


/**
 * 当前时间戳 秒
 * @returns number
 */
export const timestamp = () => {
    return parseInt((new Date().getTime() / 1000).toString())
}

/**
 * 时间戳 转标准格式时间
 */
export const timestamp2Str = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
}

