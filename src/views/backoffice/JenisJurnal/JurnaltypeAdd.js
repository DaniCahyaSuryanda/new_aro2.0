import CIcon from "@coreui/icons-react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CRow,
} from "@coreui/react";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import JurnalTypeAdd from "../../../gl/params/lang/id/journaltypeaddcreate.json";

const JenisJurnalAdd = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const [items, setItems] = useState(null);
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [toasts, setToasts] = useState("");

  const onSubmit = (data) => {
    setModal(true);
    setItems(data);
    // alert(JSON.stringify(data));
  };
  let messagesuccess = JurnalTypeAdd[0].message_success;
  const simpanData = () => {
    let data = {
      jrtype: items.jrtype,
      isactive: items.isactive,
      description: items.description,
      validstate: 0,
    };
    axios
      .post(`${global.config.API_URL}gl/params/journaltype/add/create`, data)
      .then((res) => {
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(messagesuccess);
          setModal(false);
          setItems(null);
          reset();
          setToasts(messagesuccess);
          setTimeout(() => {
            setToasts(null);
            setMessage(null);
          }, 4000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setModal(false);
          setToasts(res.data.errdescription);
          setTimeout(() => {
            setToasts(null);
            setMessage(null);
          }, 4000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const JenisJurnalCreate = JurnalTypeAdd.map((itemCreate) => (
    <CCol xl="12">
      <CCard>
        <CCardHeader>{itemCreate.form}</CCardHeader>
        <CCardBody>
          <CForm
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
          >
            <CRow>
              <CCol xs="12" md="8" xl="8">
                <CFormGroup row>
                  <CCol>
                    <CLabel htmlFor="text-input">{itemCreate.jrtype}</CLabel>
                  </CCol>
                  <CCol xs="12" xl="10">
                    <input
                      className="form-control"
                      defaultValue=""
                      id="jrtype"
                      name="jrtype"
                      ref={register}
                    />
                  </CCol>
                </CFormGroup>
              </CCol>

              <CCol xs="12" md="6" xl="4">
                <CFormGroup row>
                  <CCol>
                    <CLabel htmlFor="select">{itemCreate.isactive}</CLabel>
                  </CCol>
                  <CCol xs="12" xl="10">
                    <CFormGroup variant="custom-checkbox" inline>
                      <Controller
                        name="isactive"
                        control={control}
                        value={true}
                        defaultValue={true}
                        render={(props) => (
                          <CInputCheckbox
                            onChange={(e) => props.onChange(e.target.checked)}
                            checked={props.value}
                          />
                        )}
                      />
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" xl="12">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="textarea-input">
                      {itemCreate.description}
                    </CLabel>
                  </CCol>
                  <CCol xs="12" xl="12">
                    <textarea
                      name="description"
                      id="description"
                      defaultValue=""
                      rows="4"
                      ref={register}
                      className="form-control"
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
            <hr />
            <CButton type="reset" size={35} color="danger">
              <CIcon name="cil-scrubber" /> {itemCreate.cancel_button}
            </CButton>
            <CButton
              type="submit"
              className={"float-right"}
              size={35}
              color="primary"
            >
              <CIcon name="cil-save" /> {itemCreate.save_button}
            </CButton>
          </CForm>
        </CCardBody>

        <CModal show={modal} onClose={setModal}>
          <CModalBody>
            <h3>{itemCreate.confirm_save}</h3>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" onClick={() => simpanData()} color="primary">
              {itemCreate.confirm_yes}
            </CButton>{" "}
            <CButton color="danger" onClick={() => setModal(false)}>
              {itemCreate.confirm_no}
            </CButton>
          </CModalFooter>
        </CModal>
        {toasts && (
          <CToaster position="top-right">
            <CToastHeader className="bg-danger text-white">
              <h6>{toasts}</h6>
            </CToastHeader>
          </CToaster>
        )}
      </CCard>
    </CCol>
  ));

  return (
    <>
      {message && (
        <CRow>
          <CCol>
            <CAlert color={messType}>{message}</CAlert>
          </CCol>
        </CRow>
      )}
      <CRow>{JenisJurnalCreate}</CRow>
    </>
  );
};

export default JenisJurnalAdd;
