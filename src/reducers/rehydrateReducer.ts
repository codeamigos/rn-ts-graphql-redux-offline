import * as RehydrateActions from '../actions/rehydrateActions'

export default (state = false, action: RehydrateActions.RehydrateStore) => {
  switch (action.type) {
    case 'REHYDRATE_STORE':
      return true
    default:
      return state
  }
}
