import React from 'react'   
import util from '../utils/util' 

export default class Base extends React.Component {

    innerChange = false
    
    shouldComponentUpdate(nextProps) {   
        let flag = false
        //内部值变化
        if (this.innerChange){
            
            this.innerChange = false
           
            flag = true
        }

        //style是否有变化
        if (nextProps.item.style) {
           
            this.nextStyle = this._style(nextProps.item.style, nextProps.item.value, nextProps.item.$data)
           
            if (!util.equals(this.nextStyle, this.style)) { //need compare  
                this.style = this.nextStyle 
                flag = true
            }  
        }

        //option是否有变化
        if (nextProps.item.options) {

            this.nextOptions = this._options(nextProps.item.options)

            if (!util.equals(this.nextOptions, this.options)) { //need compare 
                this.options = this.nextOptions  
                flag = true
            }  
        }

        //disabled是否有变化
        if (nextProps.item.disabled) {

            this.nextDisabled = this._disabled(nextProps.item.disabled, nextProps.item.value, nextProps.item.$data)

            if (this.nextDisabled !== this.disabled) { //need compare 
                this.disabled = this.nextDisabled  
                flag = true
            }  
        } 

        //filter是否有变化, filter 优先级高于 value
        if (nextProps.item.filter) {

            this.nextFilter = this._filter(nextProps.item.filter, nextProps.item.value, nextProps.item.$data)

            if (!util.equals(this.nextFilter, this.filter)) { //need compare 
                this.filter = this.nextFilter 
                flag = true
            }  
            
        } else if (!util.equals(this._resetValue ? this._resetValue(nextProps.item.value) : nextProps.item.value, this.state.value)) {
            flag = true
        }
        
        return flag
    }

    _filter = (filter, value, data) =>  { 
        if (!filter)
            return null 

        if (typeof filter === 'string') {
            return util.formatDate.format(new Date(value), filter)
        }

        if (util.isPlainObject(filter)) {
            return filter[value]
        } 

        let obj
        if (typeof filter === 'function') {
            obj = filter(value, data) 
        }
        if (util.isPlainObject(obj)) 
            return obj[value]
        else return obj
    }
 
    _style = (style, value, data) => {

        let tempStyle 

        if (!style) {
            tempStyle = {}
        } else if (typeof style === 'function') {
            tempStyle = util.resetStyle(style(value, data))
        } else {
            tempStyle = util.resetStyle(style)
        }

        if (this.props.item && this.props.item.type && util.startWith(this.props.item.type, 'text', 'input', 'button')) {
            this._reSetStyleItem(tempStyle)
        }
        return tempStyle
    }
    _reSetStyleItem(tempStyle) {
        if(tempStyle.alignItems)
            tempStyle.textAlign = {'flex-end': 'right', 'flex-start': 'left'}[tempStyle.alignItems] || tempStyle.alignItems
        if (tempStyle.justifyContent)
            tempStyle.textAlignVertical = {'flex-end': 'right', 'flex-start': 'left'}[tempStyle.justifyContent] || tempStyle.justifyContent
        return tempStyle
    }
    _options = (options) => {
        return util.correctOption(options)
    }

    _change = (value) => {  
        this.innerChange = true
        this.setState({
            value: value
        }, () => {
            //todo  on blur和1秒内没输入时调用
            this.props.change && this.props.change({
                prop: this.state.prop,
                value: value
            }) 
        })
    } 

    _event = (type) => {
        this.props.event && this.props.event({
            type: type, 
            prop: this.state.prop, 
            value: this.state.value
        })
    }

    _disabled = (disabled, value, data) => {
        if (typeof disabled === 'function')
            return disabled(value, data)

        return disabled
    }
}
 