import { createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation"
import Home from './main/Home'
import Middle from './main/Middle'
import Mine from './main/Mine'
import Form from './page/Form' 
import Form2 from './page/Form2'
import Form3 from './page/Form3'
import Form4 from './page/Form4'
import Address from './page/Address'

import Button from './elements/Button'
import Input from './elements/Input'
import CheckBox from './elements/CheckBox'
import Select from './elements/Select'
import Tags from './elements/Tags'
import Text from './elements/Text'
import CheckBoxs from './elements/CheckBoxs'
import Radio from './elements/Radio'
import Radios from './elements/Radios'
import Counter from './elements/Counter'
import Rate from './elements/Rate'
import Slider from './elements/Slider'
import _Date from './elements/Date'
import Progress from './elements/Progress'
import Image from './elements/Image'


import Tree from './demo/Tree'
import Page from './demo/Page'

import BottomBar from './BottomBar'
const App = createBottomTabNavigator({
    Home: Home,
    Middle: Middle,
    Mine: Mine
    
}, {
    initialRouteName: "Home",
    tabBarComponent: BottomBar,
    navigationOptions : ({navigation}) => { 
        return {
            header: null
        }
    }
});

const AppNavigator = createStackNavigator({
    App: App,
    Form: Form,
    Form2:Form2,
    Form3: Form3,
    Form4: Form4,
    Address: Address,
    Button: Button,
    Input: Input,
    CheckBox: CheckBox,
    Select: Select,
    Tags: Tags,
    Text: Text,
    CheckBoxs: CheckBoxs,
    Radio: Radio,
    Radios: Radios,
    Rate: Rate,
    Counter: Counter,
    Progress: Progress,
    Date: _Date,
    Slider: Slider,
    Image: Image,

    Tree: Tree,
    Page: Page
}, {
    initialRouteName: "App",
})

export default createAppContainer(AppNavigator);