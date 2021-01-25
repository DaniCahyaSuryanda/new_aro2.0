import JsonjurnalEdit from "../../../gl/params/lang/id/journaltypeeditcreate.json";
import CIcon from "@coreui/icons-react";
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
  CCollapse,
  CSelect,
  CModalBody,
  CModalFooter,
  CRow,
  CTextarea,
  CForm,
  CAlert,
  CToaster,
  CToastHeader,
  CToast,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const fields = [
  "Edit_Jurnal",
  { key: "jrtype", label: JsonjurnalEdit[0].list_jrtype },
  { key: "description", label: JsonjurnalEdit[0].list_description },
  { key: "isactive", label: JsonjurnalEdit[0].list_isactive },
  ,
];

const JJEditCreate = () => {
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  const [dataPengkinian, setdataPengkinian] = useState(null);
  const { handleSubmit, register, reset, control } = useForm();
  const [dataSend, setDataSend] = useState(null);
  const [slide, setSlide] = useState(true);
  const [toasts, setToasts] = useState("");

  useEffect(() => {
    if (dataPengkinian == null) {
      getDataAddValidasi();
    }
  }, [dataPengkinian]);

  const toggleDetails = (item) => {
    // console.log(item)
    setItems(item);
    setSlide(false);
  };

  const toggleDetails2 = (item) => {
    // console.log(item)
    setSlide(true);
    setItems(false);
  };

  const getDataAddValidasi = () => {
    axios
      .get(`${global.config.API_URL}/gl/params/journaltype/list`)
      .then((res) => {
        setdataPengkinian(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    // alert(JSON.stringify(data))
    // console.log(data)
    setModal(true);
    setDataSend(data);
    // console.log(dataSend)
  };

  const setujuUbah = (jrtype) => {
    //   // console.log(jrtype);
    let data = {
      jrtype: dataSend.jrtype,
      description: dataSend.description,
      isactive: dataSend.isactive,
      validstate: 0,
    };
    axios
      .post(`${global.config.API_URL}gl/params/journaltype/edit/create`, data)
      .then((res) => {
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(JsonjurnalEdit[0].message_success);
          setModal(false);
          setSlide(true);
          getDataAddValidasi();
          setItems(null);
          setToasts(JsonjurnalEdit[0].message_success);
          setTimeout(() => {
            setToasts(null);
            setMessage(null);
          }, 5000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setModal(false);
          setSlide(true);
          setItems(null);
          setToasts(res.data.errdescription);
          setTimeout(() => {
            setToasts(null);
            setMessage(null);
          }, 5000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const tolakOtoritasi = (trxid) => {
  //   console.log(trxid);
  //   let data = {
  //     "trxid" : trxid,
  //     "validstate" : 2,
  //   }
  //   axios.post(`${global.config.API_URL}gl/params/journaltype/edit/validation`,data)
  //     .then(res => {
  //       // console.log(res);
  //       console.log('tes',res.data);
  //       if(res.data.rescode === 0){
  //         setMessType('success')
  //         setMessage('Data dengan Transaksi id '+ trxid +' berhasil di tolak')
  //         setModal(false)
  //         setSlide(true)
  //         getDataAddValidasi()
  //         setItems(null)
  //         setTimeout(()=>{
  //           setMessType(null)
  //           setMessage(null)
  //         }, 5000)
  //       }else{
  //         setMessType('danger')
  //         setMessage(res.data.errdescription)
  //         setModal(false)
  //       }
  //   })
  // }

  const JrtypeEdit = JsonjurnalEdit.map((itemJrEdit) => (
    <>
      {slide && (
        <CCard>
          <CCardHeader>
            {itemJrEdit.list_caption}
            <CButton
              size="sm"
              color="danger"
              className="mr-3"
              style={{ float: "right" }}
            >
              <CIcon name="cil-scrubber" /> {itemJrEdit.list_refresh}
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={dataPengkinian}
              fields={fields}
              hover
              striped
              bordered
              columnFilter
              itemsPerPage={10}
              pagination
              scopedSlots={{
                Edit_Jurnal: (items, index) => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          toggleDetails(items);
                        }}
                      >
                        {itemJrEdit.list_new}
                      </CButton>
                    </td>
                  );
                },
                isactive: (item) =>
                  item.isactive ? (
                    <td>
                      <CBadge color={"success"}>
                        <CIcon size={"lg"} name={"cilCheck"} />
                      </CBadge>
                    </td>
                  ) : (
                    <td>
                      <CBadge color={"warning"}>
                        <p
                          style={{
                            fontSize: "1.25rem",
                            width: "1.25rem",
                            height: "1.25rem",
                            color: "#fff",
                            margin: "0px",
                            padding: "0px",
                          }}
                        >
                          i
                        </p>
                      </CBadge>
                    </td>
                  ),
              }}
            />
          </CCardBody>
        </CCard>
      )}
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
        <CCol xs="12" lg="12">
          {JrtypeEdit}
        </CCol>
      </CRow>
      {items && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h6>{JsonjurnalEdit[0].detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                  color="light"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <CRow>
                    <CCol xs="12" md="6" xl="6">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {JsonjurnalEdit[0].jrtype}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <input
                            className="form-control"
                            readOnly
                            id="jrtype"
                            name="jrtype"
                            ref={register}
                            defaultValue={items.jrtype}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" md="6" xl="6">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsonjurnalEdit[0].list_isactive}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="10">
                          <CFormGroup variant="custom-checkbox" inline>
                            <Controller
                              name="isactive"
                              control={control}
                              defaultValue={items.isactive}
                              value="true"
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
                    <CCol xs="12" xl="12">
                      <CFormGroup row>
                        <CCol md="2">
                          <CLabel htmlFor="textarea-input">
                            {JsonjurnalEdit[0].list_description}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="12">
                          <textarea
                            className="form-control"
                            name="description"
                            rows="4"
                            ref={register}
                          >
                            {items.description}
                          </textarea>
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <hr />
                  <CButton
                    size="sm"
                    color="warning"
                    onClick={() => toggleDetails2(items)}
                    className="mr-3"
                  >
                    <CIcon name="cil-chevron-left" /> {JsonjurnalEdit[0].hide}
                  </CButton>
                  <CButton
                    size="sm"
                    type="submit"
                    style={{ float: "right" }}
                    color="primary"
                  >
                    <CIcon name="cil-save" /> {JsonjurnalEdit[0].save_button}
                  </CButton>
                </CForm>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{JsonjurnalEdit[0].confirm_save}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => setujuUbah(items.jrtype)}
                  >
                    {JsonjurnalEdit[0].confirm_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {JsonjurnalEdit[0].confirm_no}
                  </CButton>
                </CModalFooter>
              </CModal>
              {/* 
          <CModal
            show={modal_no}
            onClose={setModal2}
          >
            <CModalBody>
              <h4>{JsonjurnalEdit[0].confirm_reject}</h4>
            </CModalBody>
            <CModalFooter>
              <CButton type="submit" onClick={() => tolakOtoritasi(items.trxid)} color="primary">{JsonjurnalEdit[0].confirm_reject_yes}</CButton>{' '}
                <CButton
                  color="danger"
                  onClick={() => setModal2(false)}
                >{JsonjurnalEdit[0].confirm_reject_no}</CButton>
            </CModalFooter>
          </CModal> */}
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};
export default JJEditCreate;
