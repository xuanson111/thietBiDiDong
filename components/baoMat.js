import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import roomData from '../database/room.json'

const RoomScreen = ({ navigation, route }) => {
    let room = roomData.find((item) => {
        return item.id === route.params
    })
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#46d0da' }}>
            <View style={styles.container}>

                <View style={styles.heading}>
                    <TouchableOpacity onPress={() => { navigation.navigate('UserScreen') }}>
                        <Icon name="arrow-left" style={styles.backBtn} />
                    </TouchableOpacity>

                    <Text style={styles.headingText}>Thông tin tài khoản</Text>
                </View>

                <ScrollView style={styles.Info}>
                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Tài khoản</Text>
                        <TextInput style={styles.formControl} placeholder='Tài khoản' />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Mật khẩu</Text>
                        <TextInput style={styles.formControl} placeholder='Mật khẩu' />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Tên khu trọ</Text>
                        <TextInput style={styles.formControl} placeholder='Tên khu trọ' />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Loại tài khoản</Text>
                        <TextInput style={styles.formControl} placeholder='Loại tài khoản' />
                    </View>

                    <View style={styles.blockBtn}>
                        <TouchableOpacity style={styles.btnText}>
                            <Text style={{color: '#ffffff', fontSize: 22, fontWeight: 'bold'}}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default RoomScreen;

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
        left: -62,
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
        marginTop: 32,
        marginBottom: 32
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