import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { userData, currentClassId } from '../../atoms';
import { useHistory, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';

const Klass = () => {
    const { classId } = useParams();
    const [currentKlassId, setCurrentKlassId] = useRecoilState(currentClassId);
    setCurrentKlassId(classId);

    return (
        <>
        <div>KLASS</div>
        <div>{classId}</div>
        <div>{currentKlassId}</div>
        </>
    );
}
 
export default Klass;