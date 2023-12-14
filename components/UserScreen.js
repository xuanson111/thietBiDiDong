import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = ({ navigation }) => {
    const dataTaiKhoan = require("../database/TaiKhoan.json");

    const [TaiKhoan, setTaiKhoan] = useState('');

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
    let user = dataTaiKhoan.find(item => { return item.taiKhoan === TaiKhoan });
    let tenKhuTro;
    if (user && typeof user === 'object') {
        tenKhuTro = user.tenKhuTro;
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.userHeading}>
                    <Icon style={styles.userHeadingIcon} name="home" />
                    <Text style={styles.userHeadingText}>{tenKhuTro}</Text>
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.userInfoHeading}>Cài đặt</Text>

                    <ScrollView style={styles.userInfoMain}>
                        <View style={styles.InfoGroup}>
                            <TouchableOpacity style={styles.userInfoGroup}>
                                <Text style={styles.userInfoTitle}>Thông báo</Text>
                                <View style={styles.userNotification}>
                                    <Text style={styles.notificationState}>Bật</Text>
                                    <Icon style={styles.userInfoIcon} name="angle-right" size={28} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.userInfoGroup} onPress={() => {navigation.navigate('baoMat')}}>
                                <Text style={styles.userInfoTitle}>Bảo mật</Text>
                                <Icon style={styles.userInfoIcon} name="angle-right" size={28} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.userInfoGroup}>
                                <Text style={styles.userInfoTitle}>Thông tin khu trọ</Text>
                                <Icon style={styles.userInfoIcon} name="angle-right" size={28} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.InfoGroup}>
                            <TouchableOpacity style={styles.userInfoGroup}>
                                <Text style={styles.userInfoTitle}>Quyền riêng tư</Text>
                                <Icon style={styles.userInfoIcon} name="angle-right" size={28} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.userInfoGroup}>
                                <Text style={styles.userInfoTitle}>Trợ giúp</Text>
                                <Icon style={styles.userInfoIcon} name="angle-right" size={28} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.userInfoGroup}>
                                <Text style={styles.userInfoTitle}>Góp ý</Text>
                                <Icon style={styles.userInfoIcon} name="angle-right" size={28} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.InfoGroup}>
                            <TouchableOpacity style={styles.userInfoGroup} onPress={() => {navigation.navigate('LoginScreen')}}>
                                <Text style={styles.userInfoTitle}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>

            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('HomeScreen') }}>
                    <Icon style={styles.navbarIcon} name="home" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('RoomScreen') }}>
                    <Icon style={styles.navbarIcon} name="table" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('BillScreen') }}>
                    <Icon style={styles.navbarIcon} name="newspaper-o" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('RevenueScreen') }}>
                    <Icon style={styles.navbarIcon} name="dollar" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('UserScreen') }}>
                    <Icon style={{ ...styles.navbarIcon, color: "#46d0da" }} name="user" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#46d0da',
    },

    // user heading ====================================
    userHeading: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 42
    },
    userHeadingIcon: {
        fontSize: 64,
        color: '#15487b'
    },
    userHeadingText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff'
    },

    // user info =======================================
    userInfo: {
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#ffffff',
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 600,
        marginTop: 42,
    },
    userInfoHeading: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#15487b',
        marginTop: 28,
    },
    InfoGroup: {
        gap: 6,
        marginTop: 16,
        marginBottom: 12
    },
    userInfoGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
    },
    userInfoTitle: {
        fontSize: 18,
    },
    userInfoIcon: {

    },
    userNotification: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    notificationState: {
        paddingRight: 8,
        fontSize: 15
    },

    // nav bar =========================================
    navbar: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        paddingLeft: 42,
        paddingRight: 42,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        paddingBottom: 20
    },
    navbarBtn: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
    },
    navbarIcon: {
        fontSize: 24,
        color: '#B8B8B8'
    }
})