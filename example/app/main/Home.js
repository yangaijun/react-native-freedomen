import React from 'react'
import {Text, ScrollView } from "react-native"
import Freedomen from 'react-native-freedomen'
import columns from '../region/columns'

export default  class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            data: {
                items: [{
                    label:  'Form'
                    },{
                        label:  'Form2'
                    },{
                        label:  'Form3'
                    },{
                        label:  'Form4'
                    } ,{
                        label: 'Tree'
                    }, { label: 'Page'}
                ]
            }
        }
    }
    componentDidMount() {
        
    }
    render() {  
        return ( 
            <ScrollView  style={{padding: 5}}>  
                <Freedomen.Region 
                    event={params => {  
                        if(params.prop == 'cancel') {
                            params.row.searchContent = ''
                            return params.row
                        } else if (params.prop == 'searchContent') {
                        } else if (params.prop == 'fold') {
                            params.row.coll = !params.row.coll
                            return  params.row
                        } else if (params.prop == 'setMiddle') { 
                            Freedomen.redux({
                                'bar_middle': (info) => {
                                    let badge = info.badge || 0
                                    info.badge = badge + 1
                                    return info
                                }
                            })
                        } else if (params.prop == 'add') {
                            params.row.inputs.push({})
                            return params.row
                        } else if (params.prop == 'button') {
                            this.props.navigation.push('Button')
                        } else if (params.prop == 'input') {
                            this.props.navigation.push('Input')
                        } else if (params.prop == 'checkbox') {
                            this.props.navigation.push('CheckBox')
                        } else if (params.prop == 'checkboxs') {
                            this.props.navigation.push('CheckBoxs')
                        } else if (params.prop == 'select') {
                            this.props.navigation.push('Select')
                        } else if (params.prop == 'tags') {
                            this.props.navigation.push('Tags')
                        } else if (params.prop == 'text') {
                            this.props.navigation.push('Text')
                        } else if (params.prop == 'radio') {
                            this.props.navigation.push('Radio')
                        } else if (params.prop == 'radios') {
                            this.props.navigation.push('Radios')
                        } else if (params.prop == 'counter') {
                            this.props.navigation.push('Counter')
                        } else if (params.prop == 'rate') {
                            this.props.navigation.push('Rate')
                        } else if (params.prop == 'date') {
                            this.props.navigation.push('Date')
                        } else if (params.prop == 'progress') {
                            this.props.navigation.push('Progress')
                        } else if (params.prop == 'slider') {
                            this.props.navigation.push('Slider')
                        } else if (params.prop == 'image') {
                            this.props.navigation.push('Image')
                        }
                    }}  
                    data={{inputs: [{},{}]}}
                    columns={[   
                        {type: 'text-h1', value: 'react-native-freedomen DEMO', style: {paddingTB: 15, align: 'center'}}, 
                        //search box
                        columns.search,
                        
                        //折叠
                        [
                            {type: 'text-h1', value: '折叠', style: {flex: 1}},
                            {type: 'image-icon', filter: (value, data) => { return data.coll ? require('../assets/bottom.png') : require('../assets/right.png') }},
                            {type: 'click-row', prop: 'fold'}
                        ], [
                            {type: 'text-h1', value: '内容'},
                            {type: 'text-h3', value: '内容'},
                            {type: 'br', prop: 'coll', load: value => value, style: {padding: 10}}
                        ],
                        // (data) => {
                        //     let arr = []
                        //     for (let i = 0; i < (data.inputs || []).length; i ++) {
                        //         arr.push({type: 'input-text', placeholder: '输入', prop: 'input' + i, value: data['input' + i], style: {borderColor: '#ccc', borderWidth: .5, padding: 2,borderRadius: 5, marginRight: 5, align: 'center'}})
                        //     }
                        //     arr.push({type: 'button-primary', prop: 'add', value: '添加', style: {padding: 5, borderRadius: 5}})
                        //     arr.push({type: 'br-row'})
                        //     return arr
                        // },
                        //
                        {type: 'button-custom1', prop: 'setMiddle', value: '设置middle  badge', style: {margin: 0}},
                        {type: 'button-cancel', prop: 'button', value: 'Button', style: {marginTop: 5}},
                        {type: 'button-primary', prop: 'checkbox', value: 'CheckBox', style: {marginTop: 5}},
                        {type: 'button-cancel', prop: 'checkboxs', value: 'CheckBoxs', style: {marginTop: 5}},

                        {type: 'button-primary', prop: 'radio', value: 'Radio', style: {marginTop: 5}},
                        {type: 'button-cancel', prop: 'radios', value: 'Radios', style: {marginTop: 5}},

                        {type: 'button-primary', prop: 'input', value: 'Input', style: {marginTop: 5}},
                        {type: 'button-cancel', prop: 'select', value: 'Select', style: {marginTop: 5}},
                        {type: 'button-primary', prop: 'tags', value: 'Tags', style: {marginTop: 5}},
                        {type: 'button-cancel', prop: 'text', value: 'Text', style: {marginTop: 5}},
                        {type: 'button-primary', prop: 'counter', value: 'Counter', style: {marginTop: 5}},
                        {type: 'button-cancel', prop: 'rate', value: 'Rate', style: {marginTop: 5}},
                        {type: 'button-primary', prop: 'slider', value: 'Slider', style: {marginTop: 5}},
                        {type: 'button-cancel', prop: 'date', value: 'Date', style: {marginTop: 5}},
                        {type: 'button-primary', prop: 'progress', value: 'Progress', style: {marginTop: 5}},
                        {type: 'button-cancel', prop: 'image',value: 'Image', style: {marginTop: 5}},
                        
                    ]}
                />
                <Freedomen.Region 
                    data={this.state.data}
                    event={params => {
                        if(params.value && params.value.prop == 'click') { 
                            this.props.navigation.push(params.value.row.label)
                        }
                    }}
                    columns={[
                            {type: 'views', prop: 'items', value: [], style: {flexDirection: 'row', flexWrap: 'wrap'}, columns: [
                                {type: 'image-item', prop: 'item-icon', value: require('../assets/form.png')},
                                {type: 'text-h4', prop: 'label'},
                                //width 要减去scroll padding  
                                {type: 'click', prop: 'click', style: {align: 'center', width: '24'}}
                            ]}
                        ]} 
                        
                    />
               
            </ScrollView>
          )
    }
  }