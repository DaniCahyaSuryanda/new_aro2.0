import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import LangID from "json/lang/id/Akun/add/accountaddcreate.json";
import LangEN from "json/lang/en/Akun/add/accountaddcreate.json";
import messageID from "json/lang/id/Message/message.json";
import messageEN from "json/lang/en/Message/message.json";
import Toast from "component/Toast";
import { useHistory } from "react-router-dom";
import Input from "component/Input";

const AccAdd = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const [items, setItems] = useState(null);
  const [message, setMessage] = useState({});
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const [itemAccCreate, setItemCreate] = useState({});
  const [messageJson, setItemMessage] = useState({});

  const configApp = JSON.parse(sessionStorage.getItem("config"));

  const onSubmit = (data) => {
    setModal(true);
    setItems(data);
  };
  useEffect(
    () => {
      if (configApp.lang === "id") {
        setItemCreate(LangID);
        setItemMessage(messageID);
      } else if (configApp.lang == "en") {
        setItemCreate(LangEN);
        setItemMessage(messageEN);
      } else {
        setItemCreate(LangID);
        setItemMessage(messageID);
      }
    },
    [itemAccCreate],
    [messageJson]
  );

  // useEffect(
  //   () => {
  //     if (configApp.lang === "id") {
  //       setItemCreate(LangID);
  //       setMessageJson(messageJsonID);
  //     } else if (configApp.lang == " en") {
  //       setItemCreate(LangEN);
  //       setMessageJson(messageJsonEN);
  //     } else {
  //       setItemCreate(LangID);
  //       setMessageJson(messageJsonID);
  //     }
  //   },
  //   [itemAccCreate],
  //   [messageJson]
  // );

  const simpanData = () => {
    setMessage({});
    let data = {
      accno: items.accno,
      accname: items.accname,
      acctype: parseInt(items.acctype),
      normaldebit: items.normaldebit,
      description: items.description,
      isactive: items.isactive,
      validstate: 0,
    };
    axios
      .post(`${global.config.API_URL}gl/params/account/add/create`, data)
      .then((res) => {
        if (res.data.rescode === 0) {
          setMessage({
            title: messageJson.toatsheader_success,
            body: itemAccCreate.message_success,
            type: messageJson.toatscolor_success,
            active: true,
          });
          setModal(false);
          setItems(null);
          reset();
        } else {
          setModal(false);
          setMessage({
            title: messageJson.toatsheader_err,
            body: res.data.errdescription,
            type: messageJson.toatscolor_err,
            active: true,
          });
          //setMessage();
        }
      })
      .catch(function (error) {
        setMessage({
          title: messageJson.messagetype_err,
          body: JSON.stringify(error),
          type: messageJson.toatscolor_err,
          active: true,
        });
      });
  };

  // const eventSelect = (data) => {
  //   console.log(data);
  // };

  // const eventCheckbox = (value, checked) => {
  //   console.log(value);
  // };

  return (
    <>
      <Toast message={message} />
      <CRow>
        <CCol xl="12">
          <CCard>
            <CCardHeader>{itemAccCreate.form}</CCardHeader>
            <CForm
              encType="multipart/form-data"
              className="form-horizontal"
              onSubmit={handleSubmit(onSubmit)}
            >
              <CCardBody>
                <CRow>
                  <Input
                    ref={register}
                    typefield="text"
                    type="text"
                    label={itemAccCreate.accno}
                    name="accno"
                    defaultValue=""
                    id="accno"
                    md="6"
                    lg="6"
                  />
                  <Input
                    ref={register}
                    typefield="text"
                    type="text"
                    label={itemAccCreate.accname}
                    name="accname"
                    id="accname"
                    defaultValue=""
                    md="6"
                    lg="6"
                  />
                </CRow>
                <CRow>
                  <Input
                    ref={control}
                    typefield="select"
                    label={itemAccCreate.acctype}
                    name="acctype"
                    id="acctype"
                    md="6"
                    lg="6"
                    options={[
                      { value: "0", label: itemAccCreate.acctype_0 },
                      { value: "1", label: itemAccCreate.acctype_1 },
                    ]}
                    defaultValue=""
                    // eventSelect={eventSelect}
                  />
                  <Input
                    ref={control}
                    typefield="checkbox"
                    label={itemAccCreate.normaldebit}
                    name="normaldebit"
                    id="normaldebit"
                    md="2"
                    lg="2"
                    value="true"
                    defaultValue={false}
                    // eventCheckbox={eventCheckbox}
                  />
                  <Input
                    ref={control}
                    typefield="checkbox"
                    label={itemAccCreate.isactive}
                    name="isactive"
                    id="isactive"
                    md="2"
                    lg="2"
                    value={true}
                    defaultValue={false}
                    // eventCheckbox={eventCheckbox}
                  />
                </CRow>
                <CRow>
                  <Input
                    ref={register}
                    typefield="textarea"
                    label={itemAccCreate.description}
                    name="description"
                    id="description"
                    md="12"
                    lg="12"
                    rows="4"
                    defaultValue={""}
                  />
                </CRow>
              </CCardBody>
              <CCardFooter>
                <CButton
                  type="reset"
                  size={35}
                  color="warning"
                  onClick={() => history.goBack()}
                >
                  <CIcon name="cil-chevron-left" /> {itemAccCreate.confirm_no}
                </CButton>
                <CButton
                  type="submit"
                  className={"float-right"}
                  size={35}
                  color="primary"
                >
                  <CIcon name="cil-save" /> {itemAccCreate.save_button}
                </CButton>
                <CButton
                  type="reset"
                  size={35}
                  className={"float-right mr-3"}
                  color="danger"
                >
                  <CIcon name="cil-scrubber" /> {itemAccCreate.cancel_button}
                </CButton>
              </CCardFooter>
            </CForm>
            <CModal show={modal} onClose={setModal}>
              <CModalBody>
                <h3>{itemAccCreate.confirm_save}</h3>
              </CModalBody>
              <CModalFooter>
                <CButton onClick={() => simpanData()} color="primary">
                  {itemAccCreate.confirm_yes}
                </CButton>{" "}
                <CButton color="danger" onClick={() => setModal(false)}>
                  {itemAccCreate.confirm_no}
                </CButton>
              </CModalFooter>
            </CModal>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AccAdd;
