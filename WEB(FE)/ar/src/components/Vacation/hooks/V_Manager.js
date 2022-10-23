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
    const toend = new Date();
    const q = query(collection(db, "02155004", "본부중대", "Vacation"), where("Examine", "==", false), where("Startdate", ">" , toend));
    let count = 1;
    const v_Snapshot = await getDocs(q);

    v_Snapshot.forEach(async(res)=>{
        const start = new Date(res.data().Startdate.seconds * 1000);
        const Startday = start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate();
        const end = new Date(res.data().Enddate.seconds * 1000);
        const Endday = end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate();

        const user = {
            id : count,
            Name : res.data().Name,
            Class : res.data().Class,
            Destination : res.data().Destination,
            Startdate : Startday,
            Enddate : Endday,
            Content : res.data().Content,
            Note : res.data().Note,
        };
        console.log(user);
        v_list.push(user);
        count += 1;
    });
    return v_list;
};

export async function StartToday(){
    let v_list = [];
    let count = 0;
    const end = new Date();
    const today = end.getDate()  + "-" + (end.getMonth()+1) + "-" + end.getFullYear();
    const q = query(collection(db, "02155004", "본부중대", "Vacation"), where("Startdate", "==" , today));

    const v_Snapshot = await getDocs(q);
    v_Snapshot.forEach((res)=>{
        console.log(res.id, "=>",res.data());
        const user = {
            id : count,
            Name : res.data().Username,
            Class : res.data().Userclasses,
        };
        v_list.push(user);
        count += 1;
    });
    return v_list;
};

export async function EndToday(){
    let v_list = [];
    let count = 0;
    const end = new Date();
    const today = end.getDate()  + "-" + (end.getMonth()+1) + "-" + end.getFullYear();
    const q = query(collection(db, "02155004", "본부중대", "Vacation"), where("Startdate", "==" , today));
    const v_Snapshot = await getDocs(q);
    v_Snapshot.forEach((res)=>{
        const user = {
            id : count,
            Name : res.data().Username,
            Class : res.data().Userclasses,
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

export async function getId(name){
    let uid=null;
    const q = query(collection(db, "02155004", "본부중대", "User"), where("Username", "==", name));
    const v_Snapshot = await getDocs(q);
    v_Snapshot.forEach((val)=>{
        uid = val.data().Useremail;
        uid = uid.split('@');
        console.log(uid[0]);
    });
    return uid;
};

// PersonPage functions

export async function getUserVacation(uid){
    let UserData = {
        'Startdate' : new Date(),
        'Enddate' : new Date(),
        'Content' : '',
        'Examine' : false,
    };
    const UserRef = doc(db, '02155004', '본부중대', 'Vacation', `${uid}`);
    const docSnap = await getDoc(UserRef);

    if(docSnap.exists()){
        UserData.Startdate = new Date(docSnap.data().Startdate.seconds * 1000);
        UserData.Enddate = new Date(docSnap.data().Enddate.seconds * 1000);
        UserData.Content = docSnap.data().Content;
        UserData.Examine = docSnap.data().Examine;
    }else{
        return false;
    }
    return UserData;
};