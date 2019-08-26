import React from 'react'
import { Text } from 'react-native'
import util from '../../utils/util'
import theme from '../../config/theme'   
import Base from '../Base'

class FdText extends Base { 
    constructor (props) {
        super (props)
        let item = props.item || {} 

        this.state = {
            prop: item.prop,
            value: item.value,
            data: item.$data, 
            placeholder: item.placeholder
        }    

        this.style = this._style(item.style, this.state.value, this.state.data)    
        this.filter = this._filter(item.filter, this.state.value, this.state.data)
    } 

    componentWillReceiveProps(nextProps) {   
        this.setState({
            value: nextProps.item.value
        }) 
    }  

    render () {    
        let _text = this.filter || this.state.value
 
        return (
            <Text 
                {...this.props.item.other}
                style={[util.resetStyle(theme.external[this.props.item.type]) , this.style, !_text && {color: theme.color.placeholder}]} 
            >  
                {
                    this.filter || this.state.value || this.state.placeholder
                }
            </Text>
        )
    }
}

export default FdText