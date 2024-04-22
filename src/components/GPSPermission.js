import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class GPSPermission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            debugSuccess: 0,
            debugFail: 0,
            debugGeo: 0
        };
    }

    componentDidMount() {
        // ตรวจสอบว่า Geolocation API มีการสนับสนุนในเบราว์เซอร์หรือไม่
        if (navigator.geolocation) {
            this.setState({ debugGeo: 1 });
            // ขออนุญาตให้เข้าถึงตำแหน่งทางภูมิศาสตร์
            navigator.geolocation.getCurrentPosition(
                this.handleSuccess,
                this.handleError,
                { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
            );
            this.setState({ debugGeo: 2 });
        } else {
            this.setState({ debugGeo: 3 });
            this.setState({ error: 'ไม่สนับสนุน Geolocation API' });
        }
    }

    handleSuccess = (position) => {
        this.setState({ debugSuccess: 1 });
        const { latitude, longitude } = position.coords;
        this.setState({ debugSuccess: 2 });
        this.setState({ latitude, longitude });
        this.setState({ debugSuccess: 3 });
        this.props.history.push('/test_gps_success');

    };

    handleError = (error) => {
        this.setState({ debugFail: 1 });
        this.setState({ error: 'ไม่สามารถเข้าถึงตำแหน่งทางภูมิศาสตร์' });
    };

    render() {
        const { latitude, longitude, error, debugSuccess, debugFail, debugGeo } = this.state;

        return (
            <div>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div>
                        <p>debugSuccess: {debugSuccess}</p>
                        <p>debugFail: {debugFail}</p>
                        <p>debugGeo: {debugGeo}</p>
                        <p>Latitude: {latitude}</p>
                        <p>Longitude: {longitude}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(GPSPermission);
