import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const data = require('../database/TaiKhoan.json')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(true);
    const [TaiKhoan, setTaiKhoan] = useState('');

    const HandleLogin = async () => {
        try {
            // Kiểm tra tài khoản và mật khẩu
            const user = data.find((user) => user.taiKhoan === username && user.matKhau === password);
            if (user) {
                // Đăng nhập thành công
                setLoginSuccess(true);
                // Thực hiện các hành động sau khi đăng nhập thành công (ví dụ: điều hướng đến màn hình chính)
                handleSave(user.taiKhoan)
                navigation.navigate('HomeScreen')
            } else {
                // Đăng nhập thất bại
                setLoginSuccess(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Lấy giá trị từ AsyncStorage khi màn hình được tải
        const fetchData = async () => {
            try {
                const value = await AsyncStorage.getItem('TaiKhoan');
                if (value !== null) {
                    setTaiKhoan(value);
                }
            } catch (error) {
                console.error('Lỗi khi lấy giá trị từ AsyncStorage:', error);
            }
        };

        fetchData();
    }, []);

    const handleSave = async (value) => {
        // Lưu giá trị vào AsyncStorage và cập nhật giá trị trong state
        try {
            await AsyncStorage.setItem('TaiKhoan', value);
            setTaiKhoan(value);
        } catch (error) {
            console.error('Lỗi khi lưu giá trị vào AsyncStorage:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.Logo}>
                    <Icon style={styles.LogoImg} name="home" />
                    <View style={styles.TitleBlock}>
                        <Text style={{ ...styles.Title, color: '#054b65' }}>RoomMate</Text>
                        <Text style={styles.Title}>Pro</Text>
                    </View>
                </View>

                <View style={styles.Body}>
                    <View style={styles.block1}></View>
                    <View style={styles.block2}></View>
                    <View style={styles.form}>
                        <Text style={styles.formHeading}>ĐĂNG NHẬP</Text>
                        <Text style={{ color: 'red', marginBottom: 4, fontSize: 14 }}>{(!loginSuccess) && "Tài khoản hoặc mật khẩu không đúng"}</Text>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Tài khoản</Text>
                            <TextInput placeholder='Tài khoản' style={styles.formControl} onChangeText={text => setUsername(text)} value={username} />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Mật khẩu</Text>
                            <TextInput placeholder='Mật khẩu' secureTextEntry={true} style={styles.formControl} onChangeText={text => setPassword(text)} value={password} />
                        </View>

                        <TouchableOpacity style={styles.formBtn} onPress={HandleLogin}>
                            <Text style={{ color: '#ffffff', fontSize: 18 }}>Đăng nhập</Text>
                        </TouchableOpacity>

                        <View style={styles.formForgot}>
                            <Text style={{ color: '#15487b', fontSize: 14, }}>Quên mật khẩu?</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: 'relative',
        backgroundColor: '#46d0da',
    },

    // Logo ==================================
    Logo: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 40,
    },
    LogoImg: {
        fontSize: 72,
        color: '#ffffff'
    },
    TitleBlock: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2
    },
    Title: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 32,
    },
    // Body ==================================
    Body: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        marginTop: 100,
        left: 0,
        right: 0,
        bottom: 0,
        height: 530
    },
    block1: {
        width: 320,
        height: 320,
        backgroundColor: '#edf0f5',
        transform: [{ rotate: '45deg' }],
        borderRadius: 68,
    },
    block2: {
        width: '100%',
        position: 'absolute',
        bottom: -50,
        height: 420,
        backgroundColor: '#edf0f5'
    },
    form: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 32,
        paddingRight: 32
    },
    formHeading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 120,
        marginBottom: 20
    },
    formGroup: {
        width: '100%',
        marginBottom: 16,
    },
    formLabel: {
        color: 'black',
        opacity: 0.8,
        fontSize: 18,
        marginBottom: 4
    },
    formControl: {
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 18,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        shadowColor: '#000000', // Màu shadow
        shadowOffset: { width: 0, height: 0 }, // Độ lệch của shadow theo chiều ngang và chiều dọc
        shadowOpacity: 0.3, // Độ mờ của shadow
        shadowRadius: 4, // Độ cong của shadow
        elevation: 5, // (Chỉ áp dụng cho Android) Tăng giá trị này để tăng độ nổi của shadow
    },
    formBtn: {
        width: '100%',
        height: 48,
        backgroundColor: '#15487b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 12
    },
    formForgot: {
        width: '100%',
        marginTop: 20,
        display: 'flex',
        alignItems: 'flex-end',

    }

})