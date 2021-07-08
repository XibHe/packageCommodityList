/* eslint-disable */
//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, WebView, InteractionManager } from 'react-native'
import NavBar from './NavBar'
import EStyleSheet from 'react-native-extended-stylesheet'

// create a component
class WebScene extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      source: {}
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.setParams({ title: '加载中' })
      this.setState({ source: { uri: this.props.navigation.state.params.url } })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar onLeftPress={() => this.props.navigation.goBack()} />
        <WebView
          ref="webView"
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={this.state.source}
          onLoadEnd={e => this.onLoadEnd(e)}
          scalesPageToFit
        />
      </View>
    )
  }

  onLoadEnd(e: any) {
    if (e.nativeEvent.title.length > 0) {
      this.props.navigation.setParams({ title: e.nativeEvent.title })
    }
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50'
  },
  webView: {
    flex: 1,
    backgroundColor: 'white'
  }
})

//make this component available to the app
export default WebScene
