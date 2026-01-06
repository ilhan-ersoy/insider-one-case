import { Store } from 'vuex'
import { RaceState } from './types'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RaceState>
  }
}
