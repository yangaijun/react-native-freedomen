import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 

export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '地址选择'
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            choose: props.navigation.state.params
        }
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        this.setState({
            list: [
                {addressId: 1, addressName: '江苏 苏州'},
                {addressId: 2, addressName: '江苏 南京'},
                {addressId: 3, addressName: '江苏 宿迁'},
                {addressId: 4, addressName: '江苏 镇江'},
                {addressId: 5, addressName: '江苏 合肥'},
                {addressId: 6, addressName: '上海 上海市'},
                {addressId: 7, addressName: '北京 北京市'},
                {addressId: 8, addressName: '河南 郑州'},
            ]
        })
    }
    render() {
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
                {
                    this.state.list.map((el, index) => {
                        return <Freedomen.Region 
                            key={index}
                            data={el}
                            event={params => {
                                Freedomen.redux({
                                    sjjh_form: (data) => {
                                        return {
                                            ...data,
                                            ...params.row
                                        }
                                    }
                                })
                                this.props.navigation.goBack()
                            }}
                            columns={[
                                {type: 'text-h4', prop: 'addressName', style: (value, data) => {
                                    return (data.addressId == this.state.choose.addressId) && {
                                        color: 'blue'
                                    }
                                }},
                                {type: 'click-form-row'}
                            ]}
                        />
                    })
                }    
            </ScrollView>
        );
    }
  }