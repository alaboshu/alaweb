const handlers = {
  concatProps (value, args, object, origin) {
    const props = args.split('.')
    const addon = props.reduce((result, prop) => {
      return result[prop]
    }, origin)

    return `${value}${addon}`
  },
  formatDate (value, args) {
    return new Date(value)
  }
}

const transformModel = (object = {}, keymap, origin) => {
  if (typeof object !== 'object' || object === null || !keymap) {
    return object
  }

  if (Array.isArray(object)) {
    return object.map(value => transformModel(value, keymap, origin || object))
  }

  return Object.keys(object).reduce((result, curkey) => {
    const rule = keymap[curkey]
    const value = object[curkey]
    const [newkey, submap, operations = []] = Array.isArray(rule) ? rule : [rule]

    const newval = operations.reduce((value, operation) => {
      const [type, args] = operation
      const handler = handlers[type]

      if (!handler) return value
      return handler(value, args, object, origin)
    }, transformModel(value, submap, origin || object))

    return Object.assign({}, result, {
      [newkey || curkey]: newval
    })
  }, {})
}

const testKeyMap = {
  name: 'title',
  detail: ['detail', {
    content: 'body',
    viewCount: 'vc'
  }],
  imgs: ['images', {
    text: 'name'
  }],
  advanced: ['advanced', {
    concat: [null, null, [
      ['concatProps', 'name'],
      ['concatProps', 'detail.content']
    ]],
    format: ['date', null, [
      ['formatDate', 'MM-DD-YYYY']
    ]]
  }]
}

const testOriginObj = {
  name: '名称',
  detail: {
    content: '内容',
    viewCount: '浏览量',
    other: '未定义项'
  },
  imgs: [
    { text: '图片1' },
    '图片2'
  ],
  advanced: {
    concat: '高级用法',
    format: '2008-01-01'
  },
  other: '未定义项'
}
