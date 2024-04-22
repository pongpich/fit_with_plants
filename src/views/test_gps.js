import React from 'react';
import GPSTracker from '../components/GPSTracker';
import GPSTracker2 from '../components/GPSTracker2';

function TestGPS() {
  return (
    <div className="TestGPS">
      <h1>ติดตาม GPS และระยะทางที่วิ่ง V.2</h1>
      <GPSTracker2 />
    </div>
  );
}

export default TestGPS;
