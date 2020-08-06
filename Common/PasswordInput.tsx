import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {Icon, Input, InputProps} from "react-native-elements";

interface IProps extends InputProps {  
}

const PasswordInput: React.FC<IProps> = ({...rest}) => {
    const [icon, setIcon] = useState("lock")
    const [password, setpassword] = useState(true)

    const iconPress = () => {
        if (password) {
            setIcon("lock-open")
            setpassword(false)
        }else{
            setIcon("lock")
            setpassword(true)
        }
    }

    return (
        <View>
            <Input
                secureTextEntry={password}
                placeholder="Contraseña"
                autoCapitalize="none"
                {...rest}
                rightIcon={
                <Icon 
                    name={icon}
                    onPress={() => iconPress()}
                />}
            />
        </View>
    )
}

export default PasswordInput

const styles = StyleSheet.create({})
