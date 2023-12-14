import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

const addRoomScreen = ({ navigation, route }) => {
    let dataRoom = require('../database/room.json')
    const [ipAddress, setIPAddress] = useState('');

    function addRoom() {

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#46d0da' }}>
            <View style={styles.container}>

                <View style={styles.heading}>
                    <TouchableOpacity onPress={() => { navigation.navigate('RoomScreen') }}>
                        <Icon name="arrow-left" style={styles.backBtn} />
                    </TouchableOpacity>

                    <Text style={styles.headingText}>Thêm phòng</Text>
                </View>

                <ScrollView style={styles.Info}>
                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Mã phòng</Text>
                        <TextInput style={styles.formControl} placeholder='Mã phòng' />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Giá phòng</Text>
                        <TextInput style={styles.formControl} placeholder='Giá phòng' />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Diện tích</Text>
                        <TextInput style={styles.formControl} placeholder='Diện tích' />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Vật dụng</Text>
                        <TextInput style={styles.formControl} placeholder='Vật dụng' />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Trạng thái</Text>
                        <TextInput style={styles.formControl} placeholder='Trạng thái' />
                    </View>

                    <View style={styles.blockBtn}>
                        <TouchableOpacity style={styles.btnText} onPress={addRoom}>
                            <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: 'bold' }}>Thêm</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default addRoomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    // heading =============
    heading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: 24,
        alignItems: 'center',
    },
    backBtn: {
        position: 'absolute',
        left: -100,
        top: -18,
        fontSize: 20,
        paddingTop: 8,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 8,
    },
    headingText: {
        fontSize: 28,
        fontWeight: 'bold',
    },

    // info ===================
    Info: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        flex: 1,
        marginBottom: 24,
        display: 'flex'
    },
    formGroup: {

    },
    formTitle: {
        fontSize: 20,
        marginTop: 16,
        marginBottom: 8
    },
    formControl: {
        fontSize: 18,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 12,
        paddingBottom: 12,
        backgroundColor: '#e7e9e8',
        borderRadius: 4
    },

    // button ==================
    blockBtn: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 32
    },
    btnText: {
        color: '#ffffff',
        backgroundColor: '#46d0da',
        width: '100%',
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    }

})