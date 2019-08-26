import React, { Component } from 'react';
import Slider from 'react-native-slider'
import Base from '../Base'
import { 
	View, 
} from 'react-native';

import theme from '../../config/theme'
import util from '../../utils/util'
const styleItems = [
    'height',  //
    'width' //
] 

class FdSlider extends Base {

	constructor(props) {
        super(props)
        
        let item = props.item || {}
		this.state = {
			value: item.value,
            prop: item.prop,
            data: item.$data
        }

        this.style = this._style(item.style, this.state.value, this.state.data) 
        this.disabled = this._disabled(item.disabled, this.state.value, this.state.data)
    }
 
	componentWillReceiveProps(nextProps) {
		this.setState({
			value: nextProps.item.value
		})
	}
 
	render() {
        return (
            <View style={[
                util.makeStyle(theme.external[this.props.item.type], ...theme.styleContain, ...styleItems), 
                util.makeStyle(this.style, ...theme.styleContain, ...styleItems)
            ]}>
                <Slider 
                    disabled={this.disabled}
                    minimumTrackTintColor={theme.color.primaryColor}
                    thumbTintColor={theme.color.primaryColor}
                    value={this.state.value} 
                    onValueChange={this._change} />
            </View>
        )
	}
}

 
export default FdSlider