import * as React from 'react'
import * as RN from 'react-native'
import { s } from 'react-native-better-styles'

interface RehydratedProps {
  children: React.ReactNode
  rehydrated: boolean
}

class Rehydrated extends React.Component<RehydratedProps> {
  render() {
    return (
      <RN.View style={[s.flx_i]}>
        {this.props.rehydrated ? this.props.children : <Loader />}
      </RN.View>
    )
  }
}

export default connect(state => {
  return {
    rehydrate: state.rehydrate
  }
})(Rehydrate)
