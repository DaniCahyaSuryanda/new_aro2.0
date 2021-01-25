import React, { useState, useEffect } from "react";
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
  CDataTable,
  CBadge,
} from "@coreui/react";
import axios from "axios";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { useForm, Controller } from "react-hook-form";
import JurnalAddValidasi from "../../../gl/transaction/lang/id/journaladdvalidation.json";
// import { cilColorBorder } from '@coreui/icons'

const fields = [
  JurnalAddValidasi.list_new,
  { key: "trxid", label: JurnalAddValidasi.trxid },
  { key: "journaldate", label: JurnalAddValidasi.journaldate },
  { key: "journaltype", label: JurnalAddValidasi.journaltype },
  { key: "reffid", label: JurnalAddValidasi.reffid },
  { key: "description", label: JurnalAddValidasi.description },
];

const fieldsDetail = [
  { key: "accno", label: JurnalAddValidasi.detailitem_accno },
  { key: "accname", label: JurnalAddValidasi.detailitem_accname },
  {
    key: "description",
    label: JurnalAddValidasi.detailitem_description,
  },
  { key: "debit", label: JurnalAddValidasi.detailitem_debit },
  { key: "credit", label: JurnalAddValidasi.detailitem_credit },
];

const JenisJurnalAdd = () => {
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [dataAkun, setDataAkun] = useState([]);
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [jurnal, setJurnal] = useState(null);
  const [items, setItems] = useState(null);

  const [slide, setSlide] = useState(true);

  // const onSubmit = (data) => {
  //   // alert(JSON.stringify(data))
  //   let detail = [];
  //   dataAkun.map((row) => {
  //     detail.push({
  //       accno: row.detailitem_accno,
  //       accname: row.detailitem_accname,
  //       description: row.detailitem_description,
  //       debit: row.detailitem_debit,
  //       credit: row.detailitem_credit,
  //       branchid: "",
  //     });
  //   });
  //   let sendData = {
  //     journaldate: data.journaldate,
  //     journaltype: data.journaltype,
  //     reffid: data.reffid,
  //     description: data.description,
  //     detail: detail,
  //     validstate: 1,
  //     lang: "id",
  //   };
  //   setDataSend(sendData);
  //   setModal(true);
  // };

  const [accNo, setDataAccountStructure] = useState(null);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (accNo == null) {
      // getDataJurnal();
      SetDataJurnal();
      // console.log(data)
    }
  }, [accNo]);

  const SetDataJurnal = () => {
    axios
      .get(`${global.config.API_URL}gl/transaction/journal/add/list`)
      .then((res) => {
        setDataAccountStructure(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const toggleDetail = (item) => {
    // const position = details.indexOf(index)
    setItems(item);
    setSlide(false);
    axios
      .get(
        `${global.config.API_URL}gl/transaction/journal/add/load?trxid=${item.trxid}`
      )
      .then((res) => {
        console.log(res);
        // console.log(res.data.rescode);
        if (res.data.rescode == 0) {
          setDetails(res.data.data.detail);
          console.log(res.data.data.detail);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const setujuOtoritasi = (trxid) => {
    console.log(trxid);
    let data = {
      trxid: trxid,
      validstate: 1,
    };
    axios
      .post(
        `${global.config.API_URL}gl/transaction/journal/add/validation`,
        data
      )
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(
            "Jurnal dengan Transaksi id " + trxid + " berhasil di otorisasi"
          );
          setModal(false);
          setItems(null);
          setSlide(true);
          SetDataJurnal();
          setTimeout(() => {
            setMessType(null);
            setMessage(null);
          }, 5000);
        } else {
          setMessType("danger");
          window.scrollTo(0, 0);
          setMessage(res.data.errdescription);
          setModal(false);
        }
      });
  };

  const tolakOtoritasi = (trxid) => {
    console.log(trxid);
    let data = {
      trxid: trxid,
      validstate: 2,
    };
    axios
      .post(
        `${global.config.API_URL}gl/transaction/journal/add/validation`,
        data
      )
      .then((res) => {
        // console.log(res);
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(
            "Jurnal dengan Transaksi id " + trxid + " berhasil di tolak"
          );
          setModal(false);
          setItems(null);
          setSlide(true);
          setTimeout(() => {
            setMessType(null);
            setMessage(null);
          }, 5000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setModal(false);
        }
      });
  };

  // const saveDetail = (param) => {
  //   // alert(JSON.stringify(data))
  //   let data = [...dataAkun];
  //   let accname = accNo.find(({ accno }) => {
  //     return accno == param.detailitem_accno.value;
  //   });
  //   data.push({
  //     detailitem_debit: param.detailitem_debit,
  //     detailitem_description: param.detailitem_description,
  //     detailitem_accno: param.detailitem_accno.value,
  //     detailitem_accname: accname.accname,
  //     detailitem_credit: param.detailitem_credit,
  //   });
  //   reset2();
  //   setFormItem(false);
  //   SetDataJurnal(data);
  //   console.log(dataAkun);
  // };

  // const saveEditDetail = (param) => {
  //   let data = [...dataAkun];
  //   let accname = accNo.find(({ accno }) => {
  //     return accno == param.detailitem_accno.value;
  //   });
  //   data[indexEdit] = {
  //     detailitem_debit: param.detailitem_debit,
  //     detailitem_description: param.detailitem_description,
  //     detailitem_accno: param.detailitem_accno.value,
  //     detailitem_accname: accname.accname,
  //     detailitem_credit: param.detailitem_credit,
  //   };
  //   SetDataJurnal(data);
  //   reset3();
  //   setEditFormItem(false);
  // };

  // const tolakOtoritasi = (trxid) => {
  //   setMessType("success");
  //   setMessage("Data dengan No item id " + trxid + " berhasil di tolak");
  //   let data = [...accNo];
  //   var dataBaru = data.filter(function (data) {
  //     return data.trxid != trxid;
  //   });
  //   // setAccNo(dataBaru);
  //   setModal2(false);
  //   setSlide(true);
  //   setItems(null);
  //   setTimeout(() => {
  //     setMessType(null);
  //     setMessage(null);
  //   }, 5000);
  //   let data = [...dataJenisJurnal];
  //   var dataBaru =  data.filter(function(data) {
  //     return data.reportid != noitem;
  //   });
  //   setDataJenisJurnal(dataBaru)
  //   setModal2(false)
  //   setItems(null)
  //   setTimeout(()=>{
  //     setMessType(null)
  //     setMessage(null)
  //   }, 5000)

  //     console.log(trxid);
  //     let data = {
  //       "trxid" : trxid,
  //       "validstate" : 1,
  //    }
  //     axios.post(`${global.config.API_URL}gl/params/journaltype/add/validation`,data)
  //       .then(res => {
  //         // console.log(res);
  //         console.log('tes',res.data);
  //         if(res.data.rescode === 0){
  //           setMessType('success')
  //           setMessage('Data dengan Transaksi id '+ trxid +' berhasil di tolak')
  //           setModal(false)
  //           getDataEditValidasi()
  //           setItems(null)
  //           setTimeout(()=>{
  //             setMessType(null)
  //             setMessage(null)
  //           }, 5000)
  //         }else{
  //           setMessType('danger')
  //           setMessage(res.data.errdescription)
  //           setModal(false)
  //         }
  //   //   })
  // };

  const openModalTolak = () => {
    setModal2(true);
  };

  const closeSlide = () => {
    setItems(null);
    setSlide(true);
  };

  // const itemGroup = (e) => {
  //   console.log(e);
  //   setWithItemGroup(e);
  // };

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
                {JurnalAddValidasi.list_caption}
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => {
                    SetDataJurnal();
                  }}
                  className="mr-3"
                  className="float-right"
                >
                  <CIcon name="cil-scrubber" /> {JurnalAddValidasi.list_refresh}
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={accNo}
                  fields={fields}
                  hover
                  striped
                  bordered
                  size="sm"
                  itemsPerPage={10}
                  pagination
                  columnFilter
                  scopedSlots={{
                    Otorisasi: (items) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => toggleDetail(items)}
                          >
                            Otorisasi
                          </CButton>
                        </td>
                      );
                    },
                    // isactive: (item) =>
                    //   item.isactive ? (
                    //     <td>
                    //       <CBadge color={"success"}>
                    //         <CIcon size={"lg"} name={"cilCheck"} />
                    //       </CBadge>
                    //     </td>
                    //   ) : (
                    //     <td>
                    //       <CBadge color={"warning"}>
                    //         <p
                    //           style={{
                    //             fontSize: "1.25rem",
                    //             width: "1.25rem",
                    //             height: "1.25rem",
                    //             color: "#fff",
                    //             margin: "0px",
                    //             padding: "0px",
                    //           }}
                    //         >
                    //           i
                    //         </p>
                    //       </CBadge>
                    //     </td>
                    //   ),
                    // normaldebit: (item) =>
                    //   item.normaldebit ? (
                    //     <td>
                    //       <CBadge color={"success"}>
                    //         <CIcon size={"lg"} name={"cilCheck"} />
                    //       </CBadge>
                    //     </td>
                    //   ) : (
                    //     <td>
                    //       <CBadge color={"warning"}>
                    //         <p
                    //           style={{
                    //             fontSize: "1.25rem",
                    //             width: "1.25rem",
                    //             height: "1.25rem",
                    //             color: "#fff",
                    //             margin: "0px",
                    //             padding: "0px",
                    //           }}
                    //         >
                    //           i
                    //         </p>
                    //       </CBadge>
                    //     </td>
                    //   ),
                    // acctype: (item) =>
                    //   item.acctype == 0 ? (
                    //     <td> Akun Neraca </td>
                    //   ) : (
                    //     <td> Akun Non Neraca </td>
                    //   ),
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}

      {items && (
        <CCard color="light">
          <CRow>
            <CCol xl="12">
              <CCard>
                <CCardHeader>{JurnalAddValidasi.form}</CCardHeader>
                <CForm
                  encType="multipart/form-data"
                  // onSubmit={handleSubmit(onSubmit)}
                  className="form-horizontal"
                >
                  <CCardBody>
                    <CRow>
                      <CCol xs="12" md="6" xl="6">
                        <CFormGroup row>
                          <CCol>
                            <CLabel htmlFor="text-input">
                              {JurnalAddValidasi.journaldate}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" xl="9">
                            <input
                              defaultValue={items.journaldate}
                              readOnly
                              className="form-control"
                              id="journaldate"
                              name="journaldate"
                            />
                          </CCol>
                        </CFormGroup>
                      </CCol>

                      <CCol xs="12" md="6" xl="6">
                        <CFormGroup row>
                          <CCol>
                            <CLabel htmlFor="text-input">
                              {JurnalAddValidasi.reffid}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" xl="9">
                            <input
                              value={items.reffid}
                              readOnly
                              className="form-control"
                              id="reffid"
                              name="reffid"
                            />
                          </CCol>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" md="6" xl="6">
                        <CFormGroup row>
                          <CCol>
                            <CLabel htmlFor="select">
                              {JurnalAddValidasi.journaltype}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" xl="9">
                            <input
                              value={items.journaltype}
                              readOnly
                              className="form-control"
                              id="journaltype"
                              name="journaltype"
                            />
                            {/* <Controller
                                  name="journaltype"
                                  as={Select}
                                  options={ optionJurnal }
                                  control={control}
                                  defaultValue=""
                                  id="journaltype"
                              /> */}
                          </CCol>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" md="6" xl="6">
                        <CFormGroup row>
                          <CCol>
                            <CLabel htmlFor="select">
                              {JurnalAddValidasi.description}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" xl="9">
                            <textarea
                              readOnly
                              className="form-control"
                              name="description"
                              rows="4"
                              value={items.description}
                            ></textarea>
                          </CCol>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CDataTable
                          items={details}
                          fields={fieldsDetail}
                          hover
                          striped
                          bordered
                          columnFilter
                          itemsPerPage={5}
                          pagination
                          // scopedSlots={{
                          //   detailitem_isgeneral: (item) =>
                          //     item.detailitem_isgeneral ? (
                          //       <td>
                          //         <CBadge color={"success"}>
                          //           <CIcon size={"lg"} name={"cilCheck"} />
                          //         </CBadge>
                          //       </td>
                          //     ) : (
                          //       <td>
                          //         <CBadge color={"warning"}>
                          //           <p
                          //             style={{
                          //               width: "1.25rem",
                          //               height: "1.25rem",
                          //               color: "#fff",
                          //               margin: "0px",
                          //               padding: "0px",
                          //             }}
                          //           ></p>
                          //         </CBadge>
                          //       </td>
                          //     ),
                          //   detailitem_isvisible: (item) =>
                          //     item.detailitem_isvisible ? (
                          //       <td>
                          //         <CBadge color={"success"}>
                          //           <CIcon size={"lg"} name={"cilCheck"} />
                          //         </CBadge>
                          //       </td>
                          //     ) : (
                          //       <td>
                          //         <CBadge color={"warning"}>
                          //           <p
                          //             style={{
                          //               width: "1.25rem",
                          //               height: "1.25rem",
                          //               color: "#fff",
                          //               margin: "0px",
                          //               padding: "0px",
                          //             }}
                          //           ></p>
                          //         </CBadge>
                          //       </td>
                          //     ),
                          //   Aksi: (items, index) => {
                          //     return (
                          //       <td>
                          //         <div className="btn-group">
                          //           <CButton
                          //             color="primary"
                          //             variant="outline"
                          //             shape="square"
                          //             size="sm"
                          //             onClick={() => ubahItem(items, index)}
                          //           >
                          //             {JurnalAddValidasi.action_button_edit}
                          //           </CButton>
                          //           <CButton
                          //             color="danger"
                          //             variant="outline"
                          //             shape="square"
                          //             size="sm"
                          //             onClick={() => deleteItem(index)}
                          //           >
                          //             {JurnalAddValidasi.action_button_delete}
                          //           </CButton>
                          //         </div>
                          //       </td>
                          //     );
                          //   },
                          // }}
                        />
                      </CCol>
                    </CRow>
                  </CCardBody>
                  <CCardFooter>
                    <CButton
                      type="submit"
                      color="primary"
                      style={{ float: "right", margin: "10px" }}
                      onClick={() => setModal(true)}
                    >
                      <CIcon name="cil-check" /> {JurnalAddValidasi.otor_button}
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={() => openModalTolak()}
                      style={{ float: "right", margin: "10px" }}
                    >
                      <CIcon name="cil-x" /> {JurnalAddValidasi.reject_button}
                    </CButton>
                    <CButton color="warning" onClick={() => closeSlide()}>
                      <CIcon name="cil-chevron-left" />{" "}
                      {JurnalAddValidasi.cancel_button}
                    </CButton>
                  </CCardFooter>
                </CForm>

                <CModal show={modal} onClose={setModal}>
                  <CModalBody>
                    <h3>{JurnalAddValidasi.confirm_otor}</h3>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      type="submit"
                      onClick={() => setujuOtoritasi(items.trxid)}
                      color="primary"
                    >
                      {JurnalAddValidasi.confirm_otor_yes}
                    </CButton>{" "}
                    <CButton color="danger" onClick={() => setModal(false)}>
                      {JurnalAddValidasi.confirm_otor_no}
                    </CButton>
                  </CModalFooter>
                </CModal>
                <CModal show={modal_no} onClose={setModal2}>
                  <CModalBody>
                    <h4>{JurnalAddValidasi.confirm_reject}</h4>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      type="submit"
                      onClick={() => tolakOtoritasi(items.trxid)}
                      color="primary"
                    >
                      {JurnalAddValidasi.confirm_reject_yes}
                    </CButton>{" "}
                    <CButton color="danger" onClick={() => setModal2(false)}>
                      {JurnalAddValidasi.confirm_reject_no}
                    </CButton>
                  </CModalFooter>
                </CModal>
              </CCard>
            </CCol>
          </CRow>
        </CCard>
      )}
    </>
  );
};

export default JenisJurnalAdd;
