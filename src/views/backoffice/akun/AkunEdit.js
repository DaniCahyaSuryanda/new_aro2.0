import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
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
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
// import JsonAccEdit from '../../../gl/params/lang/id/accounteditvalidation.json'
// import usersData from '../../users/DataAkun'
import JsonAccEdit from "../../../gl/params/lang/id/accounteditcreate.json";

const fields = [
  "Edit_Akun",
  { key: "accno", label: JsonAccEdit[0].list_accno },
  { key: "accname", label: JsonAccEdit[0].list_accname },
  { key: "acctype", label: JsonAccEdit[0].list_acctype },
  { key: "normaldebit", label: JsonAccEdit[0].list_normaldebit },
  { key: "description", label: JsonAccEdit[0].list_description },
  { key: "isactive", label: JsonAccEdit[0].list_isactive },
];

const AccountEdit = () => {
  const [messType, setMessType] = useState("");
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modal_no, setModal2] = useState(false);
  const [items, setItems] = useState(null);
  const [dataAkun, setDataAkun] = useState(null);
  const { handleSubmit, register, reset, control } = useForm();
  const [dataSend, setDataSend] = useState(null);
  const [slide, setSlide] = useState(true);
  const [toasts, setToasts] = useState("");

  useEffect(() => {
    if (dataAkun == null) {
      getDataAddValidasi();
    }
  }, [dataAkun]);

  const getDataAddValidasi = () => {
    axios
      .get(`${global.config.API_URL}gl/params/account/list`)
      .then((res) => {
        setDataAkun(res.data.data);
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

  const setujuUbah = (accno) => {
    //   // console.log(accno);
    let data = {
      accno: dataSend.accno,
      accname: dataSend.accname,
      acctype: parseInt(dataSend.acctype),
      normaldebit: dataSend.normaldebit,
      description: dataSend.description,
      isactive: dataSend.isactive,
      validstate: 0,
    };
    axios
      .post(`${global.config.API_URL}gl/params/account/edit/create`, data)
      .then((res) => {
        console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setMessType("success");
          setMessage(JsonAccEdit[0].message_success);
          setModal(false);
          setSlide(true);
          getDataAddValidasi();
          setItems(null);
          setToasts(JsonAccEdit[0].message_success);
          setTimeout(() => {
            setMessage(null);
            setMessType(null);
            setToasts(null);
          }, 5000);
        } else {
          setMessType("danger");
          setMessage(res.data.errdescription);
          setToasts(res.data.errdescription);
          setModal(false);
          setTimeout(() => {
            setMessage(null);
            setMessType(null);
            setToasts(null);
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
  //   axios.post(`${global.config.API_URL}gl/params/account/edit/validation`,data)
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

  const toggleDetails = (item) => {
    setItems(item);
    setSlide(false);
  };

  const toggleDetails2 = (item) => {
    setItems(false);
    setSlide(true);
  };

  const AccEdit = JsonAccEdit.map((itemAccEdit) => (
    <>
      {slide && (
        <CCard>
          <CCardHeader>
            {itemAccEdit.list_caption}
            <CButton
              size="sm"
              color="danger"
              className="mr-3"
              style={{ float: "right" }}
            >
              <CIcon name="cil-scrubber" /> {itemAccEdit.list_refresh}
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={dataAkun}
              fields={fields}
              hover
              striped
              bordered
              columnFilter
              itemsPerPage={10}
              pagination
              scopedSlots={{
                Edit_Akun: (items, index) => {
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
                        {itemAccEdit.list_new}
                      </CButton>
                    </td>
                  );
                },
                normaldebit: (item) =>
                  item.normaldebit ? (
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
                acctype: (item) =>
                  item.acctype == 0 ? (
                    <td> {JsonAccEdit[0].acctype_0} </td>
                  ) : (
                    <td> {JsonAccEdit[0].acctype_0} </td>
                  ),
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
                <h6>{JsonAccEdit[0].detail_caption}</h6>
              </CCardHeader>
              <CCardBody className="mb-4">
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                  color="light"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <CRow>
                    <CCol xs="12" md="6" xl="5">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="text-input">
                            {JsonAccEdit[0].accno}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <input
                            className="form-control"
                            readOnly
                            id="accno"
                            name="accno"
                            ref={register}
                            defaultValue={items.accno}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6" xl="7">
                      <CFormGroup row>
                        <CCol>
                          <CLabel>{JsonAccEdit[0].accname}</CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <input
                            type="text"
                            id="accname"
                            className="form-control"
                            name="accname"
                            ref={register}
                            defaultValue={items.accname}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="12" md="6" xl="5">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsonAccEdit[0].acctype}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <Controller
                            name="acctype"
                            control={control}
                            // defaultValue={items.acctype}
                            defaultValue={"0"}
                            render={(props) => (
                              <CSelect
                                custom
                                name="acctype"
                                id="acctype"
                                onChange={(e) => props.onChange(e.target.value)}
                              >
                                {JsonAccEdit[0].acctype_list.map((data) =>
                                  items.acctype == data.value ? (
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
                              </CSelect>
                            )}
                          />
                        </CCol>
                      </CFormGroup>
                    </CCol>

                    <CCol xs="12" md="6" xl="7">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsonAccEdit[0].rmaldebit}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" xl="9">
                          <CFormGroup inline>
                            <Controller
                              name="normaldebit"
                              control={control}
                              defaultValue={items.normaldebit}
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
                            {JsonAccEdit[0].list_description}
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

                  <CRow>
                    <CCol xs="12" md="6" xl="5">
                      <CFormGroup row>
                        <CCol>
                          <CLabel htmlFor="select">
                            {JsonAccEdit[0].list_isactive}
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
                  <hr></hr>
                  {/* <CButton size="sm" color="danger" onClick={() => toggleDetails2(items)} className="mr-3"><CIcon name="cil-scrubber" /> {JsonAccEdit[0].cancel_button}</CButton> */}
                  <CButton
                    size="sm"
                    type="submit"
                    className="float-right"
                    color="primary"
                  >
                    <CIcon name="cil-save" /> {JsonAccEdit[0].save_button}
                  </CButton>
                  <CButton
                    size="sm"
                    onClick={() => toggleDetails2(items)}
                    color="warning"
                    className="float-left"
                  >
                    <CIcon name="cil-chevron-left" /> {JsonAccEdit[0].hide}
                  </CButton>
                </CForm>
              </CCardBody>
              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h4>{JsonAccEdit[0].confirm_save}</h4>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => setujuUbah(items.accno)}
                  >
                    {JsonAccEdit[0].confirm_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {JsonAccEdit[0].confirm_no}
                  </CButton>
                </CModalFooter>
              </CModal>

              {/* <CModal
            show={modal_no}
            onClose={setModal2}
          >
            <CModalBody>
              <h4>{JsonAccEdit[0].confirm_reject}</h4>
            </CModalBody>
            <CModalFooter>
              <CButton type="submit" onClick={() => tolakOtoritasi(items.trxid)} color="primary">{JsonAccEdit[0].confirm_reject_yes}</CButton>{' '}
                <CButton
                  color="danger"
                  onClick={() => setModal2(false)}
                >{JsonAccEdit[0].confirm_reject_no}</CButton>
            </CModalFooter>
          </CModal> */}
            </CCard>
          </CCol>
        </CRow>
      )}
      <CRow>
        <CCol xs="12" lg="12">
          {AccEdit}
        </CCol>
      </CRow>
      {/* { items && (
      <CRow>
      <CCol>
      <CCard>
        <CCardHeader>
          <h6>
            {JsonAccEdit[0].detail_caption}
          </h6>
        </CCardHeader>
        <CCardBody className="mb-4">
          <CForm encType="multipart/form-data" className="form-horizontal" color="light" onSubmit={handleSubmit(onSubmit)}>
          <CRow>
              <CCol xs="12" md="6" xl="5">
                  <CFormGroup row>
                  <CCol>
                      <CLabel htmlFor="text-input">{JsonAccEdit[0].accno}</CLabel>
                    </CCol>
                    <CCol xs="12" xl="9">
                        <input className="form-control" readOnly id="accno" name="accno" ref={register} defaultValue={items.accno}/>
                    </CCol>
                  </CFormGroup>
              </CCol>

              <CCol xs="12" md="6" xl="7">
                <CFormGroup row>
                  <CCol>
                      <CLabel>{JsonAccEdit[0].accname}</CLabel>
                    </CCol>
                    <CCol xs="12" xl="9">
                        <input type="text" id="accname" className="form-control" name="accname" ref={register} defaultValue={items.accname}/>
                    </CCol>
                  </CFormGroup>
              </CCol>

          </CRow>

          <CRow>
              <CCol xs="12" md="6" xl="5">
                  <CFormGroup row>
                    <CCol>
                      <CLabel htmlFor="select">{JsonAccEdit[0].acctype}</CLabel>
                    </CCol>
                    <CCol xs="12" xl="9">
                      <Controller
                          name="acctype"
                          control={control}
                          // defaultValue={items.acctype}
                          defaultValue={"0"}
                          render={props =>(
                            <CSelect custom name="acctype" id="acctype" onChange={e => props.onChange(e.target.value)}>
                              {
                                JsonAccEdit[0].acctype_list.map((data) =>
                                  (items.acctype == data.value) ?  <option value={data.value} selected> {data.title} </option>  :  <option value={data.value}> {data.title}</option>
                                )
                              }
                            </CSelect>
                          )}
                        />
                    </CCol>
                  </CFormGroup>
              </CCol>

              <CCol xs="12" md="6" xl="7">
              <CFormGroup row>
                  <CCol>
                    <CLabel htmlFor="select">{JsonAccEdit[0].rmaldebit}</CLabel>
                  </CCol>
                    <CCol xs="12" xl="9">
                      <CFormGroup inline>
                      <Controller
                          name="normaldebit"
                          control={control}
                          defaultValue={items.normaldebit}
                          value="true"
                          render={props =>
                            <CInputCheckbox
                              onChange={e => props.onChange(e.target.checked)}
                              checked={props.value}
                            />
                          }
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
                  <CLabel htmlFor="textarea-input">{JsonAccEdit[0].list_description}</CLabel>
                </CCol>
                <CCol xs="12"xl="12">
                    <textarea
                      className="form-control"
                      name="description"
                      rows="4"
                      ref={register}
                      >{items.description}</textarea>
                </CCol>
            </CFormGroup>
            </CCol>
        </CRow>

        <CRow>
            <CCol xs="12" md="6" xl="5">
              <CFormGroup row>
                <CCol>
                  <CLabel htmlFor="select">{JsonAccEdit[0].list_isactive}</CLabel>
                </CCol>
                  <CCol xs="12" xl="10">
                    <CFormGroup variant="custom-checkbox" inline>
                    <Controller
                          name="isactive"
                          control={control}
                          defaultValue={items.isactive}
                          value="true"
                          render={props =>
                            <CInputCheckbox
                              onChange={e => props.onChange(e.target.checked)}
                              checked={props.value}
                            />
                          }
                        />
                      </CFormGroup>
                  </CCol>
                </CFormGroup>
            </CCol>
      </CRow>
          <CButton size="sm" color="danger" onClick={() => setItems(null)} className="mr-3"><CIcon name="cil-scrubber" /> {JsonAccEdit[0].cancel_button}</CButton>
          <CButton size="sm" type="submit" color="primary"><CIcon name="cil-scrubber" /> {JsonAccEdit[0].save_button}</CButton>
      </CForm>
      </CCardBody>
          <CModal
              show={modal}
              onClose={setModal}
            >
            <CModalBody>
              <h4>{JsonAccEdit[0].confirm_save}</h4>
            </CModalBody>
            <CModalFooter>
              <CButton type="submit" color="primary" onClick={() => setujuUbah(items.accno)} >{JsonAccEdit[0].confirm_yes}</CButton>{' '}
              <CButton
                  color="danger"
                  onClick={() => setModal(false)}
                >{JsonAccEdit[0].confirm_no}</CButton>
            </CModalFooter>
          </CModal>

          <CModal
            show={modal_no}
            onClose={setModal2}
          >
            <CModalBody>
              <h4>{JsonAccEdit[0].confirm_reject}</h4>
            </CModalBody>
            <CModalFooter>
              <CButton type="submit" onClick={() => tolakOtoritasi(items.trxid)} color="primary">{JsonAccEdit[0].confirm_reject_yes}</CButton>{' '}
                <CButton
                  color="danger"
                  onClick={() => setModal2(false)}
                >{JsonAccEdit[0].confirm_reject_no}</CButton>
            </CModalFooter>
          </CModal>
        </CCard>
      </CCol>
    </CRow>
    ) } */}
    </>
  );
};

export default AccountEdit;
