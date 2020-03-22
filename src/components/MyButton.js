import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

function MyButton(props) {
    const {
        text,
        color,
        size,
        height,
        width,
        fontSize,
        onPress,
        disabled
    } = props;

    function getColor() {
        const opacity = disabled ? '99' : 'ff';
        switch(color) {
            case 'primary':
                return '#007bff' + opacity;
            case 'success':
                return '#28a745' + opacity;
            case 'danger':
                return '#dc3545' + opacity;
            default:
                return '#3a3a3a' + opacity;
        }
    }

    function getHeight() {
        if (!height) {
            switch(size) {
                case 'small':
                    return 25;
                case 'normal':
                    return 35;
                default:
                    return 35;
            }    
        } else return height;
    }

    function getWidth() {
        if (!width) {
            switch(size) {
                case 'small':
                    return 75;
                case 'normal':
                    return 160;
                default:
                    return 160;
            }
        } else return width;
    }

    function getFontSize() {
        if (!fontSize) {
            switch(size) {
                case 'small':
                    return 14;
                case 'normal':
                    return 16;
                default:
                    return 16;
            }
        } else return fontSize;
    }

    const styles = StyleSheet.create({
        view: {
            flexDirection: 'row',
            height: getHeight(),
            width: getWidth(),
            backgroundColor: getColor(),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4
        },
        text: {
            color: '#fff',
            fontSize: getFontSize(),
            textAlign: 'center'
        },
    });

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={styles.view}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default MyButton;
