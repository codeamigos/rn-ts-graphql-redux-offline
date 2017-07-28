declare module 'redux-offline' {
  export type ResultAction = {
    type: string
    payload?: {}
    meta: {
      success: boolean
      completed: boolean
    }
  }

  export type OfflineMetadata = {
    effect: {}
    commit: ResultAction
    rollback: ResultAction
  }

  export type Receipt = {
    message: OfflineMetadata
    success: boolean
    result: {}
  }

  export type OfflineAction = {
    type: string
    payload?: {}
    meta: {
      transaction?: number
      offline: OfflineMetadata
    }
  }

  export type Outbox = Array<OfflineAction>

  export type OfflineState = {
    lastTransaction: number
    online: boolean
    outbox: Outbox
    receipts: Array<Receipt>
    retryCount: number
    retryToken: number
    retryScheduled: boolean
  }

  export type AppState = {
    offline: OfflineState
  }

  export type NetworkCallback = (result: boolean) => void

  export type Config = {
    batch: (outbox: Outbox) => Outbox
    detectNetwork: (callback: NetworkCallback) => void
    persist: (store: any) => any
    effect: (effect: any, action: OfflineAction) => Promise<any>
    retry?: (action: OfflineAction, retries: number) => number
    discard: (error: any, action: OfflineAction, retries: number) => boolean
    persistOptions: {}
    persistCallback: (callback: any) => any
  }

  export const offline: (config: Config) => any
}
declare module 'redux-offline/lib/defaults' {
  import * as ReduxOffline from 'redux-offline'

  const config: ReduxOffline.Config
  export default config
}
