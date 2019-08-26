import styles from './styles' 

const color = { 
    primaryColor: '#409EFF',  //主色 
    optionColor: '#191919',
    disableColor: '#AEB4C0',
    backgroundColor: '#f5f5f5',
    placeholder: '#999'

}

const size = { 
    primarySize: 16,  
    itemSpace: 8.8,
    largeHeight: 38, 
    normalHeight: 30,
    smallHeight: 22
} 

const external = {
    ...styles
}
function custom(obj1 = {}, obj2 = {}, obj3 = {}) {
    //color
    for(let el in obj1) {
        color[el] = obj1[el]
    }

    //size
    for(let el in obj2) {
        size[el] = obj2[el]
    }

    //external
    external['button-primary'] = {
        padding: 12,
        textAlign: 'center',
        color: 'white',
        fontSize: size.primarySize,
        textAlignVertical:'center',
        fontWeight: '500',
        backgroundColor: color.primaryColor, 
      
    }

    external['button-cancel'] = {
        borderColor: color.primaryColor,
        padding: 12,
        textAlign: 'center',
        textAlignVertical:'center',
        color: color.primaryColor,
        fontSize: size.primarySize,
        fontWeight: '500',
        borderWidth: 1, 
    }

    external['button-primary-disabled'] = {
        padding: 12,
        textAlignVertical:'center',
        textAlign: 'center',
        color: color.placeholder,
        fontSize: size.primarySize,
        fontWeight: '500',
        backgroundColor: color.disableColor, 
    }

    external['button-cancel-disabled'] = {
        textAlignVertical:'center',
        borderColor: color.disableColor,
        padding: 12,
        fontWeight: '500',
        textAlign: 'center',
        color: color.disableColor,
        fontSize: size.primarySize,
        borderWidth: 0.8, 
    }
     
    for(let el in obj3) {
        external[el] = obj3[el]
    } 
    
}

const splitOuterStyle = [
    'flex',
    'height',
    'width',
]

const styleContain = [
    'flex',
    'alignItems',
    'justifyContent',
    'padding',
    'paddingLeft',
    'paddingRight',
    'paddingBottom',
    'paddingTop',
    'margin',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
    'flex',
    'alignItems',
    'justifyContent'
]

export default {
    color, size , external, custom, styleContain
}