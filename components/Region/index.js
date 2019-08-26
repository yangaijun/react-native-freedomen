import React, { Component } from 'react';
import {View} from 'react-native'

import elements from '../../elements' 
import containers from '../../containers'
import multi from './multi'  

import util from '../../utils/util'   
const funMap = {} 

class Region extends Component {
    //全局状态管理
    static redux = (obj) => { 
        Object.keys(obj).forEach((key) => {
            if (Region.reduxMap[key] !== void 0) { 
                let newData = {}
                if (typeof obj[key] === 'function') {
                    newData = obj[key](Region.reduxMap[key].data) 
                } else {
                    newData = obj[key] 
                } 

                let currentComponent = Region.reduxMap[key]._this
                currentComponent._fresh(currentComponent, newData)
            }
        });
    }
    //状态存储表
    static reduxMap = {} 
    
    constructor(props) {
        super(props)  
        //copy a new columns
        this.columns = util.clone(props.columns)
        this.state = { 
            data: props.data || {},
            columns: this._getColumns(this.columns, props.data),
            style: util.resetStyle(props.style) 
        } 
        this.inputs = []
        //内置redux
        if (props.redux) {  
            if (Region.reduxMap[props.redux]) {
                console.warn('the key ' + props.redux + ' already exists')
            }
            Region.reduxMap[props.redux] = {
                _this: this,
                data: this.state.data
            }
        }
    } 

    _fresh(_this, newData) { 
        if (newData === void 0)
            return

        _this.setState({
            data: newData,
            columns: _this._getColumns(_this.columns, newData) 
        })
        //if reudex, renew
        if (_this.props.redux) {
            Region.reduxMap[_this.props.redux].data = newData
        }

        if (_this.inputs.length) { 
            for (let ref of _this.inputs) { 
                //newData[ref] == void 0    use oldData ???
                _this.refs[ref] && _this.refs[ref]._fresh(newData[ref])
            }
        }
    }

    componentWillUnmount() {
        //清除没有用的redux
        if (this.props.redux && Region.reduxMap[this.props.redux]) { 
            delete Region.reduxMap[this.props.redux]
        }
    }
    
    componentWillReceiveProps(nextProps) {   
        let data = this.state.data 
        for (let i in nextProps.data) {
            data[i] = nextProps.data[i]
        } 
       
        this.columns = nextProps.columns 
        this._fresh(this, data) 
    } 

    _saveFun(key, columns) { 
        funMap[key] = columns
    }

    _getFun(key) { 
        return funMap[key]
    }

    _setColumn(column, data) {
        column.value = data[column.prop] === void 0 ? column.value : data[column.prop] //reset item value
        column.$data = data  //into full data
    }

    _getColumns(columns, data) {
        //init fn keys
        this.fnKey = 0
        return this._resetColumns(columns, data)
    }

    _resetColumns = (columns = [], data = {}) => {
        for (let i = 0; i < columns.length; i ++) { 
            if (Array.isArray(columns[i])) {
                this._resetColumns(columns[i], data)
            } else if (typeof columns[i] === 'function') { 
                let column = columns[i](data)
                //key has a problem
                Array.isArray(columns[i]) ? this._resetColumns(column, data) : this._setColumn(column, data)
                
                this._saveFun(this.fnKey ++, column)
            } else { 
                this._setColumn(columns[i], data) 
            } 
        } 
        return columns
    } 

    _tagHasColumnsEvent = (params, el) => {
        let newData = this.props.event && this.props.event(params) 
                        
        if (newData && typeof newData === 'object')  {
            // this.refs[el.prop]._fresh(newData, params.index)
            let data = this.state.data
            
            if (data[el.prop]) {
                data[el.prop][params.index] = newData
            } else {
                data[el.prop] = el.value || []
                data[el.prop][params.index] = newData
            }
            
            this._fresh(this, data) 
        } else if (newData != void 0) {
            console.warn('暫不支持')
        }
    }

    _getType(el) {
        let type, _index = (el.type || '').indexOf('-')
        
        if (_index !== -1) {
            type = el.type.substring(0, _index)
        } else {
            type = el.type
        } 

        return type
    }
    _tag = (el, index) => {
        let type = this._getType(el)
        let Jsx = multi.get(type)

        if (Jsx) {
            return <Jsx 
                key={index}
                others={el.others}
                event={params => {this._tagHasColumnsEvent(params, el)}}
                style={el.style} 
                columns={el.columns} 
                data={el.value} 
                type={el.type}
            />
        }

        Jsx =  elements.get(type) 

        if (!Jsx) {
            return <View {...el} />
        }

        if (type == 'input') {
            this.inputs.push(el.prop)
        }
        Jsx = <Jsx 
            key={index} 
            event={this._event} 
            ref={el.prop}
            change={this._change}
            item={el}
        /> 
        return Jsx
    }

    _change = (param) => {  
        let { data } = this.state
        data[param.prop] = param.value 

        this.setState({
            data: data,
            columns: this._getColumns(this.state.columns, data) 
        }, () => {
            let params = {
                type: 'change',
                prop: param.prop,
                value: param.value
            }
            this._event(params)
        })
    }

    _dueBack(newData) {
        if (newData instanceof Promise) {
            newData.then(nData => {
                this._fresh(this, nData) 
            })
        } else if (newData instanceof Function) {
            let nData = newData()

            if (nData)
                this._dueBack(nData)
        } else  {
            this._fresh(this, newData) 
        }
    }

    _event = (params) => {    
        params.row = this.state.data 
        let newData = this.props.event && this.props.event(params)

        if (newData)   
            this._dueBack(newData)

    }

    _getContainer(el, children, index) {
        let type = this._getType(el)
        let Jsx = containers.get(type)
        Jsx = <Jsx 
            key={index}
            event={this._event} 
            item={el}
            children={children}
        /> 
        return Jsx
    }

    _makeJsx = (columns) => {
        let view = [], sub = [] 
        for (let i = 0; i < columns.length; i ++) {  

            if (typeof columns[i] === 'function') {
                let column = this._getFun(this.fnKey ++)
                sub.push(Array.isArray(column) ? this._makeJsx(column) : this._tag(column, i)) 
                continue
            }
            
            if (util.startWith(columns[columns.length - 1].type, ...containers.keys()) && typeof columns[columns.length - 1].load === 'function') {
                if (!columns[columns.length - 1].load(columns[columns.length - 1].value, this.state.data))
                    continue
            }

            if (columns[i].load && typeof columns[i].load === 'function') {
                if (!columns[i].load(columns[i].value, this.state.data))
                    continue
            }
            //容器类别
            if (i === columns.length - 1 && util.startWith(columns[i].type, ...containers.keys())) {
                view.push(this._getContainer(columns[i], sub, i))
                sub = [] 
            //数组，递归
            } else if (Array.isArray(columns[i])) {
                sub.push(this._makeJsx(columns[i]))
            } else {
                sub.push(this._tag(columns[i], i))
            }
        }  
        
        if (columns.length && !util.startWith(columns[columns.length - 1].type, ...containers.keys()))  
            view.push(<View key={'_10000'} style={util.resetStyle(this.state.style)}>{ sub }</View>) 

        return view
    }
    
    render() {   
        this.fnKey = 0
        return (
            <View style={util.resetStyle(this.state.style)}>
                {
                    this._makeJsx(this.state.columns)
                }
            </View> 
        )
    }
} 
 
export default Region