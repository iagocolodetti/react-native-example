import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

function MyTextInput(props) {
    const {
        marginTop,
        autoCapitalize,
        autoCompleteType,
        autoCorrect,
        keyboardType,
        placeholder,
        value,
        onChangeText,
        disabled
    } = props;

    const backgroundColor = disabled ? '#ccc' : '#fff';
    const borderColor = disabled ? '#999' : '#aaa';

    const styles = StyleSheet.create({
        textInput: {
            marginTop,
            backgroundColor,
            borderStyle: 'solid',
            borderRadius: 4,
            borderWidth: 1,
            borderColor,
            fontSize: 16,
            paddingHorizontal: 7,
            paddingVertical: 5
        }
    });
    
    return (
        <TextInput
            style={styles.textInput}
            autoCapitalize={autoCapitalize}
            autoCompleteType={autoCompleteType}
            autoCorrect={autoCorrect}
            keyboardType={keyboardType}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            editable={!disabled}
            selectTextOnFocus={!disabled}
        />
    );
}

export default MyTextInput;
