import React from 'react';
import { Marker, Popup } from "react-leaflet";

function PlaceMarker(props) {
    const position = [props.lattitude, props.longtitude];
    const marker = (
        <Marker position={position}>
            <Popup>
                <b>Tên: </b> {props.name} <br/>
                <b>Địa chỉ: </b> {props.address} <br/>
                <b>Ngày phát hiện: </b> {props.comfirmDate} <br/>
                <b>Ghi chú: </b> {props.description} <br/>
            </Popup>
        </Marker>
    )

    return marker;
}

export default PlaceMarker;