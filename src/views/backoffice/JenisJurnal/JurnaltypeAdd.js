import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import langID from "json/lang/id/Tipe Jurnal/add/journaltypeaddcreate.json";
import langEN from "json/lang/en/Tipe Jurnal/add/journaltypeaddcreate.json";
import messageID from "json/lang/id/Message/message.json";
import messageEN from "json/lang/en/Message/message.json";
import Toast from "component/Toast";
import { useHistory } from "react-router-dom";
import Input from "component/Input";

const configApp = JSON.parse(sessionStorage.getItem("config"));

const JenisJurnalAdd = () => {
  const [itemCreate, setItemCreate] = useState(null);
  const [messageJson, setMessageJson] = useState(null);
  const { handleSubmit, register, reset, control } = useForm();
  const [items, setItems] = useState(null);
  const [message, setMessage] = useState({});
  const [modal, setModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (itemCreate === null) {
      if (configApp.lang === "id") {
        setItemCreate(langID);
      } else if (configApp.lang === "en") {
        setItemCreate(langEN);
      } else {
        setItemCreate(langID);
      }
    }
  }, [itemCreate]);

  useEffect(() => {
    // if (Object.keys(messageJson).length === 0) {
    if (configApp.lang === "id") {
      setMessageJson(messageID);
    } else if (configApp.lang === "en") {
      setMessageJson(messageEN);
    } else {
      setMessageJson(messageID);
      //  }
    }
  }, [messageJson]);

  const onSubmit = (data) => {
    // alert(JSON.stringify(data))
    setModal(true);
    setItems(data);
  };

  const simpanData = () => {
    setMessage({});
    let data = {
      jrtype: items.jrtype,
      isactive: items.isactive,
      description: items.description,
      validstate: 0,
    };
    axios
      .post(`${global.config.API_URL}gl/params/journaltype/add/create`, data)
      .then((res) => {
        // console.log("tes", res.data);
        if (res.data.rescode === 0) {
          setModal(false);
          setItems(null);
          reset();
          setMessage({
            title: messageJson.toatsheader_success,
            body: itemCreate.message_success,
            type: messageJson.toatscolor_success,
            active: true,
          });
        } else {
          setModal(false);
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

  return (
    <>
      <Toast message={message} />
      {itemCreate && (
        <CRow>
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
                    <Input
                      ref={register}
                      typefield="text"
                      type="text"
                      label={itemCreate.jrtype}
                      name="jrtype"
                      defaultValue=""
                      id="jrtype"
                      md="6"
                      lg="6"
                    />
                    <Input
                      ref={control}
                      typefield="checkbox"
                      label={itemCreate.isactive}
                      name="isactive"
                      id="isactive"
                      md="2"
                      lg="2"
                      value="true"
                      defaultValue={false}
                      // eventCheckbox={eventCheckbox}
                    />
                  </CRow>
                  <CRow>
                    <Input
                      ref={register}
                      typefield="textarea"
                      label={itemCreate.description}
                      name="description"
                      id="description"
                      md="12"
                      lg="12"
                      rows="4"
                      defaultValue={""}
                    />
                  </CRow>
                  <hr />
                  <CButton
                    type="reset"
                    size={35}
                    color="warning"
                    onClick={() => history.goBack()}
                  >
                    <CIcon name="cil-chevron-left" /> {itemCreate.confirm_no}
                  </CButton>

                  <CButton
                    type="submit"
                    className={"float-right"}
                    size={35}
                    color="primary"
                  >
                    <CIcon name="cil-save" /> {itemCreate.save_button}
                  </CButton>
                  <CButton
                    type="reset"
                    size={35}
                    className={"float-right mr-3"}
                    color="danger"
                  >
                    <CIcon name="cil-scrubber" /> {itemCreate.cancel_button}
                  </CButton>
                </CForm>
              </CCardBody>

              <CModal show={modal} onClose={setModal}>
                <CModalBody>
                  <h3>{itemCreate.confirm_save}</h3>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    type="submit"
                    onClick={() => simpanData()}
                    color="primary"
                  >
                    {itemCreate.confirm_yes}
                  </CButton>{" "}
                  <CButton color="danger" onClick={() => setModal(false)}>
                    {itemCreate.confirm_no}
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

export default JenisJurnalAdd;
