import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

const billScreen = ({ navigation }) => {
    let data = require("../database/bill.json");
    const bills = data["Bill"];
    let billQuantity = bills.length;
    const renderBillItem = () => {
        let rs = bills.map((item) => {
            return (
                <View style={styles.billItem}>
                    <TouchableOpacity style={styles.billMain} onPress={() => { navigation.navigate('billDetail', item.id) }}>
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

    const renderMonth = () => {
        let rs = [];
        let today = new Date()
        let current = today.getMonth() + 1;
        console.log(current)
        for (let i = 1; i <= 12; i++) {
            let bgColor = current == i ? '#46d0da' : '#ffffff' 
            let txtColor = current == i ? '#ffffff' : '#000000';
            rs.push(
                <TouchableOpacity style={{ ...styles.billFilterItem, backgroundColor: bgColor}}>
                    <Text style={{ ...styles.billFilterText, color: txtColor}}>Tháng {i}</Text>
                </TouchableOpacity>
            )
        }
        return rs;
    }

    return (
        <SafeAreaView style={{ flex: 1, position: 'relative' }}>
            <ScrollView style={styles.container}>
                <View style={styles.billHeading}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#15487b' }}>Danh sách hóa đơn</Text>
                    <View style={styles.billQuantity}>
                        <Text style={{ color: '#46d0da', fontSize: 17, fontWeight: 'bold' }}>{billQuantity}</Text>
                    </View>
                </View>

                <View style={styles.billSearch}>
                    <TextInput placeholder='Nhập tên phòng' style={styles.billSearchInput} />
                    <Icon name="search" style={styles.billSearchIcon} />

                    <TouchableOpacity style={styles.btnAdd} onPress={() => { navigation.navigate('billAdd') }}>
                        <Icon name="plus" style={styles.roomIconAdd} />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal={true} style={styles.billFilter}>
                    {
                        renderMonth()
                    }
                </ScrollView>

                <ScrollView style={styles.billLst}>
                    {
                        renderBillItem()
                    }
                </ScrollView>
            </ScrollView>

            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('HomeScreen') }}>
                    <Icon style={styles.navbarIcon} name="home" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('RoomScreen') }}>
                    <Icon style={styles.navbarIcon} name="table" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('BillScreen') }}>
                    <Icon style={{ ...styles.navbarIcon, color: "#46d0da" }} name="newspaper-o" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('RevenueScreen') }}>
                    <Icon style={styles.navbarIcon} name="dollar" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('UserScreen') }}>
                    <Icon style={styles.navbarIcon} name="user" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default billScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24
    },

    // Bill heading ====================================
    billHeading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        alignItems: 'center'
    },
    billQuantity: {
        width: 46,
        height: 46,
        backgroundColor: '#d5efe7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        position: 'relative',
        top: 2
    },

    // Bill search =====================================
    billSearch: {
        width: '100%',
        marginTop: 24,
        marginBottom: 24,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    billSearchInput: {
        backgroundColor: '#ffffff',
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16,
        paddingLeft: 48,
        borderRadius: 100,
        fontSize: 18,
        flex: 1
    },
    billSearchIcon: {
        fontSize: 28,
        color: '#46d0da',
        position: 'absolute',
        marginLeft: 14
    },
    btnAdd: {
        height: 50,
        width: 50,
        backgroundColor: '#d5efe7',
        marginLeft: 8,
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    roomIconAdd: {
        fontSize: 24,
        color: '#15487b',
    },

    // Bill filter ==========================================
    billFilter: {
        display: 'flex',
        flexDirection: 'row',
    },
    billFilterItem: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: '#ffffff',
        borderRadius: 100,
        marginRight: 12
    },
    billFilterText: {
        fontSize: 15,
        color: '',
    },

    // Bill list ============================================
    billLst: {
        marginTop: 24,
        width: '100%',
        height: 500,
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
        marginBottom: 12,
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