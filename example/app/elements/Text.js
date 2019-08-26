import React from 'react'
import {ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen'    

export default class extends React.Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        title: '文本'
    } 
    render() {  
        return ( 
            <ScrollView >  
                <Freedomen.Region 
                    style={{padding: 2}}
                    event={params => {  }} 
                    columns={[   
                        [
                            {type: 'text-h1', value: '文本'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-h1', value: '文本1'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-h2', value: '文本2'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-h3', value: '文本3'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-h4', value: '文本4'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text', value: '文本5'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text', value: '文本6', style: value => {
                                return value == '文本6' && {
                                    color: 'red',
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                }
                            }},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text', value: '文本7', style: value => {
                                return value == '文本7' && {
                                    textDecorationLine: 'line-through',
                                    color: 'blue'
                                }
                            }},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-badge', value: '1'},
                            {type: 'text-badge', value: 100, filter: value=> value >= 100 ? '99+' : value},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-custom1', value: '自定义1'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-custom2', value: '自定义2'},
                            {type: 'br-form-row'}
                        ] , [
                            {type: 'text-custom3', value: '自定义3'},
                            {type: 'br-form-row'}
                        ] 
                    ]}
                />
            </ScrollView>
          )
    }
  }