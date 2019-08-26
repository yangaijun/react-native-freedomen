import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, RefreshControl, Platform } from 'react-native'
import Region from '../Region/index' 
import theme from '../../config/theme';
import util from '../../utils/util'

class FreshList extends Component {   

    config = {
        pageNo: 1,
        pageSize: 15
    }

    constructor (props) {  
        super (props)

        this.tempProps = props
        //是否第一次初始化
        this.first = true 
        this.config.pageSize = props.pageSize || this.config.pageSize
        this.config.pageNo = props.pageNo || this.config.pageNo

        this.state = { 
            columns: props.columns,
            data: props.data || [], 

            noMore: true,
            animating: true,
            freshing: false,
            paging: false,
            pageNo: this.config.pageNo, 
        } 

        let columns = this.state.columns
        let column = columns[columns.length - 1]

        if (util.startWith(column.type, ...['br', 'click', 'backimage', 'swipeout']) && column.style && typeof column.style.width === 'string') {
            let width = parseInt(column.style.width)
            
            if (width <= 50) {
                this.numColumns = parseInt(100 / width)
            }
        }
    }  
    resetData = (data) => {
        data.map((d, i) => {
            d.key = i + ''
        })  
        this.setState({
            data: data,
            noMore: data.length < this.config.pageSize,
            pageNo: this.config.pageNo
        })
        if (data.length)
            this.refs.flatList.scrollToIndex({
                index: 0,
                viewPosition: 0
            })
    }
    componentWillReceiveProps(nextProps) {   

        if (this.first) {
            this.first = false

            let data = nextProps.data
            data.map((d, i) => {
                d.key = i + ''
            })  

            this.setState({
                data: nextProps.data, 
                animating: false,
                noMore: nextProps.data.length < this.config.pageSize
            })
        } else if (this.state.paging) {  
            let data = nextProps.data
            let lastIndex = this.state.data.length
            data.map((d, i) => {
                d.key = lastIndex + i + ''
            })  
            this.setState({
                paging: false,
                data: this.state.data.concat(data), 
                noMore: nextProps.data .length < this.config.pageSize
            })

        } else if (this.state.freshing) {  

            let data = nextProps.data
            data.map((d, i) => {
                d.key = i + ''
            })  

            this.setState({
                data: data, 
                freshing: false,  
                noMore: nextProps.data.length < this.config.pageSize
            }) 
        } 
    }

    _fresh = () => { 
        if (this.state.freshing) {
            return
        }  

        this.setState({
            freshing: true, 
            noMore: true,
            pageNo: this.config.pageNo 
        }, () => {
            this._event({ 
                prop: '$fresh', 
                event: '$fresh', 
                row: { pageNo: this.config.pageNo }
            })
        })
    }

    _page = () => {     
        if (this.state.noMore || this.state.paging)
            return  
            
        this.setState({
            paging: true, 
            pageNo: this.state.pageNo + 1
        } , () => {
            this._event({ 
                prop: '$page', 
                event: '$page', 
                row: { pageNo: this.state.pageNo } 
            }) 
        })
    }
    
    _event(params) {  
        this.props.event && this.props.event(params)
    }

    _footer = () =>{ 
        if (this.props.footer) {
            return this.props.footer(this.state.noMore)
        }

        return (
            <View style={{alignItems: 'center', margin: 5}}> 
                {
                    this.state.noMore ?
                        this.props.loadOverComponent || <Text style={{color: theme.color.placeholder}}>已加载全部</Text> 
                    : 
                    <View style={{flexDirection: 'row'}}>
                        <ActivityIndicator
                            color={theme.color.primaryColor}
                            animating={true} 
                            size="small" 
                        />
                        { this.props.loadingComponent || <Text style={{color: theme.color.placeholder}}>加载中...</Text>}
                    </View>
                }
                
            </View>
        )
    }

    render () {
        const ts = Platform.OS === 'android' ? 0.01 : 0;
        let { columns, data } = this.state

        return  (
            this.state.animating 
            ? 
                <ActivityIndicator
                animating={this.state.animating} 
                size="large" />
            :
                <FlatList  
                    ref={'flatList'}
                    showsVerticalScrollIndicator={false}
                    data={data}    
                    refreshControl = {
                        <RefreshControl refreshing={this.state.freshing} onRefresh={this._fresh} />
                    }
                    onEndReached={this._page}
                    onEndReachedThreshold={ts}
                    ListEmptyComponent={this.props.onEmpty ? this.props.onEmpty : null}
                    numColumns={this.numColumns || 1}
                    columnWrapperStyle={this.props.style && this.numColumns > 1 ? this.props.style : null}
                    renderItem={
                        ({item, key}) => <Region data = {item} key={key} columns={columns} event={this.props.event} />
                    }
                    ListFooterComponent={this._footer}
                    {...this.props.others}
                /> 
        )
    }
}

export default FreshList