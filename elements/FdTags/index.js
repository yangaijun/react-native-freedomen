import React from 'react'
import Base from '../Base'
import {Text, View, Animated, TouchableOpacity} from 'react-native'
import util from '../../utils/util'
import theme from '../../config/theme'
const styleItems = [
    'width',  
    'height',  
    'flex',
    'borderColor',
    'borderWidth', 
    'borderRadius',
]
 
export default class extends Base { 
    constructor (props) {
        super (props)
        let item = props.item || {}
        
        this.state = {
            prop: item.prop,
            value: this._resetValue(item.value), 
            size: item.size || 1,
            data: item.$data
        }   

        this.style = this._style(item.style)   
        this.options = this._options(item.options)
        this.scaleValue = new Animated.Value(0)

        this.scale = this.scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.2, 1]
        })

    }

    _resetValue = (value) => {
        if (!value)
            return []
        else if (Array.isArray(value))
            return value
        else return value.split(',')
    }

    _startAnimation() {
        this.scaleValue.setValue(0)

        Animated.spring(
            this.scaleValue,
            {
                toValue: 1,
            }
        ).start()
    }

    componentWillReceiveProps(nextProps) {    
        let rsValue = this._resetValue(nextProps.item.value)
        if (!util.equals(this.state.value, rsValue)) 
            this.setState({
                value: rsValue
            }, () => {
                this._startAnimation()
            }) 
    } 

    _press = (data) => { 
        let value = this.state.value 
        let index = value.indexOf(data.value)

        if (index == -1 && value.length >= this.state.size) {
            value[0] = data.value
        } else if (index == -1) {
            value.push(data.value)
        } else {
            value.splice(index, 1)
        } 

        this._change(value.length != 0 ? (this.state.size == 1 ? value[0] : value): (this.state.size == 1 ? '' : value))
        this._startAnimation()
        
    }
     
    render () {  
        return (<View style={[{
                    flexDirection: 'row', 
                    flexWrap: 'wrap'
                },
                util.makeStyle(theme.external[this.props.item.type], ...theme.styleContain, 'flexDirection', 'flexWrap'),
                util.makeStyle(this.style, ...theme.styleContain, 'flexDirection', 'flexWrap')
            ]}>
            {
                this.options.map((data, key) => {
                    return <Animated.View
                            key={key} 
                            style={[
                                {
                                    height: theme.size.normalHeight, 
                                    marginRight: theme.size.itemSpace, 
                                    borderColor: theme.color.primaryColor, 
                                    borderWidth: .6, 
                                    borderRadius: 5
                                }, 
                                util.makeStyle(theme.external[this.props.item.type], ...styleItems),
                                this.state.value.indexOf(data.value) != -1 && {backgroundColor: theme.color.primaryColor, transform: [{scale: this.scale}]},
                                this.state.value.indexOf(data.value) == -1 && util.makeStyle(this.style, 'backgroundColor'),
                                util.makeStyle(this.style, ...styleItems)
                            ]}>
                        <TouchableOpacity 
                            style={{
                                paddingHorizontal: theme.size.itemSpace,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => {this._press(data)}} 
                            >
                            <Text style={[ 
                                util.makeStyle(theme.external[this.props.item.type], 'color', 'fontSize'),
                                this.state.value.indexOf(data.value) != -1 ? {color: 'white'} : {color: theme.color.primaryColor},
                                this.state.value.indexOf(data.value) == -1 && util.makeStyle(this.style, 'color', 'fontSize')
                            ]}>
                                {data.label}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                })
            }
        </View>)
    }
}
 