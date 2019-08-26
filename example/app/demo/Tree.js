import React from 'react'
import {ScrollView, Text} from "react-native";
import Freedomen from 'react-native-freedomen'    
export default class extends React.Component {
    static navigationOptions = {
        title: '二叉树',
    } 
    constructor(props) {
        super(props)
        this.state = { 
            columns: [{type: 'text', value: 'loading'}]
        } 
        //保存数据，取得最后选择的数据
        this.data = {} 
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                columns: this.children([
                    {value: 1, label: '选项1',
                        children: [
                            {value: 2, label: '选项1-1'},
                            {value: 3, label: '选项1-2'},
                            {value: 4, label: '选项1-3', children: [
                                {value: 5, label: '选项1-3-1'},
                                {value: 6, label: '选项1-3-2'},
                            ]},   
                        ]
                    }, {
                        value: 7, label: '选项2'
                    }, {
                        value: 8, label: '选项3', children: [
                            {value: 9, label: '选项3-1'},
                            {value: 10, label: '选项3-2'},
                        ]
                    }
                ])
            })
        }, 800);
    }
    children(list, level = 0, item, label = '') {
        let arr = []
        list.forEach(el => {
            arr.push([
                {type: 'image-form',  filter: (value, data) => data[el.label + '_check'] ? require('../assets/check.png') : require('../assets/uncheck.png')},
                {type: 'text-h4', value: el.label, style: {flex: 1, marginLeft: 8}},
                {type: 'button-image', prop: el.value, filter: (value, data) => {
                    return data[el.value] ? require('../assets/bottom.png') : require('../assets/right.png')
                }, load: value => el.children, style: {width: 18, height: 18, paddingRight: 15, paddingLeft: 45}},
                {type: 'click', style: {paddingTB: 12, paddingLeft: 15, backgroundColor:'white', marginBottom: 2, flexDirection: 'row', alignItems: 'center', marginLeft: level * 35}, prop: el.label + '_check'}
            ])  
            
            this.data[el.label + '_check'] = label + el.label
            
            if (el.children) {
                arr.push(this.children(el.children, level + 1, el, label + el.label))
            } 
        })

        arr.push({
            type: 'br', 
            load: (value, data) => {
                if (item === void 0)
                    return true
                else return data[item.value]
            }
        })
        return arr
    }
    render() {
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
                <Freedomen.Region 
                    columns={this.state.columns}
                    event={params => { 
                        if (params.prop) {
                            let back = {
                                ...params.row 
                            }
                            back[params.prop] = !back[params.prop]

                            return back
                        } 
                    }}
                />
            </ScrollView>
        );
    }
  }