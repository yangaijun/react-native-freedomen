import React from 'react'
import { Picker} from 'react-native' 
import util from '../../utils/util'
import theme from '../../config/theme'
import Base from '../Base'
class FdSelect extends Base {
    constructor (props) {
        super (props)
        let item = props.item || {} 
        this.state = {
            value: item.value, 
            prop: item.prop,
            data: item.$data,
        }  

        this.options = this._options(item.options)
        this.style = this._style(item.style, this.state.value, this.state.data) 
        this.disabled = this._disabled(item.disabled, this.state.value, this.state.data)
    }  

    componentWillReceiveProps(nextProps) { 
        this.setState({
            value: nextProps.item.value
        })
    } 
 
    _optionItem = (options) => {
         
        let items = options.map((option, i) => {
            return <Picker.Item key={i} label={option.label} value={option.value} />
        })

        if (this.props.item.placeholder && !this.state.value) 
            items = [<Picker.Item key={-1} label={this.props.item.placeholder} value={-1} color={theme.color.placeholder}/>, ...items]

        return items
    }

    render () { 
        return (
            <Picker
                selectedValue={this.state.value} 
                enabled={!this.disabled}
                {...this.props.item.others}
                style={[{marginLeft: -5}, theme.external[this.props.item.type], this.style]}
                onValueChange={this._change}>
                    {
                        this._optionItem(this.options)
                    }
            </Picker>
        )
    }
}

export default FdSelect