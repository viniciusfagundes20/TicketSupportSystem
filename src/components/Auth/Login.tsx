import React from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import TextInput from '@/components/TextInput';
import useAuth from '@/Hooks/useAuth';
import { NavigationProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

const Login: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {

  const { login } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { username: '', password: '' } });

  const onClickLogin = (data: { username: string; password: string }) => {
    const { username, password } = data;
    if (username === 'admin' && password === 'password') {
      login();
    } else {
      Alert.alert('Usuário ou senha incorretos', 'Verifique os dados e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        name="username" 
        caption="Usuário"
        control={control}
        placeholder="Username" 
      />
      { errors.username && <Text>This is required.</Text>}
      <TextInput 
        name="password" 
        caption="Senha"
        rules={{ required: 'Password is required' }} 
        control={control}
        placeholder="Password" 
        secureTextEntry 
      />
      {errors.username && <Text>This is required.</Text>}
      <Button title="Login" onPress={handleSubmit(onClickLogin)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default Login;