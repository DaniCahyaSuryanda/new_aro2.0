import CIcon from "@coreui/icons-react";
import { useForm, Controller } from "react-hook-form";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CBadge,
  CDataTable,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
  CTextarea,
  CForm,
  CAlert,
  CToaster,
  CToastHeader,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import JsonAddKantorValidasi from "json/lang/id/Menajemen Kantor/edit/manajemenkantoredit.json";
import Select from "react-select";

const fields = [
  JsonAddKantorValidasi.list_otor,
  { key: "office_code", label: JsonAddKantorValidasi.list_office_code },
  { key: "office_name", label: JsonAddKantorValidasi.list_office_name },
  { key: "office_type", label: JsonAddKantorValidasi.list_office_type },
  { key: "isactive", label: JsonAddKantorValidasi.list_isactive },
  { key: "address", label: JsonAddKantorValidasi.list_address },
  { key: "cp", label: JsonAddKantorValidasi.list_cp },
  { key: "phone_number", label: JsonAddKantorValidasi.list_phone_number },
  { key: "email", label: JsonAddKantorValidasi.list_email },
];

const data = [
  {
    // trxid: "t20292h95113850",
    office_code: "001",
    office_name: "Kantor DSI Surabaya",
    office_type: "Kantor Pusat",
    isactive: "true",
    address: "Jalan Raya Wiguna Selatan 36",
    cp: "081336748971",
    phone_number: "0312238348",
    email: "Dsi@gmail.com",
  },
  {
    // trxid: "a90292h95113859",
    office_code: "002",
    office_name: "Kantor Bri Surabaya",
    office_type: "Kantor Cabang",
    isactive: "true",
    address: "Jalan Raya Demak No 4",
    cp: "081338448971",
    phone_number: "0313578348",
    email: "bri@gmail.com",
  },
];

