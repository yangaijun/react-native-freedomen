import React, { Component } from 'react';
import { View } from 'react-native'
import Region from '../Region/index' 
import util from '../../utils/util'

export default class extends Component { 

    constructor (props) {
        super (props)
 
        this.state = {
            columns: props.columns || [],  
            data: props.data || [],
            type: props.type
        } 
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
        })
    } 
    _event = (params, index) => {
        return this.props.event && this.props.event({
            prop: this.props.prop,
            type: 'views', 
            value: params,
            row: this.state.data,
            index: index
        })
    }
    _fresh = (newData, index) => {
        let data = this.state.data
        data[index] = newData
        this.setState({data: data})
    }
    render () {
        let { columns, data } = this.state
         
        let  jsx = data.map((d, index) => {
            d.$index = index
            return <Region  columns={columns} data={d} key={index} event={(params) => {this._event(params, index)}} /> 
        }) 

        return <View style={[{flexDirection: this.props.type == 'view-x' ? 'row': 'column'}, util.resetStyle(this.props.style)]} {...this.props.others}>
            {
                jsx
            }
        </View>
    }
}