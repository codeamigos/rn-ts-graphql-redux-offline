import * as React from 'react'
import * as RN from 'react-native'
import * as RR from 'react-redux'
import { s, colors } from 'react-native-better-styles'
import { Store } from './index'

interface RehydratedProps {
  children: React.ReactNode
  rehydrated: boolean
}

class Rehydrated extends React.Component<RehydratedProps> {
  render() {
    return (
      <RN.View style={[s.flx_i]}>
        {this.props.rehydrated
          ? this.props.children
          : <RN.View style={[s.flx_i, s.bg_greyLighter, s.jcc, s.aic]}>
              <RN.ActivityIndicator color={colors.blue} />
            </RN.View>}
      </RN.View>
    )
  }
}

export default RR.connect((state: Store) => {
  return {
    rehydrated: state.rehydrated
  }
})(Rehydrated)
