import React from 'react'
import {ScrollView,View } from "react-native";  
import Freedomen from 'react-native-freedomen' 

export default class extends React.Component {
    static navigationOptions = {
        title: '数据交换'
    }
    constructor(props) {
        super(props)
        this.state = {
            form: { }
        }
    }
    render() {  
        return ( 
            <ScrollView >  
                <Freedomen.Region 
                    style={{padding: 2, backgroundColor: '#f5f5f5'}}
                    event={params => { 
                        if (params.prop == 'submit') { 
                            alert(JSON.stringify(params.row))
                        } else if (params.prop == 'address') {
                            this.props.navigation.push('Address', params.row)
                        }
                    }} 
                    redux={'sjjh_form'}
                    data={this.state.form}
                    columns={[   
                        [
                            {type: 'text-h1', value: '数据交换验证'},
                            {type: 'br-form-row'}
                        ],
                        [
                            {type: 'text-form-label',  value: '姓名'},
                            {type: 'input-text', prop: 'name', placeholder: '请输入姓名', style: {flex: 1}},
                            {type: 'text-must', prop: 'vaild_name'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '姓别'},
                            {type: 'select', prop: 'sex', options: '男,女', placeholder: '请选择性别', style: {flex: 1}},
                            {type: 'text-must', prop: 'vaild_sex'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '日期'},
                            {type: 'pick-date', prop: 'age', placeholder: '请选择出生日期', style: {flex: 1, padding: 0, margin: 0}},
                            {type: 'text-must', prop: 'vaild_age'},
                            {type: 'br-form-row'}
                        ], [
                            {type: 'text-form-label', value: '地址'},
                            {type: 'text-h5', prop: 'addressName', placeholder: '请选择地址', style: {flex: 1}},
                            {type: 'image', value: require('../assets/right.png'), style: {width: 14, height: 14}},
                            {type: 'click-form-row', prop: 'address'}
                        ], [  
                            {type: 'text-form-label', value: '简介'},
                            {type: 'input-area', prop: 'intro', maxLength: 200, placeholder: '请简要介绍自己', style: {paddingTB: 5}},
                            {type: 'br-form-col'}
                        ], [  
                            {type: 'text-form-label', value: '评价'},
                            {type: 'rate', prop: 'star', style: {paddingRight: 10}},
                            {type: 'br-form-row', style: {marginBottom: 5}}
                        ],
                        {type: 'button-primary', value: '提交', prop: 'submit', disabled: (value, data) => !data.name}
                    ]}
                />
            </ScrollView>
          )
    }
  }