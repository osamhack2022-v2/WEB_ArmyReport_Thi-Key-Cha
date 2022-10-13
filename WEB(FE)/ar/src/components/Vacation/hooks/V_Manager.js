import React, { useState } from 'react';
import { 
    doc, 
    getDoc, 
    updateDoc, 
    setDoc, 
    getDocs, 
    query,
    collection,
    where
} from "firebase/firestore";
import db from '../../../database/DB_Manager';

// User Obj information 에 phonenumber 있습니다 <참고하세요>
// VacationCommander.js  Functions
export async function getVacation(){
    const v_list = [];
    const today = new Date();
    const q = query(collection(db, "02155004", "본부중대", "Vacation"), where("Startdate", ">" , today), where("Examine", "!=", true));
    let count = 1;
    const v_Snapshot = await getDocs(q);
    v_Snapshot.forEach((res)=>{
        const user = {
            id : count,
            Name : res.data().Username,
            Class : res.data().Userclasses,
            Destination : res.data().Destination,
            Startdate : res.data().Startdate,
            Enddate : res.data().Enddate,
            Content : res.data().Content,
            Note : res.data().Note,
        };
        v_list.push(user);
        count += 1;
    });
    return v_list;
};


export async function setVacation(uid, value){
    const docRef = doc(db, "02155004", "본부중대", "Vacation",`${uid}`);
    await updateDoc(docRef, {
        Positive : `${value}`,
        Examine : true,
    });
};

// PersonPage functions

export async function getUserVacation(uid){
    let UserData = {
        'Startdate' : new Date(),
        'Enddate' : new Date(),
        'Content' : '',
        'Examine' : false,
    };
    const UserRef = doc(db, '02155004', '본부중대', 'User', `${uid}`);
    const docSnap = await getDoc(UserRef);

    if(docSnap.exists()){
        console.log(docSnap.data());
        UserData.Startdate = docSnap.data().Startdate;
        UserData.Enddate = docSnap.data().Enddate;
        UserData.Content = docSnap.data().Content;
        UserData.Examine = docSnap.data().Examine;
    }else{
        return false;
    }
    return UserData;
};