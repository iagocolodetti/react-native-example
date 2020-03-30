import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function CustomAlert(props) {
    const { children, alert } = props;

    function getBackgroundColor(alert) {
        switch(alert) {
            case 'success':
                return '#d4edda';
            case 'danger':
                return '#f8d7da';
            default:
                return '#fff';
        }
    }
    
    function getBorderColor(alert) {
        switch(alert) {
            case 'success':
                return '#c3e6cb';
            case 'danger':
                return '#f5c6cb';
            default:
                return '#fff';
        }
    }
    
    function getTextColor(alert) {
        switch(alert) {
            case 'success':
                return '#155724';
            case 'danger':
                return '#721c24';
            default:
                return '#000';
        }
    }

    const styles = StyleSheet.create({
        view: {
            backgroundColor: getBackgroundColor(alert),
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'center',
            height: 30,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: getBorderColor(alert),
            borderRadius: 3
        },
        text: {
            fontSize: 16,
            color: getTextColor(alert)
        }
    });

    return (
        <View style={styles.view}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
}

export default CustomAlert;
