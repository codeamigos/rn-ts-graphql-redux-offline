import * as RehydrateActions from '../actions/rehydrateActions'

export default (state = false, action: RehydrateActions.RehydrateStore) => {
  switch (action.type) {
    case 'REHYDRATE_STORE':
      console.log('Store rehydrated from AsyncStorage')
      return true
    default:
      return state
  }
}
