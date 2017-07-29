import * as React from 'react'
import * as RN from 'react-native'
import * as BS from 'react-native-better-styles'
import * as RA from 'react-apollo'
import * as Redux from 'redux'
import * as ReduxOffline from 'redux-offline'
import offlineConfig from 'redux-offline/lib/defaults'

import * as RehydateActions from './actions/rehydrateActions'
import RehydateReducer from './reducers/rehydrateReducer'
import Component from './Component'
import RehydrateWrapper from './RehydrateWrapper'
const { s } = BS

const palette: BS.Palette = {
  greyDarkest: '#2e333d',
  greyDarker: '#434b55',
  greyDark: '#555b65',
  grey: '#8a949d',
  greyLight: '#d2dadd',
  greyLighter: '#e5eaee',
  greyLightest: '#fafafa',
  white: '#ffffff',
  black: '#000000',
  blueDark: '#2b55e4',
  blue: '#2c5cff',
  blueLight: '#587eff',
  red: '#ff2b71',
  orange: '#ff605e',
  yellow: '#fbcf00',
  green: '#0cddae',
  t: 'rgba(0,0,0,0)'
}

const headings: BS.Multiplicators = {
  '7': 0.75,
  '6': 0.85,
  '5': 1,
  '4': 1.2,
  '3': 1.6,
  '2': 2,
  '1': 3.25
}

BS.build(
  {
    remSize: 15,
    palette,
    headings
  } as BS.Options
)

const networkInterface = RA.createNetworkInterface({
  uri: 'http://localhost:3010/graphql'
})
const client = new RA.ApolloClient({
  networkInterface
})

export interface Store {
  apollo?: RA.ApolloClient
  rehydrated: boolean
}

const initialStore: Store = {
  rehydrated: false
}

const store = Redux.createStore(
  Redux.combineReducers<Store>({
    rehydrated: RehydateReducer,
    apollo: client.reducer()
  }),
  initialStore,
  Redux.compose(
    Redux.applyMiddleware(client.middleware()),
    ReduxOffline.offline({
      ...offlineConfig,
      persistCallback: () => {
        store.dispatch({ type: 'REHYDRATE_STORE' } as RehydateActions.RehydrateStore)
      },
      persistOptions: {
        blacklist: ['rehydrate']
      }
    })
  )
)

class AppWithApollo extends React.Component {
  render() {
    return (
      <RA.ApolloProvider client={client} store={store}>
        <RehydrateWrapper>
          <RN.View style={[s.flx_i, s.pt2, s.bg_greyLightest]}>
            <Component />
          </RN.View>
        </RehydrateWrapper>
      </RA.ApolloProvider>
    )
  }
}

RN.AppRegistry.registerComponent('App', () => AppWithApollo)
