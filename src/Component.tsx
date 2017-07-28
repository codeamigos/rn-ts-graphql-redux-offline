import * as React from 'react'
import * as RN from 'react-native'
import { graphql, ChildProps } from 'react-apollo'
import { FeedQuery } from './schema'
// const graphqlDocuments = require('./documents.json')
import * as graphqlDocuments from './documents.json'
import { s } from 'react-native-better-styles'

class Component extends React.PureComponent<ChildProps<{}, FeedQuery>> {
  constructor(props: ChildProps<{}, FeedQuery>) {
    super(props)
  }

  render() {
    const { data } = this.props

    if (!data) return null
    if (data.error)
      return (
        <RN.View style={[s.flx_i, s.jcc, s.aic, s.ph2]}>
          <RN.Text style={[s.fw3, s.f4]}>Something really bad is happened</RN.Text>
          {!!data.error.message &&
            <RN.Text style={[s.fw3, s.grey, s.mt05, s.f6, s.tc]}>
              {data.error.message}
            </RN.Text>}
        </RN.View>
      )
    if (data.loading)
      return (
        <RN.View style={[s.flx_i, s.jcc, s.aic]}>
          <RN.Text style={[s.grey, s.fw3, s.f4]}>Loading...</RN.Text>
        </RN.View>
      )

    if (data.feed)
      return (
        <RN.View style={[s.pl1, s.flx_i]}>
          <RN.View style={[s.pb05, s.bbw1, s.b_greyLighter]}>
            <RN.Text style={[s.black, s.fw3, s.f3]}>Graphql Response</RN.Text>
          </RN.View>
          <RN.ScrollView contentContainerStyle={[s.pv05]}>
            {data.feed.map(
              (f, i) =>
                f
                  ? <RN.View key={i} style={[s.bbw1, s.pv05, s.b_greyLightest, s.pr1]}>
                      <RN.Text style={[s.blue, s.fw3, s.f4, s.mb025]}>
                        {f.postedBy && f.postedBy.login}
                      </RN.Text>
                      <RN.Text style={[s.b_greyLighter, s.fw3, s.f6]}>
                        {f.repository && f.repository.name}
                      </RN.Text>
                    </RN.View>
                  : null
            )}
          </RN.ScrollView>
        </RN.View>
      )

    return null
  }
}

export default graphql<FeedQuery, {}>(graphqlDocuments['Feed.graphql'])(Component)
