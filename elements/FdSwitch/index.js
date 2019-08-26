import React from 'react'
import { Switch, View } from 'react-native' 
import theme from '../../config/theme'
import Base from '../Base'

class FdSwitch extends Base {
    constructor (props) {
        super (props)
        let item = props.item || {} 
        this.state = {
            value: !!item.value, 
            prop: item.prop, 
            data: item.$data
        }
        this.style = this._style(item.style, this.state.value, this.state.data) 
    } 

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.item.value
        })
    } 
    
    render () {
        return (
            <View style={[
                theme.external[this.props.item.type],
                this.style
            ]}>
                <Switch thumbColor={theme.color.primaryColor} 
                    trackColor={{false: theme.color.placeholder, true: theme.color.primaryColor}} 
                    value={this.state.value} 
                    onValueChange={this._change}
                />
            </View>
        )
    }
}

export default FdSwitch