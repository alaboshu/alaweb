/**
 * Create a component with common options
 */
import install from './install'

export default function (sfc) {
  sfc.mixins = sfc.mixins || []
  sfc.components = sfc.components || {}
  sfc.install = sfc.install || install

  return sfc
}
