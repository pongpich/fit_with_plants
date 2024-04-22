import React, { Component } from "react";

class GPSTracker2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: 0, // ระยะทางที่ผู้ใช้วิ่ง
            positions: [], // ตำแหน่งที่บันทึกไว้
            tracking: false, // สถานะการติดตาม GPS
        };
    }

    // ...

    // เพิ่มเมธอดสำหรับเริ่มหรือหยุดติดตาม GPS
    toggleTracking = () => {
        if (this.state.tracking) {
            // หยุดติดตาม GPS
            navigator.geolocation.clearWatch(this.watchId);
            this.setState({ tracking: false });
        } else {
            // เริ่มติดตาม GPS ใหม่
            this.watchId = navigator.geolocation.watchPosition(
                this.handlePositionChange,
                this.handlePositionError
            );
            this.setState({ tracking: true });
        }
    };

    handlePositionChange = (position) => {
        const { positions } = this.state;

        // คำนวณระยะทางและเพิ่มตำแหน่งใหม่ลงใน state
        if (positions.length > 0) {
            const lastPosition = positions[positions.length - 1];
            const distanceIncrement = this.calculateDistance(
                lastPosition.coords.latitude,
                lastPosition.coords.longitude,
                position.coords.latitude,
                position.coords.longitude
            );

            this.setState((prevState) => ({
                distance: prevState.distance + distanceIncrement,
                positions: [...prevState.positions, position],
            }));
        } else {
            this.setState({ positions: [position] });
        }
    };

    handlePositionError = (error) => {
        console.error("Error getting position:", error);
    };

    calculateDistance = (lat1, lon1, lat2, lon2) => {
        // คำนวณระยะทางระหว่างจุดสองจุดด้วย Haversine formula
        // (โค้ดคำนวณอาจมีความซับซ้อนกว่านี้)
        const R = 6371; // รัศมีของโลกในหน่วยกิโลเมตร
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    };

    render() {
        const { distance, tracking } = this.state;

        return (
            <div>
                <p>ระยะทางที่วิ่งได้: {distance.toFixed(2)} km</p>

                {/* เพิ่มปุ่มเริ่มนับระยะทางหรือหยุดนับระยะทาง */}
                <button onClick={this.toggleTracking}>
                    {tracking ? "หยุดนับระยะทาง" : "เริ่มนับระยะทาง"}
                </button>

                {/* แสดงตำแหน่งที่บันทึกไว้ */}
                <ul>
                    {this.state.positions.map((position, index) => (
                        <li key={index}>
                            Lat: {position.coords.latitude}, Long: {position.coords.longitude}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default GPSTracker2;
