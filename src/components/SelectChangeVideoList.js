import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

const SelectChangeVideoList = ({ thumbnail, category, url }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        addEventListenerVideo();
    }, [url]);

    const addEventListenerVideo = () => {
        const video = videoRef.current;

        if (video) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(url); // ใช้ URL ที่ถูกส่งเข้ามาใน props
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    //video.play();
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url; // ใช้ URL ที่ถูกส่งเข้ามาใน props
                video.addEventListener('canplay', () => {
                    // video.play();
                });
            }
        }
    }

    return (
        <video
            ref={videoRef}
            poster={thumbnail ? `${thumbnail}` : `../assets/img/thumb/${category.toLowerCase().split(" ").join("")}_g3.jpg`}
            className=""
            width="100%"
            height="50%"
            controls
            controlslist="nodownload"
            muted
            style={{ borderRadius: "20px 20px 0px 0px", overflow: "hidden" }}
        >
            <source src={url} type="application/x-mpegURL"></source>
        </video>
    );
};


export default SelectChangeVideoList;

