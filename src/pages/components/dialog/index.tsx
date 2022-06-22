import { Component } from 'react';
import { View } from '@tarojs/components';
import './index.less'
export default class Dialog extends Component<any> {
  render() {
    return (
      <View className='dialog'>
        {this.props.children}
      </View>
    );
  }
}
