import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';

import api from '../services/api';

import MyButton from '../components/MyButton';
import CustomAlert from '../components/CustomAlert';

function Listar({ navigation }) {
    const [contatos, setContatos] = useState([]);
    const [mensagem, setMensagem] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const carregar = useCallback(async () => {
        setContatos(null);
        setMensagem(null);
        setCarregando(true);
        try {
            const response = await api.get('/contatos');
            if (Array.isArray(response.data) && response.data.length > 0) {
                setContatos(response.data);
            } else {
                setMensagem(customAlert('Não há contatos cadastrados', 'danger'));
            }
        } catch (error) {
            setMensagem(customAlert(error.response ? error.response.data.message : 'Não foi possível carregar os contatos', 'danger'));
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        const navFocusListener = navigation.addListener('willFocus', () => {
            carregar();
        });

        return () => {
            navFocusListener.remove();
        };
    }, [navigation]);

    function handleCadastrar() {
        navigation.navigate('Cadastrar');
    }

    function handleAtualizar(contato) {
        navigation.navigate('Editar', { contato });
    }

    async function handleExcluir(contato) {
        setMensagem(null);
        try {
            const response = await api.delete(`/contatos/${contato.id}`);
            setContatos(contatos.filter(_contato => _contato.id !== contato.id));
            setMensagem(customAlert(response.data.message, 'success'));
        } catch (error) {
            setMensagem(customAlert(error.response ? error.response.data.message : 'Não foi possível excluir o contato', 'danger'));
        }
    }

    function customAlert(message, alert) {
        return (
            <View style={{ marginTop: 10 }}>
                <CustomAlert message={message} alert={alert} />
            </View>
        );
    }
    
    function Contato({ contato }) {
        return (
            <View style={flatListStyles.item}>
                <Text style={flatListStyles.nome}>{contato.nome}</Text>
                <Text style={flatListStyles.telefone}>{contato.telefone}</Text>
                <Text style={flatListStyles.email}>{contato.email}</Text>
                <View style={flatListStyles.btsView}>
                    <MyButton text='Editar' color='primary' size='small' onPress={() => handleAtualizar(contato)} />
                    <View style={{ width: 20 }} />
                    <MyButton text='Excluir' color='danger' size='small' onPress={() => handleExcluir(contato)} />
                </View>
            </View>
        );
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => handleCadastrar()}>
                <View style={btLinkStyles.view}>
                    <Text style={btLinkStyles.text}>Cadastrar</Text>
                </View>
            </TouchableOpacity>
            <FlatList
                style={flatListStyles.list}
                contentContainerStyle={flatListStyles.containerStyle}
                data={contatos}
                renderItem={({ item }) => <Contato contato={item} />}
                keyExtractor={item => item.id.toString()}
            />
            {mensagem}
            <View style={btAtualizar.view}>
                <MyButton text='Atualizar' color='success' onPress={() => carregar()} disabled={carregando} />
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

const btLinkStyles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 5
    },
    text: {
        fontSize: 14,
        textDecorationLine: 'underline',
        color: '#007bff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

const flatListStyles = StyleSheet.create({
    list: {
        backgroundColor: '#bbb',
        borderStyle: 'solid',
        borderRadius: 6,
        paddingHorizontal: 7,
        paddingVertical: 4
    },
    containerStyle: {
        paddingBottom: 8
    },
    item: {
        backgroundColor: '#fff',
        borderStyle: 'solid',
        borderRadius: 6,
        borderWidth: 3,
        borderColor: '#ddd',
        padding: 8,
        marginVertical: 4
    },
    nome: {
        fontSize: 18
    },
    telefone: {
        fontSize: 16
    },
    email: {
        fontSize: 16
    },
    btsView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    }
});

const btAtualizar = StyleSheet.create({
    view: {
        alignItems: 'center',
        marginTop: 10,
    }
});

export default Listar;
