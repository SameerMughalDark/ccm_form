import { AccountCircle, AddCircleOutline, Cached, CancelOutlined, CheckBoxOutlined, Male, PersonOutline } from '@mui/icons-material'
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, InputLabel, List, ListItem, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import calenderLogo from '../Assets/Icons/calender.png'
import phoneIcon from '../Assets/Icons/calllogo.png'
import clickableLgo from '../Assets/Icons/clickable.png'
import emailLgo from '../Assets/Icons/emaillogo.png'
import React, { useEffect, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import dayjs from 'dayjs';







function Form2() {
    const [quizAnswer1, setQuizAnswer1] = useState("");
    const [quizAnswer2, setQuizAnswer2] = useState("");
    const [quizAnswer3, setQuizAnswer3] = useState("");
    const [openTimeModal, setOpenTimeModal] = useState(false);
    const [openDateModal, setOpenDateModal] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [previousForm, setPreviousForm] = useState([]);
    // eslint-disable-next-line
    const [patientInfo, setPatientInfo] = useState({
        p_Name: "Muhammad Zeeshan",
        p_Email: "drozair87@gmail.com",
        p_Gender: "Male",
        p_DOB: "07-21-2023",
        p_Contact: "",
        p_ZipCode: "75685",
        p_Address: "test ADDRESS FOR TESTING PURPOSE",
        p_City: "Airport",
        p_State: "Pakistan",
        doctor_Name: "",
        doctor_Contact: "",
        doctor_Email: "",
        primery_Insurance_Name: "Medicare",
        primery_Insurance_Id: "7786i7668766",
        secondary_Insurance_Name: "Medicare",
        secondary_Insurance_Id: "578556787855",
    })
    const [allTextField, setAllTextField] = useState({
        created_By: "",
        a_Status: "",
        a_Diagones: "",
        a_Measurable_Goal: "",
        a_Plan: "",
        h_Status: "",
        h_Diagones: "",
        h_Measurable_Goal: "",
        h_Plan: "",
        allergies_Reviewed: "",
        current_Symptoms: "",
        medications: "",
        care_Taker_Name: "",
        care_Taker_Contact: "",
        health_Care_Name: "",
        first_Visit: "",
        specialty: "",
        last_Visit: "",
        changes_In_Medicine: "",
        hospitalized_Or_Not: "",
        any_Surgeries: "",
        other_Prob: ""
    })
    const handleChangeInputs = (e) => {
        setAllTextField({
            ...allTextField, [e.target.name]: e.target.value
        })
    }
    const [fluVacRadio, setFluVacRadio] = useState("");
    const [pnVac, setPnVac] = useState("");
    const [psaChecked, setPsaChecked] = useState("");
    const [colonoscopy, setColonoscopy] = useState("");
    const [mamogram, setMamogram] = useState("");
    const [pcareGiver, setPcareGiver] = useState("");
    const [pLivesAt, setPLivesAt] = useState("");
    const [pLivesWith, setPLivesWith] = useState("");
    const [pActivi, setPActivi] = useState("");

    // allCheckButtons State is here
    const [hyper, setHyper] = useState(false);
    const [cornary, setCornary] = useState(false);
    const [congestiveHeart, setCongestiveHeart] = useState(false);
    const [fibleration, setFibleration] = useState(false);
    const [copd, setCOPD] = useState(false);
    const [displymedia, setDisplymedia] = useState(false);
    const [hypothremedia, setHypothremedia] = useState(false);
    const [anemia, setAnemia] = useState(false);
    const [chronicKidney, setChronicKidney] = useState(false);
    const [liverCondition, setLiverCondition] = useState(false);
    //DateTime inputs
    const [submissionDate, setSubmissionDate] = useState("");
    const [submissionTime, setSubmissionTime] = useState("");


    // showing previous record or not handle State is here
    const [showPrevRec, setShowPrevRec] = useState(false);





    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const timePickerInput = () => {
        if (openTimeModal === false) {
            setOpenTimeModal(true)
        }
        else {
            setOpenTimeModal(false)
        }

    }
    const datePickerInput = () => {
        if (openDateModal === false) {
            setOpenDateModal(true)
        }
        else {
            setOpenDateModal(false)
        }


    }



    // Changing Color of MUI Radio Buttons 
    const radioButtonColors = createTheme({

        components: {
            MuiRadio: {
                styleOverrides: {
                    root: {
                        '&.Mui-checked': {
                            color: '#01619B', // Set your custom color for checked state

                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: 14,
                        },
                        height: "14px",
                        width: "14px",
                        fontSize: '14px'


                    },
                },
            },
        },
    });

    // Modal CSS
    const style = {
        backgroundColor: 'white',
        borderRadius: '15px 15px 15px 15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    };

    // fetching data of the user who is going to submit form
    const fetchUserDetail = async () => {
        const response = await axios.get(`http://192.168.0.145/ccmform/api/Profile/GetProfile`);
        const patientDetail = response.data.result[0];
        setPatientInfo({
            p_Name: patientDetail.p_Name,
            p_Email: patientDetail.p_Email,
            p_Gender: patientDetail.p_Gender,
            p_DOB: patientDetail.p_DOB,
            p_Contact: patientDetail.p_Contact,
            p_ZipCode: patientDetail.p_ZipCode,
            p_Address: patientDetail.p_Address,
            p_City: patientDetail.p_City,
            p_State: patientDetail.p_State,
            doctor_Name: patientDetail.doctor_Name,
            doctor_Contact: patientDetail.doctor_Contact,
            doctor_Email: patientDetail.doctor_Email,
            primery_Insurance_Name: patientDetail.primery_Insurance_Name,
            primery_Insurance_Id: patientDetail.primery_Insurance_Id,
            secondary_Insurance_Name: patientDetail.secondary_Insurance_Name,
            secondary_Insurance_Id: patientDetail.secondary_Insurance_Id,
        })

    }

    // submiting Data function
    const submitForm = async () => {
        // debugger;
        try {
            const submissionData = {
                profile_ID: 3,
                sumission_Date: new Date(submissionDate).toISOString(),
                // sumission_Date: "2023-11-27T04:04:50.987",
                created_By: allTextField.created_By,
                time_Spent: new Date(submissionTime).toISOString(),
                // time_Spent: "2023-11-27T04:04:50.987Z",
                a_Status: allTextField.a_Status,
                a_Diagones: allTextField.a_Diagones,
                a_Measurable_Goal: allTextField.a_Measurable_Goal,
                a_Plan: allTextField.a_Plan,
                h_Status: allTextField.h_Status,
                h_Diagones: allTextField.h_Diagones,
                h_Measurable_Goal: allTextField.h_Measurable_Goal,
                h_Plan: allTextField.h_Plan,
                hypertension: hyper.toString(),
                coronory_artry_disease: cornary.toString(),
                congestive_heart_failure: congestiveHeart.toString(),
                atrial_fibrillation: fibleration.toString(),
                copd: copd.toString(),
                dyslipidemia: displymedia.toString(),
                hypothyroidism: hypothremedia.toString(),
                anemia: anemia.toString(),
                chronic_Kidney: chronicKidney.toString(),
                liver_Cirrhosis: liverCondition.toString(),
                allergies_Reviewed: allTextField.allergies_Reviewed,
                current_Symptoms: allTextField.current_Symptoms,
                medications: allTextField.medications,
                flue_Vaccine: fluVacRadio,
                pneumonia_Vaccine: pnVac,
                for_Males_Only: psaChecked,
                colonoscopy: colonoscopy,
                mammorgram: mamogram,
                care_Taker_Name: allTextField.care_Taker_Name,
                care_Taker_Contact: allTextField.care_Taker_Contact,
                health_Care_Name: allTextField.health_Care_Name,
                first_Visit: allTextField.first_Visit,
                specialty: allTextField.specialty,
                last_Visit: allTextField.last_Visit,
                changes_In_Medicine: quizAnswer1 + " " + allTextField.changes_In_Medicine,
                hospitalized_Or_Not: quizAnswer2 + " " + allTextField.hospitalized_Or_Not,
                any_Surgeries: quizAnswer3 + " " + allTextField.any_Surgeries,
                other_Prob: allTextField.other_Prob,
                patient_CareG: pcareGiver,
                patient_LivesAt: pLivesAt,
                pateint_Livesw: pLivesWith,
                patient_Activities: pActivi
            }
            // console.log(submissionData)


            const resp = await axios.post("http://192.168.0.145/ccmform/api/Profile/AddPatientDetails",
                submissionData
            );
            // console.log(resp)
            if (resp.data.message === "Profile Details has been added! ") {

                alert("Submitted Successfully!");
            }

        } catch (error) {

        }

    }



    const getPreviousForms = async () => {
        // Pass your patient profileID here as a param for getting his/her previous record
        const resp = await axios.get(`http://192.168.0.145/ccmform/api/Profile/GetUserByID?profileid=3`);
        // console.log(resp.data.result);
        setPreviousForm(resp.data.result)
        // console.log(previousForm)
    }

    const getPreviousSingleRecord = async (srno) => {
        const resp = await axios.get(`http://192.168.0.145/ccmform/api/Profile/GetByIDandDate?serial_No=${srno}`);
        const prevSingleRecord = resp.data.result;
        setShowPrevRec(true);
        // console.log(prevSingleRecord);
        
        
        setSubmissionDate(dayjs( prevSingleRecord.sumission_Date))
        setSubmissionTime(dayjs(prevSingleRecord.time_Spent))
        setAllTextField({
            created_By: prevSingleRecord.created_By,
            a_Status: prevSingleRecord.a_Status,
            // a_Status: "controlled",
            a_Diagones: prevSingleRecord.a_Diagones,
            a_Measurable_Goal: prevSingleRecord.a_Measurable_Goal,
            a_Plan: prevSingleRecord.a_Plan,
            h_Status: prevSingleRecord.h_Status,
            // h_Status: "controlled",
            h_Diagones: prevSingleRecord.h_Diagones,
            h_Measurable_Goal: prevSingleRecord.h_Measurable_Goal,
            h_Plan: prevSingleRecord.h_Plan,
            allergies_Reviewed: prevSingleRecord.allergies_Reviewed,
            current_Symptoms: prevSingleRecord.current_Symptoms,
            medications: prevSingleRecord.medications,
            care_Taker_Name: prevSingleRecord.care_Taker_Name,
            care_Taker_Contact: prevSingleRecord.care_Taker_Contact,
            health_Care_Name: prevSingleRecord.health_Care_Name,
            first_Visit: prevSingleRecord.first_Visit,
            specialty: prevSingleRecord.specialty,
            last_Visit: prevSingleRecord.last_Visit,
            changes_In_Medicine: prevSingleRecord.changes_In_Medicine,
            hospitalized_Or_Not: prevSingleRecord.hospitalized_Or_Not,
            any_Surgeries: prevSingleRecord.any_Surgeries,
            other_Prob: prevSingleRecord.other_Prob,
        })
        // all radio buttons
        setFluVacRadio(prevSingleRecord.flue_Vaccine)
        setPnVac(prevSingleRecord.pneumonia_Vaccine)
        setPsaChecked(prevSingleRecord.for_Males_Only)
        setColonoscopy(prevSingleRecord.colonoscopy)
        setMamogram(prevSingleRecord.mammorgram)
        setPActivi(prevSingleRecord.patient_Activities)
        setPLivesWith(prevSingleRecord.pateint_Livesw)
        setPLivesAt(prevSingleRecord.patient_LivesAt)
        setPcareGiver(prevSingleRecord.patient_CareG)
        setQuizAnswer1(prevSingleRecord.changes_In_Medicine.slice(0,3))
        setQuizAnswer2(prevSingleRecord.hospitalized_Or_Not.slice(0,3))
        setQuizAnswer3(prevSingleRecord.any_Surgeries.slice(0,3))
    // console.log(prevSingleRecord.any_Surgeries.slice(0,3))
    // console.log(prevSingleRecord.any_Surgeries.slice(0,3).length)
        
        






    }



    useEffect(() => {
        fetchUserDetail();
        getPreviousForms();
    }, [open])
    return (

        <>

            <ThemeProvider theme={radioButtonColors}>
                <Button onClick={handleOpen}>Open modal</Button>
                <div  >
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    // sx={{height:"100vh"}}
                    >

                        <Box sx={{
                            ...style,
                            position: { xs: "", sm: "", md: "", lg: "absolute", xl: "absolute" },
                            overflowY: { xs: "auto", sm: "auto", md: "auto", lg: "visible", xl: "visible" },
                            top: { xs: '', sm: "", md: "", lg: "50%", xl: "50%" },
                            left: { xs: "", sm: "", md: "", lg: "50%", xl: "50%" },
                            transform: { xs: " ", sm: "", md: "", lg: "translate(-50%, -140%)", xl: "translate(-50%, -140%)" },

                            width: { xs: "100%", sm: "100%", md: "100%", lg: "90%", xl: "90%" },
                            height: { xs: "100vh", sm: "100vh", md: "100vh", lg: "200px", xl: '200px' }
                        }}>



                            <Box sx={{
                                width: "100%",
                                height: { xs: "1600px", sm: "1600px", md: "1600px", lg: "570px", xl: "570px" }, backgroundColor: "white", borderRadius: "10px 10px 0 0", border: "1px solid #BDBDBD"
                            }}  >
                                <Box sx={{ width: "100%", height: "48px", borderRadius: "10px 10px 0 0", backgroundColor: "#01619B", color: "#FFFFFF", display: 'flex', justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
                                    <Typography variant='h6' ml={2} sx={{ fontSize: "18px", }}>
                                        CCM Form
                                    </Typography>

                                    <CancelOutlined onClick={handleClose} sx={{ cursor: 'pointer', marginRight: "50px", }} />

                                </Box>

                                {/* header Section */}
                                <Box sx={{
                                    margin: "10px auto", width: "98%", border: "1px solid #BDBDBD", borderRadius: "10px",
                                    position: { xs: "", sm: "", md: "", lg: "fixed", xl: "fixed" },
                                    top: { xs: 45, sm: 45, md: 48, lg: 48, xl: 48 },
                                    left: { xs: 2, sm: 2, md: 2, lg: 12, xl: 12 },
                                }} >

                                    <Grid container >
                                        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                                            <Box display={"flex"} sx={{ flexDirection: { sm: "column", xs: 'column', md: "column", xl: "row", lg: "row" }, alignItems: { sm: "center", xs: "center", md: "center", lg: "flex-start", xl: "flex-start" } }} >
                                                <AccountCircle sx={{ color: "#01619B", fontSize: "60px", marginTop: "5px" }} />
                                                <Box>

                                                    <Typography mt={1} ml={3} sx={{ color: "#01619B" }} variant='h6'>{patientInfo.p_Name}</Typography>

                                                    <Box mt={2} width={"100%"} display={"flex"}
                                                        sx={{ flexDirection: { sm: "column", xs: 'column', md: "column", xl: "row", lg: "row" }, alignItems: "center", }} >

                                                        <Box sx={{ width: "50%", display: "flex", alignItems: "center", gap: "10px" }}>
                                                            <Box width={"10%"}>
                                                                <Male sx={{ color: "#01619B" }} />
                                                            </Box>

                                                            <Typography width={"90%"} sx={{ color: "#3F3F3F", fontSize: "14px" }}>
                                                                {patientInfo.p_Gender}
                                                            </Typography>

                                                        </Box>

                                                        <Box sx={{ width: "50%", display: "flex", alignItems: "center", }}>
                                                            <Box width={"15%"}>

                                                                <img src={phoneIcon} alt='phoneICon' />
                                                            </Box>

                                                            <Typography width={"85%"} sx={{ color: "#3F3F3F", fontSize: "14px" }}>
                                                                {patientInfo.p_Contact}

                                                            </Typography>
                                                        </Box>
                                                    </Box>


                                                    <Box width={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}
                                                        sx={{ flexDirection: { sm: "column", xs: 'column', md: "column", xl: "row", lg: "row" } }} >

                                                        <Box sx={{ width: '50%', display: "flex", alignItems: "center", gap: "10px" }}>
                                                            <Box width={"10%"}>

                                                                <img src={calenderLogo} alt="calenderLogo" />
                                                            </Box>
                                                            <Typography sx={{ width: "90%", color: "#3F3F3F", fontSize: "14px" }}>
                                                                {new Date(patientInfo.p_DOB).toDateString().slice(4)}
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={{ width: "50%", display: "flex", alignItems: "center", }}>
                                                            <Box width={"20%"}>
                                                                <img src={emailLgo} alt='emailICon' />
                                                            </Box>

                                                            <Typography width={"85%"} sx={{ color: "#3F3F3F", fontSize: "14px" }}>
                                                                {patientInfo.p_Email}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                </Box>

                                            </Box>

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={4} xl={4} >


                                            <Box width={"100%"} display={"flex"} sx={{ flexDirection: { xs: "column", sm: "column", md: "column", lg: "row", xl: "row" } }} justifyContent={"center"} alignItems={"center"}>

                                                <Box sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block", xl: "block" } }}>
                                                    <Divider orientation="vertical" flexItem sx={{ margin: '10px 0px', height: '90px', backgroundColor: "#808080", borderRadius: "10px" }} />
                                                </Box>

                                                <Box sx={{
                                                    width: { xs: "250px", sm: "250px", md: "250px", lg: "100%", xl: "100%" },
                                                    textAlign: { xs: "center", sm: "center", md: 'center', lg: "left", xl: "left" },
                                                    marginTop: { xs: "20px", sm: "20px", md: "20px", lg: "0px", xl: "0px" }, marginLeft: { xs: "80px", sm: "80px", md: "80px", lg: '0px', xl: "0px" }
                                                }} height={"110px"} display={"flex"}


                                                    flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >

                                                    <Box width={"100%"} display={"flex"} justifyContent={"center"} >
                                                        <Typography width={"20%"} variant="h6" sx={{ fontSize: "14px" }}>Address: </Typography>
                                                        <Typography width={"70%"} variant="subtitle1" sx={{ fontSize: "14px" }}>{patientInfo.p_Address}
                                                        </Typography>
                                                    </Box>
                                                    <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                                                        <Typography width={"20%"} variant="h6" sx={{ fontSize: "14px" }}>City: </Typography>
                                                        <Typography width={"70%"} variant="subtitle1" sx={{ fontSize: "14px" }}>{patientInfo.p_City}
                                                        </Typography>
                                                    </Box>
                                                    <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                                                        <Typography width={"20%"} variant="h6" sx={{ fontSize: "14px" }}>Zip code: </Typography>
                                                        <Typography width={"70%"} variant="subtitle1" sx={{ fontSize: "14px" }}>{patientInfo.p_ZipCode}
                                                        </Typography>
                                                    </Box>
                                                    <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                                                        <Typography width={"20%"} variant="h6" sx={{ fontSize: "14px" }}>State: </Typography>
                                                        <Typography width={"70%"} variant="subtitle1" sx={{ fontSize: "14px" }}>{patientInfo.p_State}
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                                <Box sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block", xl: "block" } }}>
                                                    <Divider orientation="vertical" flexItem sx={{ margin: '10px 0px', height: '90px', backgroundColor: "#808080", borderRadius: "10px" }} />
                                                </Box>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>


                                            <Box sx={{
                                                display: 'flex', justifyContent: "space-evenly", flexDirection: 'column', height: "110px", alignItems: { sm: "center", xs: "center", lg: "center", xl: "center", md: "center" },
                                                marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px", xl: "0px" }
                                            }} >

                                                <Typography variant='h6' sx={{ color: '#3F3F3F' }}>
                                                    Provider Details:
                                                </Typography>
                                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>

                                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                                        <Box width={"20%"}>

                                                            <PersonOutline sx={{ color: "#478DB7", }} />
                                                        </Box>
                                                        <Typography sx={{ width: "70%" }} variant='subtitle1'>{patientInfo.doctor_Name}</Typography>
                                                    </Box>
                                                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}  >
                                                        <Box width={"20%"}>
                                                            <img src={phoneIcon} alt="PhoneIcon" />
                                                        </Box>
                                                        <Typography sx={{ width: "70%" }} variant='subtitle1'>{patientInfo.doctor_Contact}</Typography>
                                                    </Box>
                                                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                        <Box width={"20%"}>
                                                            <img src={emailLgo} alt="emailLogo" />  </Box>
                                                        <Typography sx={{ width: "70%" }} variant='subtitle1'>{patientInfo.doctor_Email}</Typography>
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Grid>


                                    </Grid>
                                </Box>

                                {/* Header Ends Here */}
                                <Grid container sx={{
                                    justifyContent: { sm: "center", xs: 'center', md: "center", lg: "space-between", xl: "space-between" },
                                    position: { xs: "", sm: "", md: "", lg: 'fixed', xl: 'fixed' },
                                    top: { xs: 480, sm: 480, md: 480, lg: 170, xl: 170 }
                                }} mt={2} >
                                    <Grid item sx={{ marginLeft: { xs: "4px", sm: "", md: "12px", lg: "12px", xl: "12px" } }} xs={12} sm={12} md={12} lg={1} xl={1}>
                                        <Box sx={{
                                            borderRadius: '12px 12px 0 0',
                                            width: { xs: "100%", sm: "100%", md: "100%", lg: "260px", xl: "260px" },
                                            height: { xs: "130px", sm: "200px", md: "200px", lg: "300px", xl: "300px" },
                                            overflowY: "auto", border: "1px solid #808080", '&::-webkit-scrollbar': {
                                                width: '2px',
                                            },

                                            /* Set the color and border-radius of the scrollbar thumb */
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor: '#01619a',
                                                borderRadius: '6px',
                                            },

                                            /* Set the color and border-radius of the scrollbar track */
                                            '&::-webkit-scrollbar-track': {
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '6px',
                                            },

                                            /* Optionally, style the scrollbar in different states */
                                            '&::-webkit-scrollbar-thumb:hover': {
                                                backgroundColor: '#555',
                                            },

                                            '&::-webkit-scrollbar-thumb:active': {
                                                backgroundColor: '#333',
                                            },
                                        }}>
                                            <Box sx={{ width: "100%", height: "30px", borderRadius: '12px 12px 0 0', backgroundColor: "#01619B", display: "flex", justifyContent: "space-between", textAlign: "center", alignItems: "center" }}>
                                                <Typography variant='h6' ml={2} color={"white"} fontSize={"15px"}>
                                                    Previous Form
                                                </Typography>
                                                <AddCircleOutline onClick={() => { setShowPrevRec(false) }} sx={{ cursor: 'pointer', mr: 2, color: "whitesmoke", fontSize: "20px" }} />
                                            </Box>



                                            <List sx={{ width: "100%", }}>

                                                {previousForm.map((prevData, index) => {
                                                    return <div key={index}>
                                                        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
                                                            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                <Typography sx={{ color: "#01619B", fontSize: "15px" }}>
                                                                    {new Date(prevData.sumission_Date).toDateString().slice(4)}
                                                                </Typography>
                                                                <img src={clickableLgo} onClick={() => { getPreviousSingleRecord(prevData.serial_No) }} style={{ cursor: "pointer" }} alt="clickablelogo" />
                                                            </Box>
                                                            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                                                <Typography sx={{ color: "#474747", fontSize: "14px", fontWeight: "bold" }}>
                                                                    Created By:
                                                                </Typography>

                                                                <Typography sx={{ color: "#666666", fontSize: "13px", marginLeft: "5px" }}>
                                                                    {prevData.created_By}
                                                                </Typography>

                                                            </Box>
                                                        </ListItem>
                                                        <Divider sx={{ backgroundColor: "#BDBDBD" }} />
                                                    </div>
                                                })}
                                            </List>

                                        </Box>

                                    </Grid>

                                    <Grid item sx={{ marginRight: { xs: "", sm: "", md: "", lg: "14px", xl: "14px" } }} xs={12} sm={12} md={12} lg={9} xl={9}>
                                        {/* Right Side Section1 */}
                                        <Box sx={{
                                            width: "100%", borderRadius: "10px 10px 0 0", border: "1px solid white", boxShadow: "0 4px 8px 0 #00000033, 0 6px 20px 0 #00000033",
                                            height: { xs: "1200px", sm: "1200px", md: '1200px', lg: '300px', xl: '300px' },
                                            overflowX: { xs: "hidden", sm: "hidden", md: "hidden", lg: 'hidden', xl: "hidden" },
                                            overflowY: { xs: "", sm: "", md: "", lg: 'auto', xl: 'auto' },
                                            '&::-webkit-scrollbar': {
                                                width: '5px',
                                            },

                                            /* Set the color and border-radius of the scrollbar thumb */
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor: '#01619a',
                                                borderRadius: '6px',
                                            },

                                            /* Set the color and border-radius of the scrollbar track */
                                            '&::-webkit-scrollbar-track': {
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '6px',
                                            },

                                            /* Optionally, style the scrollbar in different states */
                                            '&::-webkit-scrollbar-thumb:hover': {
                                                backgroundColor: '#555',
                                            },

                                            '&::-webkit-scrollbar-thumb:active': {
                                                backgroundColor: '#333',
                                            },
                                        }}>

                                            <Grid container ml={1} mt={2}>
                                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                                    <Box sx={{ width: { xs: "96.5%", sm: "96.5%", md: "96.5%", lg: "96.5%", xl: "96.5%" }, height: "30px", borderRadius: '12px 12px 0 0', backgroundColor: "#01619B", display: "flex", alignItems: "center" }}>
                                                        <Typography variant='h6' color={"white"} fontSize={"16px"} ml={2}>
                                                            Insurance Info
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ border: "1px solid #CDCDCD", width: { xs: "96%", sm: "96%", md: "96%", lg: "96%", xl: "96%" }, height: "201px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", }}>

                                                        <Box sx={{ width: '100%', display: "flex", justifyContent: "center" }}>
                                                            <Typography sx={{ display: "flex", justifyContent: "flex-start" }} width={"50%"} variant='h6' fontSize={"15px"} >
                                                                Primary Insurance Name:
                                                            </Typography>
                                                            <Typography width={"40%"} sx={{ display: "flex", justifyContent: "flex-start" }} fontSize={"15px"} >
                                                                {patientInfo.primery_Insurance_Name}
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={{ width: '100%', display: "flex", justifyContent: "center" }}>
                                                            <Typography sx={{ display: "flex", justifyContent: "flex-start" }} width={"50%"} variant='h6' fontSize={"15px"} >
                                                                Primary Insurance Id:
                                                            </Typography>
                                                            <Typography width={"40%"} sx={{ display: "flex", justifyContent: "flex-start" }} fontSize={"15px"} >
                                                                {patientInfo.primery_Insurance_Id}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ width: '100%', display: "flex", justifyContent: "center" }}>
                                                            <Typography sx={{ display: "flex", justifyContent: "flex-start" }} width={"50%"} variant='h6' fontSize={"15px"} >
                                                                Secondary Insurance Name:
                                                            </Typography>
                                                            <Typography width={"40%"} sx={{ display: "flex", justifyContent: "flex-start" }} fontSize={"15px"} >
                                                                {patientInfo.secondary_Insurance_Name}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ width: '100%', display: "flex", justifyContent: "center" }}>
                                                            <Typography sx={{ display: "flex", justifyContent: "flex-start" }} width={"50%"} variant='h6' fontSize={"15px"} >
                                                                Secondary Insurance Id:
                                                            </Typography>
                                                            <Typography width={"40%"} sx={{ display: "flex", justifyContent: "flex-start" }} fontSize={"15px"} >
                                                                {patientInfo.secondary_Insurance_Id}
                                                            </Typography>
                                                        </Box>

                                                    </Box>

                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                                    <Box sx={{ ml: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }, mt: { xs: 1, sm: 1, md: 0, xl: 0, lg: 0 } }}>

                                                        <Box sx={{ width: { xs: "96.5%", sm: "96.5%", md: "96.5%", lg: "96.5%", xl: "96.5%" }, height: "30px", borderRadius: '12px 12px 0 0', backgroundColor: "#01619B", display: "flex", alignItems: "center" }}>
                                                            <Typography variant='h6' color={"white"} fontSize={"16px"} ml={2}>
                                                                MA Details
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ border: "1px solid #CDCDCD", width: { xs: "96%", sm: "96%", md: "96%", lg: "96%", xl: "96%" }, height: "201px", display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "column" }}>

                                                            <Box sx={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: "space-evenly" }}>
                                                                <Typography variant='h6' width={"40%"} fontSize={"15px"} >
                                                                    Submission Date:
                                                                </Typography>

                                                                <Box width={"50%"} onClick={datePickerInput}>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}    >
                                                                        <DatePicker value={submissionDate} 
                                                                          
                                                                        onChange={(date) => { setSubmissionDate(date); }} sx={{ width: { sm: "100%", xs: "100%", md: "100%", lg: "210px", xl: "210px" } }} open={openDateModal}
                                                                            slotProps={{

                                                                                textField: {
                                                                                    size: 'small', name: "sumission_Date",


                                                                                }

                                                                            }
                                                                            }
                                                                        />




                                                                    </LocalizationProvider>
                                                                </Box>
                                                            </Box>

                                                            <Box sx={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: "space-evenly" }}>
                                                                <Typography variant='h6' width={"40%"} fontSize={"16px"} >
                                                                    Created By:
                                                                </Typography>

                                                                <Box width={"50%"} >
                                                                    <TextField
                                                                        onChange={(e) => handleChangeInputs(e)}
                                                                        variant='outlined'
                                                                        name="created_By"
                                                                        id="createdBy"
                                                                        type="text"
                                                                        size='small'
                                                                        value={allTextField.created_By}
                                                                        sx={{ width: { sm: "100%", xs: "100%", md: "100%", lg: "210px", xl: "210px" } }}
                                                                    />
                                                                </Box>

                                                            </Box>



                                                            <Box sx={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: "space-evenly" }}>

                                                                <Typography variant='h6' width={"40%"} fontSize={"16px"} >
                                                                    Time Spent:
                                                                </Typography>

                                                                <Box width={"50%"} onClick={timePickerInput} >

                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <TimePicker value={submissionTime} onChange={(time) => { setSubmissionTime(time) }} sx={{ width: { sm: "100%", xs: "100%", md: "100%", lg: "210px", xl: "210px" } }} open={openTimeModal} slotProps={{
                                                                            textField: {
                                                                                size: 'small', name: "time_Spent",


                                                                            },
                                                                        }}

                                                                        />
                                                                    </LocalizationProvider>

                                                                </Box>

                                                            </Box>
                                                        </Box>
                                                    </Box>

                                                </Grid>
                                            </Grid>
                                            {/* Right Side Section2 Chronic Condition and Prolem Condtion */}

                                            <Grid container ml={1} mt={2}>
                                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                                    <Box sx={{ width: { xs: "96%", sm: "96%", md: "96%", lg: "96%", xl: "96%" } }} height={"415px"} border={"1px solid #CDCDCD"} borderRadius={"12px 12px 0 0"}>

                                                        <Box sx={{ width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" }, height: "30px", borderRadius: '12px 12px 0 0', backgroundColor: "#01619B", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <Typography variant='h6' color={"white"} fontSize={"16px"} ml={2}>
                                                                Chronic Condition
                                                            </Typography>
                                                            <Cached sx={{ cursor: 'pointer', color: "white", marginRight: "10px" }} />
                                                        </Box>

                                                        <Typography variant='h6' sx={{ fontSize: "14px" }} m={1} ml={2}>
                                                            1- Anesthesia
                                                        </Typography>
                                                        <Box mt={2} width={"100%"} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} >

                                                            <FormControl sx={{ width: "176px", height: "40px" }}>

                                                                <InputLabel id="anesthesiaInput">Status</InputLabel>
                                                                <Select
                                                                    labelId="anesthesiaInputLabel"
                                                                    id="anesthesiaInputLabel"
                                                                    name="a_Status"
                                                                    label="a_Status"
                                                                    onChange={handleChangeInputs}
                                                                    value={allTextField.a_Status}
                                                                >

                                                                    <MenuItem value={"controlled"}>Controlled</MenuItem>
                                                                    <MenuItem value={"uncontrolled"}>UnControlled</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <FormControl sx={{ width: "176px", height: "40px" }}>

                                                                <TextField id="AdiagnosisInput" label={"Diagnoses"}
                                                                    variant="outlined"
                                                                    name='a_Diagones'
                                                                    onChange={handleChangeInputs}
                                                                    value={allTextField.a_Diagones}

                                                                />
                                                            </FormControl>

                                                        </Box>

                                                        <Box mt={5} width={"100%"} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} >

                                                            <FormControl sx={{ width: "176px", height: "40px" }}>

                                                                <TextField id="AmeasureableInput" label="Measureable Goal" variant="outlined" name='a_Measurable_Goal'
                                                                    onChange={handleChangeInputs}
                                                                    value={allTextField.a_Measurable_Goal}

                                                                />

                                                            </FormControl>
                                                            <FormControl sx={{ width: "176px", height: "40px" }}>

                                                                <TextField id="Aplan" label="Plan"
                                                                    variant="outlined" name='a_Plan'
                                                                    onChange={handleChangeInputs}
                                                                    value={allTextField.a_Plan}
                                                                />
                                                            </FormControl>

                                                        </Box>



                                                        <Typography variant='h6' sx={{ fontSize: "14px" }} mt={4} ml={2}>
                                                            1- Hypertension
                                                        </Typography>
                                                        <Box mt={2} width={"100%"} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} >

                                                            <FormControl sx={{ width: "176px", height: "40px" }}>

                                                                <InputLabel id="hypertensionStatusID">Status</InputLabel>
                                                                <Select
                                                                    labelId="hypertensionStatusLabelID"
                                                                    id="hypertensionStatusLabel"
                                                                    label="Status"
                                                                    name='h_Status'
                                                                    value={allTextField.h_Status}
                                                                    onChange={handleChangeInputs}
                                                                >

                                                                    <MenuItem value={"controlled"}>Controlled</MenuItem>
                                                                    <MenuItem value={"uncontrolled"}>UnControlled</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <FormControl sx={{ width: "176px", height: "40px" }}>

                                                                <TextField id="hypertensionDiagnosis"
                                                                    label="Diagnosis"
                                                                    variant="outlined" name='h_Diagones'
                                                                    onChange={handleChangeInputs}
                                                                    value={allTextField.h_Diagones}
                                                                />
                                                            </FormControl>

                                                        </Box>

                                                        <Box mt={5} width={"100%"} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} >

                                                            <FormControl sx={{ width: "176px", height: "40px" }}>

                                                                <TextField id="hypertensionMeasureable" label="Measurable goal" variant="outlined" name='h_Measurable_Goal'
                                                                    onChange={handleChangeInputs}
                                                                    value={allTextField.h_Measurable_Goal}
                                                                />

                                                            </FormControl>
                                                            <FormControl sx={{ width: "176px", height: "40px" }}>

                                                                <TextField id="hypertensionPlan" label="Plan" variant="outlined" name='h_Plan'
                                                                    onChange={handleChangeInputs}
                                                                    value={allTextField.h_Plan}
                                                                />
                                                            </FormControl>

                                                        </Box>



                                                    </Box>


                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >

                                                    <Box sx={{ ml: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }, mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 }, width: { xs: "96%", sm: "96%", md: "96%", lg: "96%", xl: "96%" }, }} height={"415px"} border={"1px solid #CDCDCD"} borderRadius={"12px 12px 0 0"} >

                                                        <Box sx={{ width: "100%", height: "30px", borderRadius: '12px 12px 0 0', backgroundColor: "#01619B", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <Typography variant='h6' color={"white"} fontSize={"16px"} ml={2}>
                                                                Problems
                                                            </Typography>
                                                            <Cached sx={{ cursor: 'pointer', color: "white", marginRight: "10px" }} />
                                                        </Box>
                                                        {/* Problems CheckBoxes */}

                                                        <Box width={"100%"} mt={1} sx={{ display: 'flex', flexDirection: "column", justifyContent: "space-evenly" }}>

                                                            <FormControlLabel sx={{ marginTop: -1, marginLeft: 2 }} control={<Checkbox onChange={(e) => {

                                                                setHyper(e.target.checked)

                                                            }} name='hypertension'

                                                                checkedIcon={<CheckBoxOutlined />} />} label="Hypertension" value={hyper} />

                                                            <FormControlLabel sx={{ marginTop: -1, marginLeft: 2 }} control={<Checkbox name='coronaryChkBox' onChange={(e) => {
                                                                setCornary(e.target.checked)
                                                            }} checkedIcon={<CheckBoxOutlined />} />} value={cornary} label="Coronary artery disease" />

                                                            <FormControlLabel sx={{ marginTop: -1, marginLeft: 2 }} control={<Checkbox name='hearFailureChkBox' onChange={(e) => {
                                                                setCongestiveHeart(e.target.checked)
                                                            }}
                                                                checkedIcon={<CheckBoxOutlined />} />} label="Congestive heart failure" value={congestiveHeart} />


                                                            <FormControlLabel sx={{ marginTop: -1, marginLeft: 2 }} control={<Checkbox name='atrialChkBox' onChange={(e) => {
                                                                setFibleration(e.target.checked)
                                                            }}
                                                                checkedIcon={<CheckBoxOutlined />} />} label="Atrial fibrillation" value={fibleration} />

                                                            <FormControlLabel sx={{ marginTop: -1, marginLeft: 2 }} control={<Checkbox name='copdChkBox'
                                                                onChange={(e) => { setCOPD(e.target.checked) }}
                                                                checkedIcon={<CheckBoxOutlined />} />} label="COPD" value={copd} />

                                                            <FormControlLabel sx={{ marginTop: -1, marginLeft: 2 }} control={<Checkbox name='dysliChkBox'
                                                                onChange={(e) => { setDisplymedia(e.target.checked) }}
                                                                checkedIcon={<CheckBoxOutlined />} />} label="Dyslipidemia" value={displymedia} />


                                                            <FormControlLabel sx={{ marginTop: -1, marginLeft: 2 }} control={<Checkbox name='hypothyroidChkBox'
                                                                onChange={(e) => { setHypothremedia(e.target.checked) }}
                                                                checkedIcon={<CheckBoxOutlined />} />} label="Hypothyroidism" value={hypothremedia} />

                                                            <FormControlLabel sx={{ marginTop: -1, marginLeft: 2 }} control={<Checkbox name='anemiaChkBox'
                                                                onChange={(e) => { setAnemia(e.target.checked) }}
                                                                checkedIcon={<CheckBoxOutlined />} />} label="Anemia" value={anemia} />

                                                            <FormControlLabel sx={{ marginTop: -1, marginLeft: 2 }} control={<Checkbox name='chronicChkBox'
                                                                onChange={(e) => { setChronicKidney(e.target.checked) }}
                                                                checkedIcon={<CheckBoxOutlined />} />} label="Chronic kidney Disease" value={chronicKidney} />

                                                            <FormControlLabel sx={{ marginTop: -1, marginLeft: 2 }} control={<Checkbox name='liverChkBox'
                                                                onChange={(e) => { setLiverCondition(e.target.checked) }}
                                                                checkedIcon={<CheckBoxOutlined />} />} label="Liver cirrhosis" value={liverCondition} />


                                                            <TextField
                                                                name='other_Prob'
                                                                size='small'
                                                                placeholder='Other...'
                                                                onChange={handleChangeInputs}
                                                                value={allTextField.other_Prob}

                                                                sx={{ marginTop: -1, marginLeft: "25px", width: "80%" }}


                                                            />

                                                        </Box>




                                                    </Box>
                                                </Grid>
                                            </Grid>


                                            {/* RightSide Section3 Allergies Symptoms Reviews */}
                                            <Grid container mt={2}>
                                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                                                    <Box ml={1} sx={{ width: "94%", height: "200px", borderRadius: "12px 12px 0 0", border: "1px solid #BDBDBD" }}>

                                                        <Box sx={{ width: "100%", height: "30px", borderRadius: '12px 12px 0 0', backgroundColor: "#01619B", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <Typography variant='h6' color={"white"} fontSize={"16px"} ml={2}>
                                                                Allergies-Reviewed
                                                            </Typography>
                                                            <Cached sx={{ cursor: 'pointer', color: "white", marginRight: "10px" }} />
                                                        </Box>




                                                        <TextField

                                                            name="allergies_Reviewed"
                                                            multiline
                                                            rows={6}
                                                            onChange={handleChangeInputs}
                                                            value={allTextField.allergies_Reviewed}
                                                            fullWidth
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                    <Box ml={1} sx={{ width: "94%", height: "200px", borderRadius: "12px 12px 0 0", border: "1px solid #BDBDBD" }}>

                                                        <Box sx={{ width: "100%", height: "30px", borderRadius: '12px 12px 0 0', backgroundColor: "#01619B", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <Typography variant='h6' color={"white"} fontSize={"16px"} ml={2}>
                                                                Current Symptoms
                                                            </Typography>
                                                            <Cached sx={{ cursor: 'pointer', color: "white", marginRight: "10px" }} />
                                                        </Box>


                                                        <TextField
                                                            name="current_Symptoms"
                                                            multiline
                                                            rows={6}
                                                            value={allTextField.current_Symptoms}
                                                            onChange={handleChangeInputs}
                                                            fullWidth

                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                    <Box ml={1} sx={{ width: "94%", height: "200px", borderRadius: "12px 12px 0 0", border: "1px solid #BDBDBD" }}>

                                                        <Box sx={{ width: "100%", height: "30px", borderRadius: '12px 12px 0 0', backgroundColor: "#01619B", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <Typography variant='h6' color={"white"} fontSize={"16px"} ml={2}>
                                                                Medications
                                                            </Typography>
                                                            <Cached sx={{ cursor: 'pointer', color: "white", marginRight: "10px" }} />
                                                        </Box>


                                                        <TextField
                                                            name="medications"
                                                            multiline
                                                            rows={6}
                                                            value={allTextField.medications}
                                                            onChange={handleChangeInputs}
                                                            fullWidth
                                                        />
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            {/* Right Side Section4- Preventive Care and Psycho Social */}

                                            <Grid container mt={2}>
                                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                                    <Box ml={1} sx={{ width: { xs: "94%", sm: "94%", md: "96%", lg: "96%", xl: "96%" } }} height={"190px"} border={"1px solid #CDCDCD"} borderRadius={"12px 12px 0 0"}>
                                                        <Box sx={{ width: "100%", height: "30px", borderRadius: '12px 12px 0 0', backgroundColor: "#01619B", }}>
                                                            <Typography variant='h6' color={"white"} fontSize={"16px"} ml={2}>
                                                                Preventive Care
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={{ fontSize: "14px", fontFamily: "roboto", color: "#3F3F3F" }}>

                                                            <Box mt={1} width={"100%"} height={"30px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} textAlign={"center"} >
                                                                <Box width={"40%"} ml={1} textAlign={"left"}>Flu Vaccine</Box>


                                                                <RadioGroup
                                                                    onChange={(e) => { setFluVacRadio(e.target.value) }}
                                                                    sx={{ display: "flex", justifyContent: "flex-end", width: { xs: "50%", sm: "50%", md: "40%", lg: "40%", xl: "40%" } }}
                                                                    row
                                                                    aria-labelledby="fluVaccine"
                                                                    name="fluVaccine"
                                                                >
                                                                    <FormControlLabel value="yes" control={<Radio size='small' />} label="Yes" checked={fluVacRadio==="yes"?true:false} />
                                                                    <FormControlLabel value="no" control={<Radio size='small' />} label="No"  checked={fluVacRadio==="no"?true:false} />
                                                                    <FormControlLabel value="not-available" control={<Radio size='small'  checked={fluVacRadio==="not-available"?true:false} />} label="NA" />
                                                                </RadioGroup>
                                                            </Box>


                                                            <Box width={"100%"} height={"30px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} textAlign={"center"} >
                                                                <Box width={"40%"} ml={1} textAlign={"left"}>Pneumonia Vaccine</Box>


                                                                <RadioGroup
                                                                    onChange={(e) => { setPnVac(e.target.value) }}
                                                                    sx={{ width: { xs: "50%", sm: "50%", md: "40%", lg: "40%", xl: "40%" }, display: "flex", justifyContent: "flex-end", }}
                                                                    row
                                                                    aria-labelledby="Pneumonia"
                                                                    name="Pneumonia"
                                                                >
                                                                    <FormControlLabel value="yes" control={<Radio size='small' />} label="Yes" checked={pnVac==="yes"?true:false}  />
                                                                    <FormControlLabel value="no" control={<Radio size='small' checked={pnVac==="no"?true:false}  />} label="No"  />
                                                                    <FormControlLabel value="not-available" control={<Radio size='small'checked={pnVac==="not-available"?true:false}  />} label="NA" />
                                                                </RadioGroup>
                                                            </Box>


                                                            <Box width={"100%"} height={"30px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} textAlign={"center"} >
                                                                <Box width={"40%"} ml={1} textAlign={"left"}>For males only PSA checked</Box>


                                                                <RadioGroup
                                                                    onChange={(e) => { setPsaChecked(e.target.value) }}
                                                                    sx={{ width: { xs: "50%", sm: "50%", md: "40%", lg: "40%", xl: "40%" }, display: "flex", justifyContent: "flex-end", }}
                                                                    row
                                                                    aria-labelledby="PSA"
                                                                    name="PSA"
                                                                >
                                                                    <FormControlLabel value="yes" control={<Radio size='small' checked={psaChecked==="yes"?true:false} />} label="Yes" />
                                                                    <FormControlLabel value="no" control={<Radio size='small' checked={psaChecked==="no"?true:false} />} label="No"  />
                                                                    <FormControlLabel value="not-available" control={<Radio size='small' checked={psaChecked==="not-available"?true:false} />} label="NA" />
                                                                </RadioGroup>
                                                            </Box>

                                                            <Box width={"100%"} height={"30px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} textAlign={"center"} >
                                                                <Box width={"40%"} ml={1} textAlign={"left"}>Colonoscopy</Box>


                                                                <RadioGroup
                                                                    onChange={(e) => { setColonoscopy(e.target.value) }}
                                                                    sx={{ width: { xs: "50%", sm: "50%", md: "40%", lg: "40%", xl: "40%" }, display: "flex", justifyContent: "flex-end", }}
                                                                    row
                                                                    aria-labelledby="Colonoscopy"
                                                                    name="Colonoscopy"
                                                                >
                                                                    <FormControlLabel value="yes" control={<Radio size='small'checked={colonoscopy==="yes"?true:false} />} label="Yes" />
                                                                    <FormControlLabel value="no" control={<Radio size='small'checked={psaChecked==="no"?true:false} />} label="No" />
                                                                    <FormControlLabel value="not-available" control={<Radio size='small' checked={psaChecked==="not-available"?true:false} />} label="NA" />
                                                                </RadioGroup>
                                                            </Box>


                                                            <Box width={"100%"} height={"30px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} textAlign={"center"} >
                                                                <Box width={"40%"} ml={1} textAlign={"left"}>Mammogram</Box>


                                                                <RadioGroup
                                                                    onChange={(e) => { setMamogram(e.target.value) }}
                                                                    sx={{ width: { xs: "50%", sm: "50%", md: "40%", lg: "40%", xl: "40%" }, display: "flex", justifyContent: "flex-end", }}
                                                                    row
                                                                    aria-labelledby="Mammograml"
                                                                    name="Mammograml"
                                                                >
                                                                    <FormControlLabel value="yes" control={<Radio size='small' checked={mamogram==="yes"?true:false}/>} label="Yes" />
                                                                    <FormControlLabel value="no" control={<Radio size='small' checked={mamogram==="no"?true:false} />} label="No" />
                                                                    <FormControlLabel value="not-available" control={<Radio size='small' checked={mamogram==="not-available"?true:false}/>} label="NA" />
                                                                </RadioGroup>
                                                            </Box>

                                                        </Box>





                                                    </Box>


                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                                    <Box ml={1} sx={{ width: { xs: "95%", sm: "95%", md: "96%", lg: "96%", xl: "96%" }, height: { xs: "280px", sm: "280px", md: "190px", lg: "190px", xl: "190px" } }} border={"1px solid #CDCDCD"} borderRadius={"12px 12px 0 0"} >

                                                        <Box sx={{ width: "100%", height: "30px", borderRadius: '12px 12px 0 0', backgroundColor: "#01619B", }}>
                                                            <Typography variant='h6' color={"white"} fontSize={"16px"} ml={2}>
                                                                Psycho Social
                                                            </Typography>


                                                            <Box sx={{ fontSize: "14px", fontFamily: "roboto", color: "#3F3F3F" }}>


                                                                <Box width={"100%"} mt={1} sx={{ height: { xs: "50px", sm: "50px", md: "30px", lg: "30px", xl: "30px" }, }} display={"flex"} justifyContent={"space-between"} alignItems={"center"} textAlign={"center"} >
                                                                    <Box width={"40%"} ml={1} textAlign={"left"}>Patient __ a care giver.</Box>



                                                                    <RadioGroup

                                                                        onChange={(e) => { setPcareGiver(e.target.value) }}
                                                                        sx={{ width: "55%" }}
                                                                        row
                                                                        aria-labelledby="parentCareGiver"
                                                                        name="parentCareGiver"
                                                                    >
                                                                        <FormControlLabel value="has" control={<Radio size='small'  checked={pcareGiver==="has"?true:false} />} label="has" />
                                                                        <FormControlLabel value="has_not" control={<Radio size='small'  checked={pcareGiver==="has_not"?true:false} />} label="has not" />


                                                                    </RadioGroup>
                                                                </Box>



                                                                <Box width={"100%"} mt={1} sx={{ height: { xs: "50px", sm: "50px", md: "30px", lg: "30px", xl: "30px" }, }} display={"flex"} justifyContent={"space-between"} alignItems={"center"} textAlign={"center"} >
                                                                    <Box width={"40%"} ml={1} textAlign={"left"}>Patient lives at.</Box>

                                                                    <RadioGroup
                                                                        onChange={(e) => { setPLivesAt(e.target.value) }}
                                                                        sx={{ width: "55%", }}
                                                                        row
                                                                        aria-labelledby="patientLivesat"
                                                                        name="patientLivesat"
                                                                    >
                                                                        <FormControlLabel value="home" control={<Radio size='small'  checked={pLivesAt==="home"?true:false} />} label="home" />
                                                                        <FormControlLabel value="nursing" control={<Radio size='small'  checked={pLivesAt==="nursing"?true:false} />} label="nursing" />
                                                                        <FormControlLabel value="assisted living" control={<Radio size='small'  checked={pLivesAt==="assisted living"?true:false} />} label="assisted" />


                                                                    </RadioGroup>
                                                                </Box>



                                                                <Box width={"100%"} mt={1} sx={{ height: { xs: "50px", sm: "50px", md: "30px", lg: "30px", xl: "30px" }, }} display={"flex"} justifyContent={"space-between"} alignItems={"center"} textAlign={"center"} >
                                                                    <Box width={"40%"} ml={1} textAlign={"left"}>Patient lives with.</Box>

                                                                    <RadioGroup
                                                                        onChange={(e) => { setPLivesWith(e.target.value) }}
                                                                        sx={{ width: "55%", }}
                                                                        row
                                                                        aria-labelledby="patientLivesWith"
                                                                        name="patientLivesWith"
                                                                    >
                                                                        <FormControlLabel value="by_herself" control={<Radio size='small'  checked={pLivesWith==="by_herself"?true:false} />} label="by herself" />
                                                                        <FormControlLabel value="with_family" control={<Radio size='small'  checked={pLivesWith==="with_family"?true:false} />} label="family" />
                                                                        <FormControlLabel value="spouse" control={<Radio size='small'  checked={pLivesWith==="spouse"?true:false} />} label="spouse" />


                                                                    </RadioGroup>
                                                                </Box>


                                                                <Box width={"100%"} mt={1} sx={{ height: { xs: "50px", sm: "50px", md: "30px", lg: "30px", xl: "30px" }, }} display={"flex"} justifyContent={"space-between"} alignItems={"center"} textAlign={"center"} >
                                                                    <Box width={"40%"} ml={1} textAlign={"left"}>Patient is __ perform activities of daily living.</Box>

                                                                    <RadioGroup
                                                                        onChange={(e) => { setPActivi(e.target.value) }}
                                                                        sx={{ width: "55%", }}
                                                                        row
                                                                        aria-labelledby="pActivities"
                                                                        name="pActivities"
                                                                    >
                                                                        <FormControlLabel value="able_to" control={<Radio size='small'  checked={pActivi==="able_to"?true:false} />} label="able to" />
                                                                        <FormControlLabel value="unable_to" control={<Radio size='small'  checked={pActivi==="unable_to"?true:false} />} label="unable to" />



                                                                    </RadioGroup>
                                                                </Box>

                                                            </Box>

                                                        </Box>

                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            {/* Right Side Section4 CareTaker Name and Health care */}
                                            <Grid container mt={2}>
                                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                                    <Box ml={1} sx={{ width: { xs: "96%", sm: "96%", md: "96%", lg: "96%", xl: "96%" }, height: { xs: "200px", sm: "200px", md: "162px", lg: "162px", xl: "162px" } }} border={"1px solid #CDCDCD"} borderRadius={"10px 0 0 0"}>
                                                        <Box sx={{ width: "100%", height: "30px", borderRadius: '10px 0 0 0', backgroundColor: "#01619B", }}>
                                                            <Typography variant='h6' color={"white"} fontSize={"16px"} ml={2}>
                                                                Health Care team
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                                                            <Box mt={2} sx={{ width: "100%", fontSize: "14px", fontFamily: "roboto", color: "#3F3F3F", display: "flex", alignItems: "center", justifyContent: "center", }}>

                                                                <label htmlFor='healthCare_name' style={{ width: "40%", color: "#3F3F3F", fontWeight: "bold", fontSize: "14px", display: "flex", }}>
                                                                    Name:
                                                                </label>


                                                                <Box width={"50%"} sx={{ display: 'block' }}>

                                                                    <input type="text" name="care_Taker_Name"
                                                                        onChange={handleChangeInputs}
                                                                        id="healthCare_name" style={{ width: "100%", height: "40px", border: "1px solid #BDBDBD", borderRadius: "5px", fontSize: '14px', color: '#3F3F3F' }}
                                                                        value={allTextField.care_Taker_Name}
                                                                    />
                                                                </Box>

                                                            </Box>

                                                            <Box mt={2} sx={{ width: "100%", fontSize: "14px", fontFamily: "roboto", color: "#3F3F3F", display: "flex", alignItems: "center", justifyContent: "center", }}>

                                                                <label htmlFor='contact_No' style={{ width: "40%", color: "#3F3F3F", fontWeight: "bold", fontSize: "14px" }}>
                                                                    Contact No:
                                                                </label>


                                                                <Box width={"50%"} sx={{ display: 'block' }}>

                                                                    <input type="text" name="care_Taker_Contact"
                                                                        onChange={handleChangeInputs}
                                                                        id="contact_No" style={{ width: "100%", height: "40px", border: "1px solid #BDBDBD", borderRadius: "5px", fontSize: '14px', color: '#3F3F3F' }}
                                                                        value={allTextField.care_Taker_Contact}
                                                                    />
                                                                </Box>

                                                            </Box>



                                                        </Box>


                                                    </Box>


                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                                                    <Box ml={1} sx={{ width: { xs: "96%", sm: "96%", md: "96%", lg: "96%", xl: "96%" }, height: { xs: "300px", sm: "300px", md: "162px", lg: "162px", xl: "162px" } }} border={"1px solid #CDCDCD"} borderRadius={"0px 10px 0 0"} >

                                                        <Box sx={{ width: "100%", height: "30px", borderRadius: '0px 10px 0 0', backgroundColor: "#01619B", }}>
                                                            <Typography variant='h6' color={"white"} fontSize={"16px"} ml={2}>
                                                                Primary Health Care Giver
                                                            </Typography>


                                                            <Box mt={2} width={"100%"} sx={{ fontSize: "14px", fontFamily: "roboto", color: "#3F3F3F" }}>


                                                                <Box width={"100%"} display={"flex"} justifyContent={"space-around"} alignItems={"center"} sx={{ flexDirection: { xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }, }}>




                                                                    <Box width={"100%"} sx={{ display: "flex", mt: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 } }} justifyContent={"center"} alignItems={"center"}>
                                                                        <label htmlFor='healthCare_name2' style={{ width: "40%", color: "#3F3F3F", fontWeight: "bold", fontSize: "14px" }}>
                                                                            Name:
                                                                        </label>
                                                                        <input type="text" name="health_Care_Name"
                                                                            onChange={handleChangeInputs}
                                                                            id="healthCare_name2" style={{ width: "50%", height: "40px", border: "1px solid #BDBDBD", borderRadius: "5px", fontSize: '14px', color: '#3F3F3F' }}
                                                                            value={allTextField.health_Care_Name}

                                                                        />
                                                                    </Box>



                                                                    <Box width={"100%"} sx={{ display: "flex", mt: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 } }} justifyContent={"center"} alignItems={"center"}>

                                                                        <label htmlFor='firstVisit' style={{ width: '40%', color: "#3F3F3F", fontWeight: "bold", fontSize: "14px", }}>
                                                                            First visit:
                                                                        </label>
                                                                        <input type="text" name="first_Visit"
                                                                            onChange={handleChangeInputs}
                                                                            id="firstVisit" style={{ width: "50%", height: "40px", border: "1px solid #BDBDBD", borderRadius: "5px", fontSize: '14px', color: '#3F3F3F' }}
                                                                            value={allTextField.first_Visit}

                                                                        />
                                                                    </Box>
                                                                </Box>
                                                            </Box>

                                                            <Box mt={1} sx={{ fontSize: "14px", fontFamily: "roboto", color: "#3F3F3F", width: "100%", display: "flex", flexDirection: { xs: "column", sm: "column", md: "row", lg: "row", xl: "row" } }}>



                                                                <Box width={"100%"} sx={{ display: "flex", mt: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 } }} justifyContent={"center"} alignItems={"center"}>
                                                                    <label htmlFor='speciality' style={{ width: "40%", color: "#3F3F3F", fontWeight: "bold", fontSize: "14px", }}>
                                                                        Speciality:
                                                                    </label>
                                                                    <input type="text" name="specialty"
                                                                        onChange={handleChangeInputs}
                                                                        id="speciality" style={{ width: "50%", height: "40px", border: "1px solid #BDBDBD", borderRadius: "5px", fontSize: '14px', color: '#3F3F3F' }}
                                                                        value={allTextField.specialty}

                                                                    />
                                                                </Box>



                                                                <Box width={"100%"} sx={{ display: "flex", mt: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 } }} justifyContent={"center"} alignItems={"center"}>

                                                                    <label htmlFor='lVisit' style={{ width: "40%", color: "#3F3F3F", fontWeight: "bold", fontSize: "14px" }}>
                                                                        Last Visit:
                                                                    </label>
                                                                    <input type="text"
                                                                        onChange={handleChangeInputs}
                                                                        name="last_Visit" id="lVisit" style={{ width: "50%", height: "40px", border: "1px solid #BDBDBD", borderRadius: "5px", fontSize: '14px', color: '#3F3F3F' }}
                                                                        value={allTextField.last_Visit}

                                                                    />
                                                                </Box>
                                                            </Box>
                                                        </Box>

                                                    </Box>

                                                </Grid>
                                            </Grid>
                                            {/* Right Side Section5  Health care Questions */}
                                            <Grid container>
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Box sx={{ width: "98%", margin: "15px auto", height: { xs: "220px", sm: "150px", md: "150px", lg: "150px", xl: "150px" }, border: "1px solid #BDBDBD", borderRadius: "10px 10px 0 0" }}>
                                                        <Box sx={{ width: "100%", height: "30px", borderRadius: "10px 10px 0 0", backgroundColor: "#01619B" }}>
                                                            <Typography ml={2} sx={{ fontSize: "16px", color: "white" }}>
                                                                Health Care Questions
                                                            </Typography>
                                                        </Box>

                                                        <Box mt={1} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <Typography ml={2} sx={{ fontSize: { xs: "11px", sm: "11px", md: "14px", lg: "14px", xl: "14px" }, width: "50%", color: "#3F3F3F" }}>
                                                                In last one month, have you had any changes in your medications?
                                                            </Typography>


                                                            <Box mr={2} sx={{ display: "flex" }}>

                                                                <RadioGroup
                                                                    sx={{ ml: 2 }}
                                                                    row
                                                                    aria-labelledby="lastOneMonthMedication"
                                                                    name="lastOneMonthMedication"
                                                                    onChange={(e) => { setQuizAnswer1(e.target.value); }}
                                                                >
                                                                    <FormControlLabel value="yes" control={<Radio size='small'  checked={quizAnswer1==="yes"?true:false} />} label="Yes" />
                                                                    <FormControlLabel value="no" control={<Radio size='small' checked={quizAnswer1==="no "?true:false}  />} label="No" />

                                                                </RadioGroup>
                                                                <Box display={quizAnswer1 === "yes" ? "block" : "none"}>

                                                                    <input type="text" name="changes_In_Medicine"
                                                                        value={allTextField.changes_In_Medicine}
                                                                        onChange={handleChangeInputs}
                                                                        id="medicationQuiz" style={{ width: "139px", height: "24px", border: "1px solid #BDBDBD", borderRadius: "3px", fontSize: '14px', color: '#3F3F3F' }} />
                                                                </Box>
                                                            </Box>
                                                        </Box>

                                                        <Box mt={1} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <Typography ml={2} sx={{ fontSize: { xs: "11px", sm: "11px", md: "14px", lg: "14px", xl: "14px" }, width: "50%", color: "#3F3F3F" }}>
                                                                In last one month, have you been hospitalized or have been to ER?
                                                            </Typography>


                                                            <Box mr={2} sx={{ display: "flex" }}>
                                                                <RadioGroup
                                                                    sx={{ ml: 2 }}
                                                                    row
                                                                    aria-labelledby="ERHospital"
                                                                    name="ERHospital"
                                                                    onChange={(e) => { setQuizAnswer2(e.target.value); }}
                                                                >
                                                                    <FormControlLabel value="yes" control={<Radio size='small' checked={quizAnswer2==="yes"?true:false} />} label="Yes" />
                                                                    <FormControlLabel value="no" control={<Radio size='small'  checked={quizAnswer2==="no "?true:false} />} label="No" />

                                                                </RadioGroup>
                                                                <Box display={quizAnswer2 === "yes" ? "block" : "none"}>

                                                                    <input type="text" name="hospitalized_Or_Not"
                                                                        onChange={handleChangeInputs}
                                                                        value={allTextField.hospitalized_Or_Not}
                                                                        id="erQuiz" style={{ width: "139px", height: "24px", border: "1px solid #BDBDBD", borderRadius: "3px", fontSize: '14px', color: '#3F3F3F' }} />
                                                                </Box>
                                                            </Box>
                                                        </Box>

                                                        <Box mt={1} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <Typography ml={2} sx={{ fontSize: { xs: "11px", sm: "11px", md: "14px", lg: "14px", xl: "14px" }, width: "50%", color: "#3F3F3F" }}>
                                                                In last one month, have you had any surgeries or any serious health related issues?
                                                            </Typography>


                                                            <Box mr={2} sx={{ display: "flex" }}>
                                                                <RadioGroup
                                                                    sx={{ ml: 2 }}
                                                                    row
                                                                    aria-labelledby="surgeries"
                                                                    name="surgeries"
                                                                    onChange={(e) => { setQuizAnswer3(e.target.value); }}
                                                                >
                                                                    <FormControlLabel value="yes" control={<Radio size='small'  checked={quizAnswer3==="yes"?true:false} />} label="Yes" />
                                                                    <FormControlLabel value="no " control={<Radio size='small' checked={quizAnswer3==="no"?true:false}  />} label="No" />

                                                                </RadioGroup>
                                                                <Box display={quizAnswer3 === "yes" ? "block" : "none"}>

                                                                    <input type="text" name="any_Surgeries"
                                                                        onChange={handleChangeInputs}
                                                                        value={allTextField.any_Surgeries}
                                                                        id="surgeriesQuiz" style={{ width: "139px", height: "24px", border: "1px solid #BDBDBD", borderRadius: "3px", fontSize: '14px', color: '#3F3F3F' }} />
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>


                                            {/* our Box is end here */}
                                        </Box>

                                    </Grid>
                                </Grid>

                                {/* footer submit buttons  */}
                                <Box mt={1} sx={{
                                    width: "100%", height: "40px",

                                    position: { xs: "", sm: "", md: "", lg: "fixed", xl: "fixed" },
                                    top: { xs: "", sm: "", md: "", lg: 510, xl: 510 },


                                }}>
                                    <Box width={"100%"} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button variant="contained" sx={showPrevRec ? { fontSize: '13px', borderRadius: "20px" } : {
                                            width: { xs: "20px", sm: "20px", md: "30px", lg: "88px", xl: "88px" },
                                            height: "38px",
                                            borderRadius: "20px", backgroundColor: "#01619B", marginRight: "10px"

                                        }} onClick={submitForm}  >{showPrevRec ? "Add Again" : "Save"}</Button>
                                        <Button onClick={handleClose} variant="contained" sx={{
                                            width: { xs: "20px", sm: "20px", md: "30px", lg: "88px", xl: "88px" },
                                            height: "38px", borderRadius: "20px", backgroundColor: "#808080", marginRight: "50px"
                                        }}>Cancel</Button>

                                    </Box>
                                </Box>


                            </Box>



                        </Box>

                    </Modal>

                </div>
            </ThemeProvider>
        </>
    )
}

export default Form2
