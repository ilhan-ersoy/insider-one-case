import { Store } from 'vuex'
import type { RaceState } from '@/types'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RaceState>
  }
}
