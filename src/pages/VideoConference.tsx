import React, { useState } from 'react'
import { EuiFlexGroup, EuiForm, EuiFormRow, EuiSpacer, EuiSwitch } from "@elastic/eui";
import Header from '../components/Header';
import MeetingNameField from "../components/FormComponents/MeetingNameFeilds";
import { useScroll } from '@elastic/eui/src/components/datagrid/utils/scrolling';
import MeetingUserField from '../components/FormComponents/MeetingUserFeild';
import { FieldErrorType, UserType } from '../utils/Types';
import moment from 'moment';
import useFetchUsers from '../hooks/useFetchusers';
import MeetingDateField from '../components/FormComponents/MeetingDateFeild';

import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButton";
import { addDoc } from 'firebase/firestore';
import { meetingsRef } from '../utils/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { generateMeetingID } from '../utils/generateMeetingsId';
import { ToastContainer, toast } from 'react-toastify';
import MeetingMaximumUsersField from '../components/FormComponents/MaximumUsersField';

const VideoConference = () => {
  const [meetingName, setmeetingName] = useState(
    ""
  )
  const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [size, setSize] = useState(1);
  const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);

  const navigate=useNavigate()
  const uid=useAppSelector((zoom)=>zoom.auth.userInfo?.uid)

  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });
  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUser.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };
  const onUserChange = (selectedOptions: Array<UserType>) => {
    setSelectedUser(selectedOptions);
  };
  const [users] = useFetchUsers();
  //  const createMeeting = async () => {
  //   if (!validateForm()) {
  //   }
  // }

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: anyoneCanJoin ? "anyone-can-join" : "video-conference",
        invitedUsers: anyoneCanJoin
          ? []
          : selectedUser.map((user: UserType) => user.uid),
        meetingDate: startDate.format("L"),
        maxUsers: anyoneCanJoin ? 100 : size,

        status: true,
      });
      // createToast({
      //   title: "One on One Meeting Created Successfully",
      //   type: "success",
      // });
      
      navigate("/");
      toast.success("VideoC Conference created Successfully"); // Show success toast
    }
  };
  return (
    <>
     <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
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
       <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
        <EuiFormRow display="columnCompressedSwitch" label="Anyone can Join">
            <EuiSwitch
              showLabel={false}
              label="Anyone Can Join"
              checked={anyoneCanJoin}
              onChange={(e) => setAnyoneCanJoin(e.target.checked)}
              compressed
            />
          </EuiFormRow>

          <MeetingNameField
            label="Meeting name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setmeetingName}
          />
           {anyoneCanJoin ? (
            <MeetingMaximumUsersField value={size} setSize={setSize} />
          ) : (
            <MeetingUserField
              label="Invite Users"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUser}
              isClearable={false}
              placeholder="Select a Users"
            />
          )}
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
    </>
  );
}
export default VideoConference;