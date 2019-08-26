import React from 'react'
import {ScrollView} from "react-native";
import Freedomen from 'react-native-freedomen'    

export default class extends React.Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        title: '多选卡'
    } 
    render() {  
        return ( 
            <ScrollView >  
                <Freedomen.Region 
                    style={{padding: 2}}
                    event={params => { }} 
                    columns={[   
                        [
                            {type: 'text-h1', value: '多选卡'},
                            {type: 'br-form-row'}
                        ], [  
                            {type: 'text-form-label', value: '缺省'},
                            {type: 'tags', prop: 'tags1', options: '选项1,选项2,选项3'},
                            {type: 'br-form-row'}
                        ], [  
                            {type: 'text-form-label', value: '缺省2'},
                            {type: 'tags', prop: 'tags2',value: '选项2',  options: '选项1,选项2,选项3', style: {color: '#444'}},
                            {type: 'br-form-row'}
                        ], [  
                            {type: 'text-form-label', value: '多选1'},
                            {type: 'tags', prop: 'tags3', size: 2, options: ['选项1','选项2','选项3','选项4']},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'tags', prop: 'tags4',value: 'c1', options: {c1: '模块一', c2: '模块二'}, style: {borderWidth: 0, color: 'black', flex: 1}},
                            {type: 'br-row', style: {paddingTB: 8, borderBottomWidth: 1, borderBottomColor: '#ccc'}}
                        ], [  
                            {type: 'text-form-label', value: '自定义'},
                            {type: 'tags-custom1', prop: 'tags5', size: 2, options: '选项1,选项2,选项3,选项4'},
                            {type: 'br-form-row'}
                        ]
                    ]}
                />
            </ScrollView>
          )
    }
  }