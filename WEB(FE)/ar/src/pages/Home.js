import React, { useEffect, useState } from 'react';

import useHeader from '../components/base/hooks/useHeader';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Patient from '../components/Home/Patient';
import Commander from '../components/Home/Commander';
import Whereareyou from '../components/Home/Whereareyou';
import AuthLoadBackground from '../components/Auth/AuthLoadBackground';

import db from '../database/DB_Manager';
import { UserActions } from '../app/slice/UserSlice';

import { onSnapshot, doc, getDoc } from "firebase/firestore";

import "antd/dist/antd.min.css";
import { Layout } from 'antd';
import Onvacation from '../components/Home/Onvacation';
import styled from 'styled-components';

const { Content } = Layout;

const HomeDesign = styled.div`
  height: 720px;
`;

const Home = () => {
  const [isLoad, setIsLoad] = useState(true);
  const { user } = useHeader();
  const uid = user.uid;
  const [rollcall, setRollCall] = useState(false);
  const [Boss, setBoss] = useState(false);
  const [isVacation, setIsVacation] = useState(false);

  const [Open, setOpen] = useState(false);

  const unsub = onSnapshot(doc(db,"02155004", "본부중대", "User",`${uid}`), (doc) => {
    setRollCall(doc.data().Timetorollcall);
  });

  async function getData(){
    const docRef = doc(db,"02155004","본부중대","User",`${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
      if(docSnap.data().IsBoss){
        setBoss(docSnap.data().IsBoss);
      }

      if(docSnap.data().isVacation){
        setIsVacation(doc.apply.data().IsVacation);
      }
    }else{
      console.log("데이터가 없는데요?");
      unsub();
    }
  };

  function wait1Second(){
    setTimeout(()=>{
      setIsLoad(false);
    },1000);
  };

  useEffect(() => {
    getData();
    wait1Second();
  }, []);

  return (
    <>
      {!isLoad &&
      <>
        <Layout className="layout">
          <Header />
          <Content>
            <HomeDesign>
              <div>
                { !Boss && 
                  <>
                  { isVacation &&
                    <Onvacation />
                  }
                  { !isVacation &&
                    <>
                      <Content
                        style={{
                          padding: '0 50px',
                        }}
                      >
                        <div className="site-layout-content">
                          <Whereareyou />
                        </div>
                      </Content>
                      { rollcall && <Patient Open={Open} onComplete={()=>{
                        setOpen(false);
                      }}/> }
                    </>
                  }
                  </>
                }
                { Boss && <Commander />}
              </div>
            </HomeDesign>
          </Content>
          <Footer />
        </Layout>
      </>
      }
      {isLoad && <AuthLoadBackground />}
    </>
    
  );
}

export default Home;