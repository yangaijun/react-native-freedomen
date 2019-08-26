import React from 'react'
import {Text, View, TextInput, TouchableOpacity} from 'react-native'
import util from '../../utils/util'
import theme from '../../config/theme'
const styleItems = [
    'width', 
    'height',  
    'borderColor',
    'borderWidth', 
]
import Base from '../Base'

class FdCounter extends Base { 
    constructor (props) {
        super (props)
        let item = props.item || {}, value = 0

        try {
            value =  parseInt(item.value) || 0
        } catch(e) { }

        this.state = {
            prop: item.prop,
            value: value, 

            min: item.min || 0,
            max: item.max || 100,
            step: item.step || 1,
            data: item.$data
        }   
        
        this.style = this._style(item.style, this.state.value, this.state.data)   
        this.disabled = this._disabled(item.disabled, this.state.value, this.state.data)     
    }

    componentWillReceiveProps(nextProps) { 
        if (nextProps.item.value != this.state.value)
            this.setState({
                value: nextProps.item.value
            })
    } 

    _submit = (cm) => {
        if (this.disabled)
            return
        if (cm == 'sub') {
            let value = this.state.value
            value = value - this.state.step < this.state.min ? this.state.min : value - this.state.step
            this._change(value)
        } else if (cm == 'add') {
            let value = this.state.value
            value = value + this.state.step > this.state.max ? this.state.max : value + this.state.step
            this._change(value)
        } 
    } 
    
    render () { 
        return (
            <View style={[
                util.makeStyle(theme.external[this.props.item.type], ...theme.styleContain), 
                util.makeStyle(this.style, ...theme.styleContain)
            ]}>
                <View style={[
                    {
                        height: theme.size.largeHeight, 
                        width: theme.size.largeHeight * 3.6, 
                        borderColor: theme.color.primaryColor, 
                        borderWidth: .6, 
                        borderRadius: 5, 
                        flexDirection: 'row'
                    }, 
                    theme.external[this.props.item.type], 
                    util.makeStyle(this.style, ...styleItems)
                ]}>
                    <TouchableOpacity 
                        style={{
                            width: theme.size.largeHeight, 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            borderRightColor: theme.color.primaryColor,  
                            borderRightWidth: .6
                        }} 
                        onPress={() => {this._submit('sub')}}
                    >
                        <Text style={{
                                color: 'white', 
                                fontSize: 22,
                                color: theme.color.primaryColor
                            }}> 
                            - 
                        </Text> 
                    </TouchableOpacity> 

                    <TextInput 
                        value={String(this.state.value)} 
                        onChangeText={value => {
                            if (this.disabled)
                                return
                            let tempValue = value 
                            if (tempValue > this.state.max)
                                tempValue = this.state.max
                            else if (tempValue < this.state.min)
                                tempValue = this.state.min  

                            this._change(parseInt(tempValue) || this.state.min)
                        }}  
                        style={{flex: 1, padding: 0, textAlign: 'center'}}
                        keyboardType={'number-pad'}
                    />
                    
                    <TouchableOpacity 
                        style={{
                                width: theme.size.largeHeight, 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                borderLeftWidth: .6,
                                borderLeftColor: theme.color.primaryColor, 
                            }} 
                            onPress={() => {this._submit('add')}}
                        >
                        <Text style={{
                                color: 'white', 
                                fontSize: 22,
                                color: theme.color.primaryColor, 
                            }}> 
                            + 
                        </Text> 
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default FdCounter