import React from 'react'
import {Text, View, TextInput} from 'react-native' 
import util from '../../utils/util'
import theme from '../../config/theme'
import Base from '../Base'

const styleItems = [ 
    'textAlign',
    'textAlignVertical',
    'alignItems',
    'justifyContent'
]

export default class FdInput extends Base { 

    constructor (props) {
        super (props)
        let item = props.item || {}
        //{item => Object: [type, value, label, event...]}
        //type: button-text, button-image, button-view
        this.state = {
            prop: item.prop,
            value: item.value, 
            data: item.$data,

            keyboardType: item.keyboardType,
            placeholder: item.placeholder
        }  
        this.style = this._style(item.style, this.state.value, this.state.data) 
        this.disabled = this._disabled(item.disabled, this.state.value, this.state.data)  
    }

    _fresh = (data) => {
        this.setState({
            value: data
        })
    } 

    render () {  
        return (  
            util.startWith(this.props.item.type, 'input-area')
            ? 
            <View style={[theme.external[this.props.item.type] ,this.style]}>
                <TextInput  
                    underlineColorAndroid="transparent"  
                    placeholder={this.state.placeholder} 
                    placeholderTextColor={this.style.placeholderTextColor || theme.color.placeholder}
                    autoCorrect={false}  
                    multiline = {true}
                    editable={!this.disabled}
                    maxLength={this.props.item.maxLength}
                    numberOfLines = {3 || this.props.item.row || this.props.item.numberOfLines}
                    underlineColorAndroid={'transparent'}
                    style={[
                        {textAlignVertical: 'top', padding: 0}, 
                        this._reSetStyleItem(util.makeStyle(theme.external[this.props.item.type], ...styleItems)),  
                        util.makeStyle(this.style, ...styleItems)
                    ]} 
                    {...this.props.item.others}
                    value={typeof this.state.value === 'number' ? this.state.value + '' : this.state.value}  
                    onChangeText={this._change}/>
                    {
                        this.props.item.maxLength ? 
                        <Text style={[
                            {textAlign: 'right', color: theme.color.placeholder}, 
                            util.makeStyle(this.style, 'color', 'fontSize')
                        ]}>
                            {(this.state.value || '').length + ' / ' + this.props.item.maxLength}
                        </Text> : null
                    }
            </View>
            :
            <View style={[theme.external[this.props.item.type], this.style]}>
                <TextInput  
                    underlineColorAndroid="transparent" 
                    keyboardType={util.startWith('input-password', this.props.item.type)  ? 'default' : this.state.keyboardType || 'default'}   
                    placeholder={this.state.placeholder} 
                    placeholderTextColor={this.style.placeholderTextColor || theme.color.placeholder}
                    autoCorrect={false} 
                    autoCapitalize={'none'}  
                    editable={!this.disabled}
                    {...this.props.item.others}
                    maxLength={this.props.item.maxLength}
                    secureTextEntry={this.props.item.type === 'input-password'}
                    clearButtonMode={'while-editing'} 
                    style={[
                        {padding: 0}, 
                        this._reSetStyleItem(util.makeStyle(theme.external[this.props.item.type], ...styleItems)),  
                        util.makeStyle(this.style, ...styleItems)
                    ]} 
                    value={typeof this.state.value === 'number' ? this.state.value + '' : this.state.value}  
                    onChangeText={this._change}/>
            </View>
        )
    }
}
