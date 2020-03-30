import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, KeyboardAvoidingView } from 'react-native';
import { useHeaderHeight } from 'react-navigation-stack';

import api from '../services/api';

import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import CustomAlert from '../components/CustomAlert';

function Editar({ navigation }) {
    const { id, nome: _nomeAtual, telefone: _telefoneAtual, email: _emailAtual } = navigation.state.params ? navigation.state.params.contato : '';
    const [nomeAtual, setNomeAtual] = useState(_nomeAtual);
    const [telefoneAtual, setTelefoneAtual] = useState(_telefoneAtual);
    const [emailAtual, setEmailAtual] = useState(_emailAtual);
    const [nome, setNome] = useState(nomeAtual);
    const [telefone, setTelefone] = useState(telefoneAtual);
    const [email, setEmail] = useState(emailAtual);
    const [mensagem, setMensagem] = useState(null);
    const [atualizando, setAtualizando] = useState(false);
    const headerHeight = useHeaderHeight();

    const keyboardVerticalOffset = headerHeight + 20;

    useEffect(() => {
        if (!navigation.state.params) {
            navigation.navigate('Listar');
        }
    }, []);

    async function atualizar() {
        setMensagem(null);
        setAtualizando(true);
        try {
            await api.put(`/contatos/${id}`, { nome, telefone, email });
            setNomeAtual(nome);
            setTelefoneAtual(telefone);
            setEmailAtual(email);
            setMensagem(customAlert('Contato atualizado com sucesso', 'success'));
        } catch (error) {
            setMensagem(customAlert(error.response ? error.response.data.message : 'Não foi possível atualizar o contato', 'danger'));
        } finally {
            setAtualizando(false);
        }
    }

    function customAlert(message, alert) {
        return (
            <View style={{ marginTop: 10 }}>
                <CustomAlert alert={alert}>{message}</CustomAlert>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={areaContato.view}>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset} enabled>
                    <Text style={areaContato.text}>Atual</Text>
                    <MyTextInput
                        marginTop={5}
                        value={nomeAtual}
                        disabled={true}
                    />
                    <MyTextInput
                        marginTop={10}
                        value={telefoneAtual}
                        disabled={true}
                    />
                    <MyTextInput
                        marginTop={10}
                        value={emailAtual}
                        disabled={true}
                    />
                    <Text style={{ ...areaContato.text, marginTop: 20 }}>Novo</Text>
                    <MyTextInput
                        marginTop={5}
                        autoCapitalize='none'
                        autoCompleteType='name'
                        autoCorrect={false}
                        keyboardType='default'
                        placeholder='Nome'
                        value={nome}
                        onChangeText={e => setNome(e)}
                    />
                    <MyTextInput
                        marginTop={10}
                        autoCapitalize='none'
                        autoCompleteType='off'
                        autoCorrect={false}
                        keyboardType='phone-pad'
                        placeholder='Telefone'
                        value={telefone}
                        onChangeText={e => setTelefone(e)}
                    />
                    <MyTextInput
                        marginTop={10}
                        autoCapitalize='none'
                        autoCompleteType='email'
                        autoCorrect={false}
                        keyboardType='email-address'
                        placeholder='Email'
                        value={email}
                        onChangeText={e => setEmail(e)}
                    />
                </KeyboardAvoidingView>
            </View>
            {mensagem}
            <View style={btAtualizar.view}>
                <MyButton color='success' onPress={() => atualizar()} disabled={atualizando || !nome || !telefone || !email}>Atualizar</MyButton>
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
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555C'
    }
});

const btAtualizar = StyleSheet.create({
    view: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 3,
        paddingTop: 5
    }
});

export default Editar;
