import CIcon from "@coreui/icons-react";
import {
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
  CRow,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import JsonAddKantor from "json/lang/id/Menajemen Kantor/add/manajemenkantoradd.json";
import Input from "component/Input";

const jenisKantor = [
  {
    id: "0",
    name: "Kantor Pusat",
  },
  {
    id: "1",
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
                  <Input
                    typefield="text"
                    label={JsonAddKantor.office_code}
                    name="office_code"
                    defaultValue=""
                    ref={register}
                    id="office_code"
                    md="6"
                    lg="6"
                  />
                  <Input
                    typefield="text"
                    label={JsonAddKantor.office_name}
                    name="office_name"
                    defaultValue=""
                    id="office_name"
                    md="6"
                    ref={register}
                    lg="6"
                  />
                </CRow>

                <CRow>
                  <Input
                    ref={control}
                    typefield="select"
                    label={JsonAddKantor.office_type}
                    name="office_type"
                    id="office_type"
                    md="6"
                    lg="6"
                    options={cabang}
                    defaultValue=""
                  />

                  <Input
                    typefield="checkbox"
                    label={JsonAddKantor.isactive}
                    name="isactive"
                    id="isactive"
                    md="1"
                    lg="1"
                    value={true}
                    defaultValue={false}
                    ref={control}
                  />
                </CRow>

                <CRow>
                  <Input
                    typefield="text"
                    label={JsonAddKantor.address}
                    name="address"
                    defaultValue=""
                    id="address"
                    md="6"
                    lg="6"
                    ref={register}
                  />
                  <Input
                    typefield="text"
                    label={JsonAddKantor.cp}
                    name="cp"
                    defaultValue=""
                    id="cp"
                    md="6"
                    lg="6"
                    ref={register}
                  />
                </CRow>
                <CRow>
                  <Input
                    typefield="text"
                    label={JsonAddKantor.phone_number}
                    name="phone_number"
                    defaultValue=""
                    id="phone_number"
                    md="6"
                    lg="6"
                    ref={register}
                  />

                  <Input
                    typefield="email"
                    label={JsonAddKantor.email}
                    name="email"
                    defaultValue=""
                    id="email"
                    md="6"
                    lg="6"
                    ref={register}
                  />
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