const Editoffice = () => {
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  const [dataAkun, setDataAkun] = useState(null);
  const [slide, setSlide] = useState(true);
  const [toasts, setToasts] = useState("");
  const { handleSubmit, register, reset, control } = useForm();

  useEffect(() => {
    if (dataAkun == null) {
      //  getDataEditValidasi();
    }
  }, [dataAkun]);

  const toggleDetails2 = (item) => {
    // console.log(item)
    setSlide(true);
    setItems(false);
  };

  const toggleDetails = (item) => {
    // console.log(item)
    setItems(item);
    setSlide(false);
  };
  //   const setujuOtoritasi = (trxid) => {
  //     console.log(trxid);
  //     let data = {
  //       trxid: trxid,
  //       validstate: 1,
  //     };
  //     axios
  //       .post(`${global.config.API_URL}gl/params/account/add/validation`, data)
  //       .then((res) => {
  //         // console.log(res);
  //         console.log("tes", res.data);
  //         if (res.data.rescode === 0) {
  //           setMessType("success");
  //           setMessage(JsonAddKantorValidasi.otor_success);
  //           setToasts(JsonAddKantorValidasi.otor_success);
  //           setModal(false);
  //           setSlide(true);
  //           getDataEditValidasi();
  //           setItems(null);

  //           setTimeout(() => {
  //             setToasts(null);
  //             setMessType(null);
  //             setMessage(null);
  //           }, 5000);
  //         } else {
  //           setMessType("danger");
  //           setMessage(res.data.errdescription);
  //           setToasts(res.data.errdescription);
  //           setModal(false);
  //           setTimeout(() => {
  //             setToasts(null);
  //             setMessType(null);
  //             setMessage(null);
  //           }, 5000);
  //         }
  //       });
  //   };

  //   const getDataEditValidasi = () => {
  //     axios
  //       .get(`${global.config.API_URL}gl/params/account/add/list`)
  //       .then((res) => {
  //         setDataAkun(res.data.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   const tolakOtoritasi = (trxid) => {
  //     console.log(trxid);
  //     let data = {
  //       trxid: trxid,
  //       validstate: 2,
  //     };
  //     axios
  //       .post(`${global.config.API_URL}gl/params/account/add/validation`, data)
  //       .then((res) => {
  //         // console.log(res);
  //         console.log("tes", res.data);
  //         if (res.data.rescode === 0) {
  //           setMessType("success");
  //           setMessage(JsonAddKantorValidasi.otor_reject);
  //           setToasts(JsonAddKantorValidasi.otor_reject);
  //           setModal(false);
  //           setSlide(true);
  //           getDataEditValidasi();
  //           setItems(null);
  //           setTimeout(() => {
  //             setToasts(null);
  //             setMessType(null);
  //             setMessage(null);
  //           }, 5000);
  //         } else {
  //           setMessType("danger");
  //           setMessage(res.data.errdescription);
  //           setToasts(res.data.errdescription);
  //           setModal(false);
  //           setTimeout(() => {
  //             setToasts(null);
  //             setMessType(null);
  //             setMessage(null);
  //           }, 5000);
  //         }
  //       });
  //   };

  return (
    <>
      {message && (
        <CRow>
          <CCol>
            <CAlert color={messType}>{message}</CAlert>
          </CCol>
        </CRow>
      )}

      {slide && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                {/* {JsonAddKantorValidasi.title} */}
                Pengkinian Kantor
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    //  getDataEditValidasi();
                  }}
                  className="mr-3"
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-scrubber" />{" "}
                  {JsonAddKantorValidasi.list_refresh}
                </CButton>
              </CCardHeader>
              <CCardBody>
              <CDataTable
                    fields={fields}
                    itemsPerPageSelect
                    itemsPerPage={10}
                    columnFilter
                    sorter
                    hover
                    size={"md"}
                    pagination
                    tableFilter
                    cleaner
                  />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
      {toasts && (
        <CRow>
          <CCol xl="8">
            <CToaster position="bottom-right">
              <CToastHeader>
                <h6>{toasts}</h6>
              </CToastHeader>
            </CToaster>
          </CCol>
        </CRow>
      )}

      {items && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h6>{JsonAddKantorValidasi.title}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <p className="text-muted">
                  {JsonAddKantorValidasi.trxid} : {items.trxid}{" "}
                </p>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                  color="light"
                >
                  <CRow>
                    <CCol lg="6">
                      <CFormGroup row>
                        <CCol xl="12">
                          <CLabel htmlFor="text-input">
                            {JsonAddKantorValidasi.office_code}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
                          <input
                            type="text"
                            className="form-control"
                            id="office_code"
                            name="office_code"
                            value={items.office_code}
                            ref={register}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                    <CCol lg="6">
                      <CFormGroup row>
                        <CCol xl="12">
                          <CLabel htmlFor="text-input">
                            {JsonAddKantorValidasi.office_name}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
                          <input
                            type="text"
                            className="form-control"
                            id="office_name"
                            name="office_name"
                            value={items.office_name}
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
                            {JsonAddKantorValidasi.office_type}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
                          <Controller
                            name="office_type"
                            control={control}
                            // defaultValue={items.office_type}
                            defaultValue={""}
                            render={(props) => (
                              <Select
                                custom
                                name="office_type"
                                id="office_type"
                                onChange={(e) => props.onChange(e.target.value)}
                              >
                                {JsonAddKantorValidasi[0].office_type_list.map(
                                  (data) =>
                                    items.office_type == data.value ? (
                                      <option value={data.value} selected>
                                        {" "}
                                        {data.title}{" "}
                                      </option>
                                    ) : (
                                      <option value={data.value}>
                                        {" "}
                                        {data.title}
                                      </option>
                                    )
                                )}
                              </Select>
                            )}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                    <CCol lg="6">
                      <CFormGroup row>
                        <CCol xl="12">
                          <CLabel htmlFor="text-input">
                            {JsonAddKantorValidasi.isactive}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
                          <CFormGroup variant="custom-checkbox" inline>
                            <CInputCheckbox
                              custom
                              id="inline-checkbox1"
                              name="isactive"
                              value="true"
                              checked
                            />
                            <CLabel
                              variant="custom-checkbox"
                              htmlFor="inline-checkbox1"
                            ></CLabel>
                            {/* {items.isactive === true ? (
                              <CInputCheckbox
                                custom
                                id="isactive"
                                name="isactive"
                                value="true"
                                disabled
                                checked
                              />
                            ) : (
                              <CInputCheckbox
                                custom
                                id="isactive"
                                name="isactive"
                                value="false"
                                disabled
                              />
                            )} */}
                            <CLabel
                              variant="custom-checkbox"
                              htmlFor="isactive"
                            ></CLabel>
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
                            {JsonAddKantorValidasi.address}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={items.address}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                    <CCol lg="6">
                      <CFormGroup row>
                        <CCol xl="12">
                          <CLabel htmlFor="text-input">
                            {JsonAddKantorValidasi.cp}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
                          <input
                            type="text"
                            className="form-control"
                            id="cp"
                            name="cp"
                            value={items.cp}
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
                            {JsonAddKantorValidasi.phone_number}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
                          <input
                            type="text"
                            className="form-control"
                            id="phone_number"
                            name="phone_number"
                            value={items.phone_number}
                            ref={register}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                    <CCol lg="6">
                      <CFormGroup row>
                        <CCol xl="12">
                          <CLabel htmlFor="text-input">
                            {JsonAddKantorValidasi.email}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={items.email}
                            ref={register}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CForm>
                <CButton
                  onClick={() => setModal(!modal)}
                  size="sm"
                  color="primary"
                  style={{ float: "right" }}
                >
                  <CIcon name="cil-check" /> {JsonAddKantorValidasi.otor_button}
                </CButton>
                <CButton
                  onClick={() => setModal2(!modal_no)}
                  size="sm"
                  color="danger"
                  style={{ float: "right" }}
                  className="mr-3"
                >
                  <CIcon name="cil-ban" /> {JsonAddKantorValidasi.reject_button}
                </CButton>
                <CButton
                  onClick={() => toggleDetails2(items)}
                  size="sm"
                  color="warning"
                >
                  <CIcon name="cil-chevron-left" /> {JsonAddKantorValidasi.hide}
                </CButton>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{JsonAddKantorValidasi.confirm_otor}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    // onClick={() => setujuOtoritasi(items.trxid)}
                  >
                    {JsonAddKantorValidasi.confirm_otor_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {JsonAddKantorValidasi.confirm_otor_no}
                  </CButton>
                </CModalFooter>
              </CModal>

              <CModal show={modal_no} onClose={setModal2}>
                <CModalBody>
                  <h4>{JsonAddKantorValidasi.confirm_reject}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    //  onClick={() => tolakOtoritasi(items.trxid)}
                    color="primary"
                  >
                    {JsonAddKantorValidasi.confirm_reject_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal2(false)}>
                    {JsonAddKantorValidasi.confirm_reject_no}
                  </CButton>
                </CModalFooter>
              </CModal>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default Editoffice;
