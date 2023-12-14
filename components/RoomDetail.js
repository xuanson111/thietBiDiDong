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
                    <TouchableOpacity onPress={() => { navigation.navigate('RoomScreen') }}>
                        <Icon name="arrow-left" style={styles.backBtn} />
                    </TouchableOpacity>

                    <Text style={styles.headingText}>Chỉnh sửa phòng</Text>
                </View>

                <ScrollView style={styles.Info}>
                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Mã phòng</Text>
                        <TextInput style={styles.formControl} placeholder='Mã phòng' value={room.id}/>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Giá phòng</Text>
                        <TextInput style={styles.formControl} placeholder='Giá phòng' value={room.price.toLocaleString()}/>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Diện tích</Text>
                        <TextInput style={styles.formControl} placeholder='Diện tích' value={room.acreage.toLocaleString()}/>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Vật dụng</Text>
                        <TextInput style={styles.formControl} placeholder='Vật dụng' value={room.interior}/>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formTitle}>Trạng thái</Text>
                        <TextInput style={styles.formControl} placeholder='Trạng thái' value={"" + room.state}/>
                    </View>

                    <View style={styles.blockBtn}>
                        <TouchableOpacity style={styles.btnText}>
                            <Text style={{color: '#ffffff', fontSize: 22, fontWeight: 'bold'}}>Chỉnh sửa</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{...styles.btnText, backgroundColor: '#fc0303', marginTop: 12}}>
                            <Text style={{color: '#ffffff', fontSize: 22, fontWeight: 'bold'}}>Xoá</Text>
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
        left: -72,
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