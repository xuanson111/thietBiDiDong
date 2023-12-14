import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import roomData from '../database/room.json'

const RoomScreen = ({ navigation }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState(roomData);

    const renderRoom = () => {
        if (!filteredData) return;
        return filteredData.map((room) => {
            const backgroundColor = room.state === 0 ? 'transparent' : '#46d0da';
            const textColor = room.state === 0 ? '#15487b' : '#ffffff';

            return (
                <TouchableOpacity
                    key={room.id}
                    style={{ ...styles.roomItem, backgroundColor }}
                    onPress={() => { navigation.navigate('RoomDetail', room.id) }}
                >
                    <Text style={{ ...styles.roomId, color: textColor }}>{room.id}</Text>
                </TouchableOpacity>
            );
        });
    };

    const handleSearch = (text) => {
        setSearchValue(text);
        if (text == "") {
            setFilteredData(roomData)
            return;
        }
        const filterData = roomData.filter(item => {
            return item.id.toLowerCase().includes(text.toLowerCase());
        })

        setFilteredData(filterData)
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.headingGroup}>
                    <View style={styles.heading}>
                        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#15487b' }}>Danh sách phòng</Text>
                        <View style={styles.roomQuantity}>
                            <Text style={{ color: '#46d0da', fontSize: 17, fontWeight: 'bold' }}>{roomData.length}</Text>
                        </View>
                    </View>

                    <View style={styles.roomSearch}>
                        <TextInput placeholder='Nhập tên phòng' style={styles.roomSearchInput} value={searchValue} onChangeText={handleSearch} />
                        <Icon name="search" style={styles.roomSearchIcon} />

                        <TouchableOpacity style={styles.btnAdd} onPress={() => {navigation.navigate('addRoom')}}>
                            <Icon name="plus" style={styles.roomIconAdd} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={styles.roomList}>
                    <View style={styles.roomGroup}>
                        {
                            renderRoom()
                        }
                    </View>
                </ScrollView>
            </ScrollView>

            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('HomeScreen') }}>
                    <Icon style={styles.navbarIcon} name="home" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('RoomScreen') }}>
                    <Icon style={{ ...styles.navbarIcon, color: "#46d0da" }} name="table" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('BillScreen') }}>
                    <Icon style={styles.navbarIcon} name="newspaper-o" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('RevenueScreen') }}>
                    <Icon style={styles.navbarIcon} name="dollar" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbarBtn} onPress={() => { navigation.navigate('UserScreen') }}>
                    <Icon style={styles.navbarIcon} name="user" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RoomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    // room heading ====================================
    headingGroup: {
        backgroundColor: '#46d0da',
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 8,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        paddingTop: 50,
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        alignItems: 'center'
    },
    roomQuantity: {
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

    // room search =====================================
    roomSearch: {
        width: '100%',
        marginTop: 24,
        marginBottom: 24,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    roomSearchInput: {
        backgroundColor: '#ffffff',
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16,
        paddingLeft: 48,
        borderRadius: 100,
        fontSize: 18,
        flex: 1
    },
    roomSearchIcon: {
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
    // room list =======================================
    roomList: {
        paddingLeft: 24,
        paddingRight: 24,
        marginTop: 24,
        width: '100%',
        height: 500
    },
    roomGroup: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },
    roomItem: {
        flex: 1,
        minWidth: 150,
        height: 100,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 20,
        borderStyle: 'solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    roomId: {
        fontSize: 32,
        color: "#15487b",
        fontWeight: 'bold'
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