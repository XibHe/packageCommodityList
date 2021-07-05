/**
 * 将一个用于 HTTP 传输的查询字符串转换为对象。
 * @name fromQueryString
 * @function
 * @param {string} string 要转换的查询字符串。
 * @param {boolean} [dontDecode] 转换时不使用 decodeURIComponent 解码。
 * @returns {object} 转换后的对象。
 * @example
 *   fromQueryString('c=&d=100&e=Composite%20Value&e=true')
 *   // {c: '', d: '100', e: ['Composite Value', 'true']}
 *   fromQueryString('https://www.baidu.com?c=&d=100&e=Composite%20Value&e=true')
 *   // {c: '', d: '100', e: ['Composite Value', 'true']}
 */
const fromQueryString = (string, dontDecode) => {
  const object = {}

  if (string.indexOf('#') > -1) {
    string = string.slice(0, string.indexOf('#'))
  }

  if (string.indexOf('?') > -1) {
    string = string.substr(string.indexOf('?') + 1)
  }
  string.split('&').forEach(item => {
    const valuePair = item.split('=')
    let key = valuePair[0]
    let value = valuePair[1]
    if (value !== undefined) {
      if (!dontDecode) {
        key = decodeURIComponent(key)
        value = decodeURIComponent(value)
      }
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        typeof object[key] === 'string' ? object[key] = [object[key], value] : object[key].push(value)
      } else {
        object[key] = value
      }
    }
  })
  return object
}

/**
 * 将一个对象转换为用于 HTTP 传输的查询字符串。
 * @name toQueryString
 * @function
 * @param {object} object 要转换的对象，该对象的每个属性名和属性值都将以键值对的形式被转换为字符串。
 *   如果某个属性值为 undefined 或 null，则忽略该属性。
 *   如果某个属性值为数组，则表示其对应的属性名有多个有效值。
 * @param {boolean} [dontEncode] 转换时不使用 encodeURIComponent 编码。
 * @returns {string} 转换后的字符串。
 * @example
 *   toQueryString({a: undefined, b: null, c: '', d: 100, e: ['Composite Value', true]})
 *   // "c=&d=100&e=Composite%20Value&e=true"
 */
const toQueryString = (object, dontEncode) => {
  const valuePairs = []
  const parseValuePair = (key, value) => {
    if (value != null) {
      valuePairs.push(dontEncode ? `${key}=${value}` : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }
  for (const key in object) {
    const value = object[key]
    if (Array.isArray(value)) {
      value.forEach((item) => {
        parseValuePair(key, item)
      })
    } else {
      parseValuePair(key, value)
    }
  }
  return valuePairs.join('&')
}

/**
 * 将一个对象添加到 HTTP 传输的查询字符串。
 * @name appendQueryString
 * @function
 * @param {string} string 原始的 url 路径
 * @param {object} [params] 需要添加的对象
 * @returns {string} 转换后的字符串。
 */
const appendQueryString = (string, params = {}) => {
  if (!string) return ''
  let [href, hash] = string.split('#')
  const path = href.split('?')[0]
  // 合并参数
  let search = { ...fromQueryString(string), ...params }
  search = toQueryString(search)
  search = search ? `?${search}` : ''
  hash = hash ? `#${hash}` : ''
  return path + search + hash
}

const UrlParams = (testUrl) => {
  const res = {}
  function str2query (url) {
    if (url.indexOf('?') > -1) {
      const str = url.substr(url.indexOf('?') + 1)
      if (str.indexOf('&') !== -1) {
        const strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          res[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
        }
      } else {
        res[str.split('=')[0]] = decodeURIComponent(str.split('=')[1])
      }
    }
  }
  const urls = testUrl.split('#')
  urls[0] && str2query(urls[0])
  urls[1] && str2query(urls[1])
  return res
}

export default {
  fromQueryString,
  toQueryString,
  appendQueryString,
  UrlParams
}
