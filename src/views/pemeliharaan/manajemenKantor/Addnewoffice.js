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
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import JsonAddKantor from "componenJson/manajemenperan/lang/id/manajemenkantoradd.json";
import Select from "react-select";
const jenisKantor = [
  {
    id: "kpus",
    name: "Kantor Pusat",
  },
  {
    id: "kcab",
    name: "Kantor Cabang",
  },
];

const Addnewoffice = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const [items, setItems] = useState(null);
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [toasts, setToasts] = useState("");
  const [cabang, setCabang] = useState(null);

  useEffect(() => {
    if (cabang == null) {
      SetKantorCab();
    }
  }, [cabang]);

  const SetKantorCab = () => {
    let datakantor = [];
    jenisKantor.map((row) => {
      datakantor.push({
        value: row.id,
        label: row.name,
      });
      setCabang(datakantor);
    });
  };

  //   const onSubmit = (data) => {
  //     setModal(true);
  //     setItems(data);
  //     // alert(JSON.stringify(data));
  //   };
  //   let messagesuccess = JurnalTypeAdd[0].message_success;
  //   const simpanData = () => {
  //     let data = {
  //       jrtype: items.jrtype,
  //       isactive: items.isactive,
  //       description: items.description,
  //       validstate: 0,
  //     };
  //     axios
  //       .post(`${global.config.API_URL}gl/params/journaltype/add/create`, data)
  //       .then((res) => {
  //         console.log("tes", res.data);
  //         if (res.data.rescode === 0) {
  //           setMessType("success");
  //           setMessage(messagesuccess);
  //           setModal(false);
  //           setItems(null);
  //           reset();
  //           setToasts(messagesuccess);
  //           setTimeout(() => {
  //             setToasts(null);
  //             setMessage(null);
  //           }, 4000);
  //         } else {
  //           setMessType("danger");
  //           setMessage(res.data.errdescription);
  //           setModal(false);
  //           setToasts(res.data.errdescription);
  //           setTimeout(() => {
  //             setToasts(null);
  //             setMessage(null);
  //           }, 4000);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };
  const onSubmit = (data) => {
    setModal(true);
    setItems(data);
    alert(JSON.stringify(data));
  };

  const simpanData = () => {
    let data = {
      office_code: items.office_code,
      office_name: items.office_name,
      // acctype: parseInt(items.acctype),
      office_type: items.office_type,
      isactive: items.isactive,
      address: items.address,
      cp: items.cp,
      phone_number: items.phone_number,
      email: items.email,
      validstate: 0,
    };
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>{JsonAddKantor.title}</CCardHeader>
            <CCardBody>
              <CForm
                encType="multipart/form-data"
                className="form-horizontal"
                onSubmit={handleSubmit(onSubmit)}
              >
                <CRow>
                  <CCol lg="6">
                    <CFormGroup row>
                      <CCol xl="12">
                        <CLabel htmlFor="text-input">
                          {JsonAddKantor.office_code}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="12">
                        <input
                          type="text"
                          className="form-control"
                          id="office_code"
                          name="office_code"
                          ref={register}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <CCol lg="6">
                    <CFormGroup row>
                      <CCol xl="12">
                        <CLabel htmlFor="text-input">
                          {JsonAddKantor.office_name}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="12">
                        <input
                          type="text"
                          className="form-control"
                          id="office_name"
                          name="office_name"
                          ref={register}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol lg="6">
                    <CFormGroup row>
                      <CCol>
                        <CLabel htmlFor="select">
                          {JsonAddKantor.office_type}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="12">
                        <Controller
                          control={control}
                          options={cabang}
                          name="office_type"
                          defaultValue={""}
                          id="office_type"
                          as={Select}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>

                  <CCol lg="6">
                    <CFormGroup row>
                      <CCol>
                        <CLabel htmlFor="select">
                          {JsonAddKantor.isactive}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="12">
                        <CFormGroup variant="custom-checkbox" inline>
                          <Controller
                            name="isactive"
                            control={control}
                            value={true}
                            defaultValue={true}
                            render={(props) => (
                              <CInputCheckbox
                                onChange={(e) =>
                                  props.onChange(e.target.checked)
                                }
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
                  <CCol lg="6">
                    <CFormGroup row>
                      <CCol xl="12">
                        <CLabel htmlFor="text-input">
                          {JsonAddKantor.address}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="12">
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          ref={register}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <CCol lg="6">
                    <CFormGroup row>
                      <CCol xl="12">
                        <CLabel htmlFor="text-input">{JsonAddKantor.cp}</CLabel>
                      </CCol>
                      <CCol xs="12" xl="12">
                        <input
                          type="text"
                          className="form-control"
                          id="cp"
                          name="cp"
                          ref={register}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol lg="6">
                    <CFormGroup row>
                      <CCol xl="12">
                        <CLabel htmlFor="text-input">
                          {JsonAddKantor.phone_number}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="12">
                        <input
                          type="text"
                          className="form-control"
                          id="phone_number"
                          name="phone_number"
                          ref={register}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <CCol lg="6">
                    <CFormGroup row>
                      <CCol xl="12">
                        <CLabel htmlFor="text-input">
                          {JsonAddKantor.email}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" xl="12">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          ref={register}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>

                <hr></hr>
                {/* <CButton type="submit">Test Simpan</CButton> */}
                <CButton
                  type="reset"
                  size={35}
                  color="danger"
                  onClick={() => reset()}
                >
                  <CIcon name="cil-scrubber" /> {JsonAddKantor.cancel_button}
                </CButton>
                <CButton
                  type="submit"
                  className={"float-right"}
                  size={35}
                  color="primary"
                  //  onClick={() => setModal(true)}
                >
                  <CIcon name="cil-save" /> {JsonAddKantor.save_button}
                </CButton>
              </CForm>
            </CCardBody>

            <CModal show={modal} onClose={setModal}>
              <CModalBody>
                <h3>{JsonAddKantor.confirm_save}</h3>
              </CModalBody>
              <CModalFooter>
                <CButton
                  type="submit"
                  onClick={() => simpanData()}
                  color="primary"
                >
                  {JsonAddKantor.confirm_yes}
                </CButton>{" "}
                <CButton color="danger" onClick={() => setModal(false)}>
                  {JsonAddKantor.confirm_no}
                </CButton>
              </CModalFooter>
            </CModal>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Addnewoffice;
