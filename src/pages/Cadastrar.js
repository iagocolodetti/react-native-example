import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

import api from '../services/api';

import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import CustomAlert from '../components/CustomAlert';

function Cadastrar() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState(null);
    const [cadastrando, setCadastrando] = useState(false);

    async function cadastrar() {
        setMensagem(null);
        setCadastrando(true);
        try {
            await api.post('/contatos', { nome, telefone, email })
            setNome('');
            setTelefone('');
            setEmail('');
            setMensagem(customAlert('Contato cadastrado com sucesso', 'success'));
        } catch (error) {
            setMensagem(customAlert(error.response ? error.response.data.message : 'Não foi possível cadastrar o contato', 'danger'));
        } finally {
            setCadastrando(false);
        };
    }

    function customAlert(message, alert) {
        return (
            <View style={{ marginTop: 10 }}>
                <CustomAlert message={message} alert={alert} />
            </View>
        );
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={areaContato.view}>
                <Text style={areaContato.text}>Nome</Text>
                <MyTextInput
                    autoCapitalize='none'
                    autoCompleteType='name'
                    autoCorrect={false}
                    keyboardType='default'
                    placeholder='Nome'
                    value={nome}
                    onChangeText={e => setNome(e)}
                />
                <Text style={areaContato.text}>Telefone</Text>
                <MyTextInput
                    autoCapitalize='none'
                    autoCompleteType='off'
                    autoCorrect={false}
                    keyboardType='phone-pad'
                    placeholder='Telefone'
                    value={telefone}
                    onChangeText={e => setTelefone(e)}
                />
                <Text style={areaContato.text}>Email</Text>
                <MyTextInput
                    autoCapitalize='none'
                    autoCompleteType='email'
                    autoCorrect={false}
                    keyboardType='email-address'
                    placeholder='Email'
                    value={email}
                    onChangeText={e => setEmail(e)}
                />
            </View>
            {mensagem}
            <View style={btCadastrar.view}>
                <MyButton text='Cadastrar' color='success' onPress={() => cadastrar()} disabled={cadastrando || !nome || !telefone || !email} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    }
});

const areaContato = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555C',
        textShadowRadius: 1,
        marginTop: 10,
        marginStart: 1,
        marginBottom: 1
    }
});

const btCadastrar = StyleSheet.create({
    view: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 3,
        paddingTop: 5
    }
});

export default Cadastrar;
