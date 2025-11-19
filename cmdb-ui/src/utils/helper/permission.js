import i18n from '@/lang'

const PERMISSION_ENUM = {
  'add': { key: 'add', label: i18n.t('permissions.add') },
  'delete': { key: 'delete', label: i18n.t('permissions.delete') },
  'edit': { key: 'edit', label: i18n.t('permissions.edit') },
  'query': { key: 'query', label: i18n.t('permissions.query') },
  'get': { key: 'get', label: i18n.t('permissions.get') },
  'enable': { key: 'enable', label: i18n.t('permissions.enable') },
  'disable': { key: 'disable', label: i18n.t('permissions.disable') },
  'import': { key: 'import', label: i18n.t('permissions.import') },
  'export': { key: 'export', label: i18n.t('permissions.export') }
}

function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        const _this = this
        return (permissions) => {
          const [permission, action] = permissions.split('.')
          const permissionList = _this.$store.getters.roles.permissions
          return permissionList.find((val) => {
            return val.permissionId === permission
          }).actionList.findIndex((val) => {
            return val === action
          }) > -1
        }
      }
    }
  })

  !Vue.prototype.$enum && Object.defineProperties(Vue.prototype, {
    $enum: {
      get () {
        // const _this = this;
        return (val) => {
          let result = PERMISSION_ENUM
          val && val.split('.').forEach(v => {
            result = result && result[v] || null
          })
          return result
        }
      }
    }
  })
}

export default plugin
