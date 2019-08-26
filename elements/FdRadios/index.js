import React from 'react'
import {Text, View} from 'react-native'
import util from '../../utils/util'
import theme from '../../config/theme'
import Radio from '../FdRadio/index'
import Base from '../Base'

export default class extends Base { 

    constructor (props) {
        super (props)
        let item = props.item || {} 

        this.state = {
            type: item.type,
            prop: item.prop,
            value: item.value || '',
            data: item.$data
        }   

        this.options = this._options(item.options)
        this.style = this._style(item.style)   
           
    } 

    componentWillReceiveProps(nextProps) { 
 
        if (nextProps.item.value != this.state.value)
            this.setState({
                value: nextProps.item.value || ''
            })
    } 
  
    render () {  
        return (
            <View style={[
                {flexDirection: 'row'},
                util.makeStyle(theme.external[this.props.item.type], ...theme.styleContain), 
                util.makeStyle(this.style, ...theme.styleContain, 'flex')
            ]}>
                {
                    this.options.map((el, index) => {
                        return <View key={index} style={[{flexDirection: 'row', alignItems: 'center'}]}>
                            <Radio 
                                item={{
                                    prop: el.value,
                                    checked: this.props.item.checked, 
                                    unCheck: this.props.item.unCheck, 
                                    value: this.state.value == el.value,
                                }} 
                                change={(params) => {
                                    this._change(params.prop)
                                }}
                            />
                            <Text style={[
                                {
                                    color: theme.color.optionColor,
                                    fontSize: theme.size.primarySize, 
                                    marginLeft: 5,
                                    marginRight: theme.size.itemSpace
                                },
                                util.makeStyle(theme.external[this.props.item.type], 'fontSize', 'color'),
                                util.makeStyle(this.style, 'fontSize', 'color'),
                                this.state.value == el.value && {color: theme.color.primaryColor}
                            ]}>
                                {el.label}
                            </Text>
                        </View>
                    })
                }
            </View>
        )
    }
} 