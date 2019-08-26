import React from 'react'
import { ScrollView,View, Animated ,Text as TX, } from "react-native";
import Freedomen from 'react-native-freedomen'    
import {Text, Input, Rating,CheckBox,Tooltip,Slider, Button, Avatar, Badge, Icon, withBadge } from 'react-native-elements'

export default class extends React.Component {
    static navigationOptions = {
        title: 'elements Test'
    }

    constructor(props) {
        super(props)
        this.state = {
            load: true,
            value: 0.2,
            fade1: new Animated.Value(1),
            fade2: new Animated.Value(1),
            form: {
                name: '测试姓名',
                age: '1994-08-08',
                star: 1
            },
            data: {}
        }
    }

    componentDidMount() {

        // const handle = findNodeHandle(this.refs.nihao);
        
        // UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        //     console.log(x, y, width, height)
        // });

            // this.setState({
            //     load: true
            // },() => {
            //     Animated.parallel([
            //         Animated.timing( 
            //             this.state.fade1, // 要变化的动画值
            //             {
            //                 toValue: 1, // 最终的动画值
            //                 timing: 200
            //             }
            //         ).start(),
            //         Animated.timing( 
            //             this.state.fade2, // 要变化的动画值
            //             {
            //                 toValue: 1, // 最终的动画值
            //                 timing: 200
            //             }
            //         ).start()
            //     ]) // 开始执行动画
            // })
    }

    render() {  
        return ( 
            <ScrollView >  
                <Animated.View style={{flexDirection: 'row', opacity:  this.state.fade1 }}>
                    <Text ref="nihao"  h2>Heading ---</Text>
                </Animated.View>
                {
                    this.state.load ?  <Animated.View style={{flexDirection: 'row', opacity:  this.state.fade }}>
                    <Text  h4>量子</Text>
                        <Input  placeholder='BASIC INPUT' />
                    </Animated.View> : null
                }  
                <Animated.View style={{flexDirection: 'row', opacity:  this.state.fade2 }}>
                    <Text  h4>量子</Text>
                    <CheckBox
                        title='Click Here'
                        checked={true}
                        />
                    <CheckBox
                        title='Click Here'
                        checked={false}
                        />
                </Animated.View>
                {
                    this.state.load ?
                    <Animated.View style={{flexDirection: 'row', opacity:  this.state.fade1 }}>
                    <Text  h4>量子</Text>
                    <Tooltip popover={<Text>Info here</Text>}>
                        <Text>Press me</Text>
                    </Tooltip>
                    </Animated.View> : null
                }
                
                <Animated.View style={{flexDirection: 'row', opacity:  this.state.fade2}}>
                    <Text  h4>量子</Text>
                    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                        <Slider
                            value={this.state.value}
                            onValueChange={value => this.setState({ value })}
                        />
                        <Text>Value: {this.state.value}</Text>
                    </View>
                </Animated.View>
                {
                    this.state.load ?
                    <Animated.View style={{flexDirection: 'row', opacity:  this.state.fade1 }}>
                        <Text  h4>量子</Text>
                        <CheckBox
                            title='Click Here'
                            checked={true}
                            />
                        <CheckBox
                            title='Click Here'
                            checked={false}
                            />
                        <CheckBox
                            title='Click Here'
                            checked={true}
                            /> 
                    </Animated.View> : null
                }
                
                <Animated.View style={{flexDirection: 'row', opacity:  this.state.fade2}}>
                    <Text  h4>量子</Text>
                    <Input
                    placeholder='INPUT WITH ICON'
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    />
                </Animated.View>
                {
                    this.state.load ?  
                    <Animated.View style={{flexDirection: 'row', opacity:  this.state.fade1}}>
                        <Text  h4>量子</Text>
                        <Rating
                            showRating 
                            style={{ paddingVertical: 10 }}
                        />
                    </Animated.View> : null
                }
               
                <Button title="Solid Button" />
            </ScrollView>
          )
    }
  }