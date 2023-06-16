import React, { useEffect } from "react";
import { useAppSelector } from "../hooks";
import "react-toastify/dist/ReactToastify.css"; // import first
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import dashboard1 from '../assets/dashboard1.png'
import dashboard2 from '../assets/dashboard2.png'
import dashboard3 from '../assets/dashboard3.png'
import Header from "../components/Header";

const Dashboard = () => {
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  const userInfo2 = useAppSelector((zoom) => zoom.auth.userInfo?.name);
  useAuth()
  console.log({ userInfo2 });
  useEffect(() => {
    if (userInfo2) {
      // Run the toast container on component mount
      toast(`${userInfo2} Logged In Successfully`);
    }
  }, []);

  const navigate=useNavigate()
  return (
    <>
    <div style={{
      display:'flex',
      height:"100vh",
      flexDirection:"column",
    }}>
     <Header/>
        <EuiFlexGroup justifyContent="center" alignItems="center" style={{
          margin:"5vh 10vw"
        }}>
          <EuiFlexItem>
            <EuiCard
            icon={<EuiImage size="5rem" alt="icon" src={dashboard1} />}
            title={'CreatingMeeting'}
            description="Create anew meeting and invite people"
            onClick={() => navigate('/create')}
            paddingSize="xl"/>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
            icon={<EuiImage size="100%" alt="icon" src={dashboard2} />}
            title={'My Meetings'}
            description="View your created Meetings"
            onClick={() => navigate('/mymeetings')}
            paddingSize="xl"/>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
            icon={<EuiImage size="5rem" alt="icon" src={dashboard3} />}
            title={'Meeting'}
            description="View the meetings that are invited to you"
            onClick={() => navigate('/create')}
            paddingSize="xl"/>
          </EuiFlexItem>
        </EuiFlexGroup>
    </div>
    
    
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    </div>
        </>
  );
};

export default Dashboard;
