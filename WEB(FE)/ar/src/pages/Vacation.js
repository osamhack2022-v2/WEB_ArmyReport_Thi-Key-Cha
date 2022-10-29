import React, { useEffect, useState } from 'react';
import Footer from '../components/base/Footer';
import Header from '../components/base/Header';
import db from '../database/DB_Manager';
import { UserActions } from '../app/slice/UserSlice';
import AuthLoadBackground from '../components/Auth/AuthLoadBackground';

import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { 
  doc, 
  getDoc,
} from "firebase/firestore";
import VacationCommander from '../components/Vacation/VacationCommander';
import useHeader from '../components/base/hooks/useHeader';
import PersonPage from '../components/Vacation/PersonPage';

const Vacation = () => {
  const [isLoad, setisLoad] = useState(true);
  const [Boss, setBoss] = useState(false);
  const { user } = useHeader();
  const uid = user.uid;
  
  async function getData(){
    const docRef = doc(db,"02155004","본부중대","User",`${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
      if(docSnap.data().IsBoss){
          setBoss(docSnap.data().IsBoss);
      }
    }else{
    console.log("데이터가 없는데요?");
    }
  };

  function wait1Second(){
    setTimeout(()=>{
      setisLoad(false);
    },1000);
  }
  
  useEffect(() => {
    getData();
    wait1Second();
  },[]);


  return (
    <>
      {isLoad && <AuthLoadBackground />}
      {!isLoad && 
        <Layout className="layout">
          <Header />
          <Content>
            {Boss && 
            <div>
              <VacationCommander />
            </div>
            }
            {!Boss && <PersonPage />}
          </Content>
          <Footer />
        </Layout>
      }
    </>
  );
};

export default Vacation;