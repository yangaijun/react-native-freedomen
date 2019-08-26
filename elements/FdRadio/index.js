import React from 'react'
import {View, TouchableOpacity, Animated} from 'react-native'
import util from '../../utils/util' 
import theme from '../../config/theme';
import Base from '../Base'

const styleItems = [
    'width', 
    'height',   
    'borderRadius',
    'borderWidth', 
    'borderColor'
] 

export default class extends Base { 
    constructor (props) {
        super (props)
        let item = props.item || {} 

        this.state = {
            type: item.type,
            prop: item.prop,
            value: item.value, 
            data: item.$data
        }   

        this.style = this._style(item.style, this.state.value, this.state.data)   
        this.disabled = this._disabled(item.disabled, this.state.value, this.state.data)   
        this.scaleValue = new Animated.Value(0)
        this.scale = this.scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.2, 1]
        })
    }

    componentWillReceiveProps(nextProps) {    
        if (this.state.value !== nextProps.item.value)
            this.setState({
                value: nextProps.item.value
            }, () => {
                this._startAnimation()
            })   

        
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
  
    _click = () => {
        if (this.disabled)
            return
        this._change(!this.state.value)
        this._startAnimation()
    }
    _getStyle = (style) => {
        let _style = util.makeStyle(style, ...styleItems)
        let newHeight = _style.width || _style.height || theme.size.smallHeight

        _style.width = newHeight
        _style.height = newHeight
        _style.borderRadius = newHeight
        _style.padding = parseInt(newHeight * 0.13) 
        return _style
    }
    render () { 
        return (
            <TouchableOpacity 
                underlayColor={'transparent'} 
                onPress={this._click} 
                style={[
                    util.makeStyle(theme.external[this.props.item.type], ...theme.styleContain), 
                    util.makeStyle(this.style, ...theme.styleContain)
                ]}>
                <Animated.View style={[
                        {
                            borderWidth: 1.5, 
                            borderColor: theme.color.primaryColor,
                            borderRadius: theme.size.smallHeight,
                            height: theme.size.smallHeight, 
                            width: theme.size.smallHeight, 
                            padding: parseInt(theme.size.smallHeight * 0.13) 
                        }, 
                        theme.external[this.props.item.type], 
                        this._getStyle(this.style),
                        {transform: [{scale: this.scale}]}
                    ]}
                >
                {
                    this.state.value  ? 
                        <View style={[
                                {backgroundColor: theme.color.primaryColor, borderRadius: theme.size.smallHeight, flex: 1}, 
                                util.makeStyle(theme.external[this.props.item.type], 'borderRadius'),
                                util.makeStyle(this.style, 'borderRadius'),
                            ]} 
                        /> 
                    : null
                }
                </Animated.View>
            </TouchableOpacity>
        )
    }
} 