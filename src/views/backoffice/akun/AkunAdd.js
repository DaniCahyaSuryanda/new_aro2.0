import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CInputCheckbox,
  CLabel,
  CSelect,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import AccountAdd from "../../../gl/params/lang/id/accountaddcreate.json";

// export default class Tambahjurnalakun extends React.Component {

const AccAdd = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const [items, setItems] = useState(null);
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);

  const onSubmit = (data) => {
    setModal(true);
    setItems(data);
    // alert(JSON.stringify(data));
  };
  const [toasts, setToasts] = useState(false);
  const simpanData = () => {
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
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(AccountAdd[0].message_success);
          setModal(false);
          setItems(null);
          reset();
          setToasts(AccountAdd[0].message_success);
          setTimeout(() => {
            setToasts(null);
            setMessage(null);
            setMessType(null);
          }, 5000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setToasts(res.data.errdescription);
          setModal(false);
          setTimeout(() => {
            setToasts(null);
            setMessage(null);
            setMessType(null);
          }, 5000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Akunadd = AccountAdd.map((itemAccCreate) => (
    <CCard>
      <CCardHeader>{itemAccCreate.form}</CCardHeader>
      <CCardBody>
        <CForm
          encType="multipart/form-data"
          className="form-horizontal"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CRow>
            <CCol xs="12" md="6" xl="5">
              <CFormGroup row>
                <CCol>
                  <CLabel htmlFor="text-input">{itemAccCreate.accno}</CLabel>
                </CCol>
                <CCol xs="12" xl="9">
                  <input
                    className="form-control"
                    defaultValue=""
                    id="accno"
                    name="accno"
                    ref={register}
                  />
                </CCol>
              </CFormGroup>
            </CCol>

            <CCol xs="12" md="6" xl="7">
              <CFormGroup row>
                <CCol>
                  <CLabel htmlFor="text-input">{itemAccCreate.accname}</CLabel>
                </CCol>
                <CCol xs="12" xl="9">
                  <input
                    className="form-control"
                    defaultValue=""
                    id="accname"
                    name="accname"
                    ref={register}
                  />
                </CCol>
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12" md="6" xl="5">
              <CFormGroup row>
                <CCol>
                  <CLabel htmlFor="select">{itemAccCreate.acctype}</CLabel>
                </CCol>
                <CCol xs="12" xl="9">
                  <select
                    className="form-control"
                    custom
                    name="acctype"
                    id="acctype"
                    ref={register}
                  >
                    <option value="0">{itemAccCreate.acctype_0}</option>
                    <option value="1">{itemAccCreate.acctype_1}</option>
                  </select>
                </CCol>
              </CFormGroup>
            </CCol>

            <CCol xs="12" md="6" xl="7">
              <CFormGroup row>
                <CCol>
                  <CLabel htmlFor="select">
                    {itemAccCreate.list_normaldebit}
                  </CLabel>
                </CCol>
                <CCol xs="12" xl="9">
                  <CFormGroup variant="custom-checkbox" inline>
                    <Controller
                      name="normaldebit"
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
                    {itemAccCreate.description}
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

          <CRow>
            <CCol xs="12" md="6" xl="5">
              <CFormGroup row>
                <CCol>
                  <CLabel htmlFor="select">{itemAccCreate.isactive}</CLabel>
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
          <hr></hr>
          {/* <CButton type="submit">Test Simpan</CButton> */}
          <CButton type="reset" size={35} color="danger">
            <CIcon name="cil-scrubber" /> {itemAccCreate.cancel_button}
          </CButton>
          <CButton
            type="submit"
            className={"float-right"}
            size={35}
            color="primary"
          >
            <CIcon name="cil-save" /> {itemAccCreate.save_button}
          </CButton>
        </CForm>
      </CCardBody>

      <CModal show={modal} onClose={setModal}>
        <CModalBody>
          <h3>{itemAccCreate.confirm_save}</h3>
        </CModalBody>
        <CModalFooter>
          <CButton type="submit" onClick={() => simpanData()} color="primary">
            {itemAccCreate.confirm_yes}
          </CButton>{" "}
          <CButton color="danger" onClick={() => setModal(false)}>
            {itemAccCreate.confirm_no}
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
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
      <CRow>
        <CCol xl="12">{Akunadd}</CCol>
      </CRow>

      {toasts && (
        <CRow>
          <CCol xl="6">
            <CToaster position="bottom-right">
              <CToastHeader>
                <h6>{toasts}</h6>
              </CToastHeader>
            </CToaster>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default AccAdd;
