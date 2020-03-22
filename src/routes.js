import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Listar from './pages/Listar';
import Cadastrar from './pages/Cadastrar';
import Editar from './pages/Editar';

const Routes = createAppContainer(
    createStackNavigator({
        Listar: {
            screen: Listar,
            navigationOptions: {
                title: 'Contatos'
            }
        },
        Cadastrar: {
            screen: Cadastrar,
            navigationOptions: {
                title: 'Cadastrar'
            }
        },
        Editar: {
            screen: Editar,
            navigationOptions: {
                title: 'Editar / Atualizar'
            }
        }
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#3c3c3c'
            },
        }
    })
);

export default Routes;
