import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const homeScreen = ({ navigation, route }) => {
    let dataBills = require("../database/bill.json");
    const bills = dataBills["Bill"];
    const dataTaiKhoan = require('../database/TaiKhoan.json');
    const renderBillItem = () => {
        let i = 0;
        let rs = bills.map((item) => {
            ++i;
            if (i > 5) return;
            return (
                <View style={styles.billItem}>
                    <TouchableOpacity style={styles.billMain} onPress={() => {navigation.navigate('billDetail', item.id)}}>
                        <View style={styles.billId}>
                            <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>{item.roomId}</Text>
                        </View>

                        <View style={styles.billPriceBlock}>
                            <Text style={styles.billPrice}>{item.total} VND</Text>
                            <Text style={styles.billDate}>{item.ngayTao}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnDelete}>
                        <Icon name="trash" style={{ fontSize: 18, opacity: .6 }} />
                    </TouchableOpacity>
                </View>
            );
        });
        return rs;
    }

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

    let user = dataTaiKhoan.find(item => {return item.taiKhoan === TaiKhoan});
    let tenKhuTro = "";
    if (user && typeof user === 'object') {
        tenKhuTro = user.tenKhuTro;
        console.log(user.tenKhuTro)

    }

    return (
        <SafeAreaView style={{ flex: 1, position: 'relative' }}>
            <ScrollView style={styles.container}>
                <View style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 80 }}>
                    <View style={styles.header}>
                        <View style={styles.headerLogo}>
                            <Icon name="home" style={styles.logo} />
                            <Text style={styles.headerLogoName}>{tenKhuTro}</Text>
                        </View>

                        <View style={styles.notification}>
                            <Icon name="bell-o" style={styles.notificationIcon} />
                            <View style={styles.notificationDot}></View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.revenue} onPress={() => {navigation.navigate('RevenueScreen')}}>
                        <Text style={styles.revenueTitle}>Doanh thu</Text>
                        <View style={styles.revenueMain}>
                            <Text style={styles.revenueTotal}>24.340.000 VND</Text>
                            <View style={styles.revenueGrowth}>
                                <Icon name="arrow-up" style={{ color: '#ffffff', fontSize: 16, marginRight: 4 }} />
                                <Text style={{ color: '#ffffff', fontSize: 16 }}>20%</Text>
                            </View>
                        </View>
                        <Text style={styles.revenueDate}>Tháng 10/2023</Text>
                    </TouchableOpacity>

                    <View style={styles.billBlock}>
                        <View style={styles.billHeading}>
                            <View style={styles.billHeadingGroup}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#15487b' }}>Hóa đơn</Text>
                                <View style={styles.billQuantity}>
                                    <Text style={{color: '#46d0da', fontSize: 18, fontWeight: 'bold'}}>{bills.length}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('BillScreen') }}>
                                <Text style={{ fontSize: 16, color: '#46d0da' }}>xem thêm</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bills}>
                            {
                                renderBillItem()
                            }

                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('HomeScreen') }}>
                    <Icon style={{ ...styles.navbarIcon, color: "#46d0da" }} name="home" />
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
                <TouchableOpacity onPress={() => { navigation.navigate('UserScreen') }}>
                    <Icon style={styles.navbarIcon} name="user" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default homeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edf0f5',

    },
    // header ==========================================
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16
    },
    headerLogo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        color: '#15487b',
        fontSize: 32
    },
    headerLogoName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#15487b'
    },
    notification: {
        position: 'relative',
    },
    notificationDot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        right: 2,
    },
    notificationIcon: {
        fontSize: 28

    },
    // Revenue ========================================
    revenue: {
        width: '100%',
        backgroundColor: '#46d0da',
        marginTop: 24,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    revenueTitle: {
        fontSize: 20,
        color: '#ffffff',
        marginTop: 20
    },
    revenueMain: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    revenueGrowth: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 20,
        backgroundColor: '#c9f1f44d',
        position: 'relative',
        top: 5
    },
    revenueTotal: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: 'bold',
        marginTop: 8,
    },
    revenueDate: {
        marginTop: 8,
        color: '#ffffff',
        fontSize: 16
    },

    // Bill ============================================
    billBlock: {
        marginTop: 32
    },
    billHeading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    billHeadingGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    billQuantity: {
        width: 36,
        height: 36,
        backgroundColor: '#d5efe7',
        marginLeft: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        position: 'relative',
        top: 2
    },
    bills: {
        gap: 12,
        marginTop: 12
    },
    billItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 12,
        borderRadius: 8,
    },
    billMain: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    billId: {
        width: 60,
        height: 60,
        backgroundColor: '#46d0da',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    billPriceBlock: {
        marginLeft: 12
    },
    billPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#15487b',
        marginBottom: 4
    },
    billDate: {
        opacity: .6,
        fontSize: 16
    },
    btnDelete: {
        width: 42,
        height: 42,
        backgroundColor: '#edf0f5',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
        paddingTop: 12,
        paddingBottom: 12
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