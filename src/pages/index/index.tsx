import { Component } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import AddQuestion from '../components/addQuestion/index'
import './index.less'
export default class Index extends Component {

  state: any = {
    showQuestionModel: false,
    questionList: Taro.getStorageSync("questionList") || [],
    likeCount: 0
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  addQuestion() {
    this.setState({
      showQuestionModel: true
    })
  }
  cancleModel() {
    this.setState({
      showQuestionModel: false
    })
  }
  sureModel(option) {
    let { questionList } = this.state;
    questionList.push(option);

    this.setState({
      questionList
    })
    Taro.setStorageSync('questionList', questionList);
    this.cancleModel();
  }
  addLike (data) {
    let { questionList } = this.state;
    questionList = questionList.map(item => {
        if (item.id == data) {
            item.likeCount += 1;
        }
        return item;
    })
    Taro.setStorageSync('questionList', questionList)
    this.setState({
        questionList
    },() => {
        console.log("questionList", this.state.questionList);
    })
  }
  reduceLike (data) {
    let { questionList } = this.state;
    questionList = questionList.map(item => {
        if (item.id == data && item.likeCount > 0) {
            item.likeCount -= 1;
        }
        return item;
    })
    Taro.setStorageSync('questionList', questionList)
    this.setState({
        questionList
    })
  }
  render() {
    let { showQuestionModel, questionList} = this.state;
    return (
      <View className='index'>
        {showQuestionModel ? <AddQuestion sureClick={this.sureModel.bind(this)} cancleClick={this.cancleModel.bind(this)} /> : null}
        <Text className='title'>问答模块案例</Text>
        {
          questionList && questionList.map(item => {
            return (
              <View className="question-line">
                <View className="line-left">
                  <View>{item.title}</View>
                  <View>{item.content}</View>
                </View>
                <View className="line-right">
                  <Image className="plus" onClick={this.addLike.bind(this, item.id)} src={require('../image/like.png')}></Image>
                  <Text>{item.likeCount}</Text>
                  <Image className="minus" onClick={this.reduceLike.bind(this, item.id)} src={require('../image/bad.png')}></Image>
                </View>
              </View>
            )
          })
        }
        <Button className="question-button" onClick={this.addQuestion.bind(this)}>提问</Button>
      </View>
    )
  }
}
