declare module 'vuex' {
  export * from 'vuex/types/index.d.ts'
}

import { Store } from 'vuex/types/index.d.ts'
import { RaceState } from './types'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RaceState>
  }
}
