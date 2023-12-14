import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RevenueScreen = ({ navigation }) => {
    const revenueData = require("../database/revenue.json");
    const revenueLst = revenueData["Revenue"];
    // lấy ra doanh thu lớn nhất trong năm 
    let year = "2023";
    // hàm lấy ra doanh thu lớn nhất theo năm
    function getMaxRevenueOfYear(year) {
        let max = 0;
        revenueLst.forEach((item) => {
            if (Number(item.revenue) > max && item.year === year) max = (Number)(item.revenue);
        });
        return max;
    };
    let maxRevenue = getMaxRevenueOfYear(year);
    // tìm ra giá trị lớn nhất cho cột trong biểu đồ
    let maxValueColumn = 0;
    for (let i = 1; i <= 10; i++) {
        let max = i * 10000000;
        if (maxRevenue <= max) {
            maxValueColumn = max;
            break;
        }
    }

    // Hàm render ra các cột doanh thu (của 12 tháng) trong biểu đồ
    let renderChartColumn = (() => {
        let rs = revenueLst.map((item) => {
            let columnHeight = `${parseInt((item.revenue / maxValueColumn) * 100)}%`;
            let columnColor = "";
            if (parseInt(item.month) % 2 === 0) {
                columnColor = "#46d0da";
            } else {
                columnColor = "#f5ba31";
            }
            return (
                <View style={styles.chartColumn}>
                    <View style={{ ...styles.chartColumnValue, height: columnHeight, backgroundColor: columnColor }}></View>
                    <Text style={styles.charMonth}>{item.month}</Text>
                </View>
            )
        })
        return rs;
    })
    
    // hàm định dạng lại sô
    function formatNumber(number) {
        // Sử dụng hàm toLocaleString để định dạng số thành chuỗi theo quy tắc địa phương
        let formattedNumber = number.toLocaleString('en-US');
        
        // Nếu định dạng số sử dụng dấu phẩy làm ngăn cách hàng nghìn, thì thay thế nó bằng dấu chấm
        if (formattedNumber.includes(',')) {
            formattedNumber = formattedNumber.replace(/,/g, '.');
        }
    
        return formattedNumber;
    }

    // Hàm render ra danh sách chi tiết doanh thu từng tháng trong năm
    let renderRevenueMonth = () => {
        let rs = revenueLst.map((item) => {
            let revenueNumber = formatNumber(Number(item.revenue));
            let colorItem = "";
            if (Number(item.month)%2 === 0) {
                colorItem = "#f5ba32";
            } else {
                colorItem = "#46d0da";
            }
            return (
                <View style={styles.revenueDetailItem}>
                    <View style={{...styles.revenueDetailMonth, backgroundColor: colorItem}}>
                        <Text style={styles.revenueDetailMonthText}>{item.month}</Text>
                    </View>

                    <View style={styles.detailItemBody}>
                        <Text style={styles.detailItemMoney}>{revenueNumber} VND</Text>
                        <Text>năm {year}</Text>
                    </View>
                </View>
            )
        })
        return rs;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <Text style={styles.revenueHeading}>Thống kê doanh thu</Text>

                <View style={styles.revenue}>
                    <Text style={styles.revenueTitle}>Doanh thu</Text>
                    <View style={styles.revenueMain}>
                        <Text style={styles.revenueTotal}>24.340.000 VND</Text>
                        <View style={styles.revenueGrowth}>
                            <Icon name="arrow-up" style={{ color: '#ffffff', fontSize: 16, marginRight: 4 }} />
                            <Text style={{ color: '#ffffff', fontSize: 16 }}>20%</Text>
                        </View>
                    </View>
                    <Text style={styles.revenueDate}>Tháng 10/2023</Text>
                </View>

                <View style={styles.revenueChart}>
                    <View style={styles.revenueChartHeading}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#15487b' }}>2023</Text>
                    </View>

                    <View style={styles.revenueChartMain}>
                        {
                            renderChartColumn()
                        }
                    </View>
                </View>

                <View style={styles.revenueDetail}>
                    <Text style={{ color: '#15487b', fontSize: 24, fontWeight: 'bold' }}>Chi tiết doanh thu</Text>

                    <View style={styles.revenueDetailMain}>
                        {
                            renderRevenueMonth()
                        }
                    </View>
                </View>
            </ScrollView>

            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen') }}>
                    <Icon style={styles.navbarIcon} name="home" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('RoomScreen') }}>
                    <Icon style={styles.navbarIcon} name="table" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('BillScreen') }}>
                    <Icon style={styles.navbarIcon} name="newspaper-o" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('RevenueScreen') }}>
                    <Icon style={{ ...styles.navbarIcon, color: "#46d0da" }} name="dollar" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('UserScreen') }}>
                    <Icon style={styles.navbarIcon} name="user" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RevenueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
    },

    // Revenue heading ================================
    revenueHeading: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#15487b',
        marginTop: 16
    },

    // Revenue ========================================
    revenue: {
        width: '100%',
        backgroundColor: '#46d0da',
        marginTop: 24,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,

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

    // Revenue chart ==================================
    revenueChart: {
        width: '100%',
        height: 300,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 12,
        display: 'flex'
    },
    revenueChartHeading: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 50
    },
    revenueChartMain: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    chartColumn: {
        display: 'flex',
        alignItems: 'center'
    },
    chartColumnValue: {
        width: 12,
    },
    charMonth: {

    },

    // Revenue detail ==================================
    revenueDetail: {
        marginTop: 24, 
        paddingBottom: 80,
    },
    revenueDetailMain: {
        gap: 8,
        marginTop: 12
    },
    revenueDetailItem: {
        width: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10
    },
    revenueDetailMonth: {
        height: 42,
        width: 42,
        backgroundColor: '#46d0da',
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    revenueDetailMonthText: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    detailItemBody: {
        marginLeft: 16
    },
    detailItemMoney: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#15487b',
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