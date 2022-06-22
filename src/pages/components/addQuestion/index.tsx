import { Component } from 'react';
import { View, Input, Textarea, Button } from '@tarojs/components';
import './index.less'
import Dialog from '../dialog/index'
export default class AddQuestion extends Component<any> {
    state = {
        title: '',
        content: '',
        likeCount: 0,
        id: Math.floor(Math.pow(Math.random()* 100, 2))
    }
    btnCancle () {
        this.props.cancleClick();
    }
    btnSure () {
        if (this.state.title && this.state.content) {
            this.props.sureClick(this.state);
        }
    }
    saveInput (e) {
        this.setState({
            title: e.target.value
        })
    }
    saveTextarea (e) {
        this.setState({
            content: e.target.value
        })
    }
    render() {
        return (
            <Dialog>
                <View className='add-question'>
                    <Input onInput={this.saveInput.bind(this)} placeholder='请输入提问内容' className='question-input'></Input>
                    <Textarea onInput={this.saveTextarea.bind(this)} placeholder='请输入提问描述' className='question-description'></Textarea>
                    <View className='btn-group'>
                        <Button className='btn-question ok' onClick={this.btnSure.bind(this)}>确定</Button>
                        <Button onClick={this.btnCancle.bind(this)} className='btn-question cancle'>取消</Button>
                    </View>
                </View>
            </Dialog>
        );
    }
}
