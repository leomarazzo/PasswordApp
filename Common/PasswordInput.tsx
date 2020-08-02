import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Icon, Input} from "react-native-elements";
import { onChange } from 'react-native-reanimated';

interface IProps {
    label: string,
    value?: string,
    defaultValue?: string,
    onEndEditing?: () => void,
    onChangeText: (value: string) => void
}

const PasswordInput: React.FC<IProps> = ({label, onChangeText, value, onEndEditing, defaultValue}) => {
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
                label={label}
                onEndEditing={onEndEditing}
                autoCapitalize="none"
                onChangeText={(value) => onChangeText(value)}
                defaultValue={defaultValue}
                value={value}
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
