export const editSetting = {
  Id: '00000000-0000-0000-0000-000000000000',
  key: 'zk-image',
  name: '图片组件',
  editors: [
    'Function',
    {
      field: 'text',
      text: 'Text',
      type: 'string'
    },
    {
      field: 'href',
      text: 'Href',
      type: 'string'
    },
    {
      field: 'target',
      text: 'Target',
      type: 'string'
    },
    'Style',
    {
      field: 'type',
      text: 'Type',
      type: 'select',
      data: [{
        value: null,
        text: 'Default'
      }, {
        value: 'primary',
        text: 'Primary'
      }, {
        value: 'dashed',
        text: 'Dashed'
      }, {
        value: 'danger',
        text: 'Danger'
      }]
    }, {
      field: 'ghost',
      text: 'Transparent',
      type: 'boolean'
    }, {
      field: 'icon',
      text: 'Icon',
      type: 'string'
    }, {
      field: 'loading',
      text: 'Loading',
      type: 'boolean'
    }, {
      field: 'shape',
      text: 'Shape',
      type: 'select',
      data: [{
        value: null,
        text: 'Default'
      }, {
        value: 'circle',
        text: 'Circle'
      }]
    }, {
      field: 'size',
      text: 'Size',
      type: 'select',
      data: [{
        value: null,
        text: 'Default'
      }, {
        value: 'small',
        text: 'Small'
      }, {
        value: 'large',
        text: 'Large'
      }]
    }
  ],
  events: [{
    text: 'OnClick',
    field: 'onClick'
  }]
}
