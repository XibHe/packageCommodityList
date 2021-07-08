/* eslint-disable */
//import liraries
import React, { PureComponent } from 'react'
import { Image } from 'react-native'

// create a component
class TabBarItem extends PureComponent {
  render() {
    let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
    return (
      <Image
        source={this.props.focused ? selectedImage : this.props.normalImage}
        style={{ tintColor: this.props.tintColor, width: 20, height: 20, resizeMode: 'contain' }}
      />
    )
  }
}

export default TabBarItem
