import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormGroup,
  CLabel,
  CButton,
  CCardFooter,
  CDataTable,
  CInputCheckbox,
} from "@coreui/react";
import JsonEditorLaporan from "laporan/lang/id/editorlaporan.json";
import axios from "axios";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import CIcon from "@coreui/icons-react";

const waktu = [
  {
    id: "hari",
    name: "Hari",
  },
  {
    id: "bulan",
    name: "Bulan",
  },
  {
    id: "tahun",
    name: "Tahun",
  },
];

const lang = [
  {
    id: "id",
    name: "id",
  },
  {
    id: "en",
    name: "en",
  },
];

const field = [
  "id",
  "typedata",
  "default",
  "default format",
  "select",
  "select form",
];

const fieldlang = ["id", "caption"];

const EditorLaporan = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const [dataWaktu, setDataWaktu] = useState(null);
  const [dataLang, setLang] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
  const [items, setItems] = useState(false);
  const [dataFilter, setDataFilter] = useState(null);
  const [dataItem, setDataItem] = useState([]);

  useEffect(() => {
    if (dataWaktu == null) {
      SetDataWaktu();
      SetDatalang();
    }
  }, [dataWaktu]);

  const SetDataWaktu = () => {
    let data = [];
    waktu.map((row) => {
      data.push({ value: row.id, label: row.name });
    });
    setDataWaktu(data);
  };

  const SetDatalang = () => {
    let data = [];
    lang.map((row) => {
      data.push({ value: row.id, label: row.name });
    });
    setLang(data);
  };

  return (
    <>
      <CRow>
        <CCol xl="12">
          <CCard>
            <CCardHeader>
              <h6>{JsonEditorLaporan.title}</h6>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol lg="6">
                  <CFormGroup row>
                    <CCol xl="12">
                      <CLabel htmlFor="text-input">
                        {JsonEditorLaporan.category}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="12">
                      {/* <Controller
                        control={control}
                        name="category"
                        defaultValue={""}
                        id="category"
                        render={({ onChange }) => (
                          <Select
                            onChange={(e) => {
                              onChange(e.value);
                              setOptionNama(e.value);
                            }}
                            options={dataKategori}
                          />
                        )}
                      /> */}
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol lg="6">
                  <CFormGroup row>
                    <CCol xl="12">
                      <CLabel htmlFor="text-input">
                        {JsonEditorLaporan.name}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="12">
                      {/* <Controller
                        control={control}
                        name="name"
                        defaultValue={""}
                        id="name"
                        render={({ onChange }) => (
                          <Select
                            onChange={(e) => {
                              onChange(e.value);
                              showFilter();
                            }}
                            options={dataNama}
                          />
                        )}
                      /> */}
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CButton
                    //   key={key}
                    size="sm"
                    color={"warning"}
                    className="mr-3"
                    //  disabled={row.value}
                    // style={{ float: "right" }}
                  >
                    <CIcon name="cil-envelope-letter" />
                    {JsonEditorLaporan.button_downloadcsv}
                  </CButton>
                  <CButton
                    //   key={key}
                    size="sm"
                    color={"success"}
                    className="mr-3"
                    //  disabled={row.value}
                    // style={{ float: "right" }}
                  >
                    <CIcon name="cil-envelope-letter" />
                    {JsonEditorLaporan.button_downloadxlsx}
                  </CButton>
                  <CButton
                    //   key={key}
                    size="sm"
                    color={"primary"}
                    className="mr-3"
                    //  disabled={row.value}
                    // style={{ float: "right" }}
                  >
                    <CIcon name="cil-envelope-letter" />
                    {JsonEditorLaporan.button_preview}
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader></CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xl="6" xl="6" md="6">
                  <CFormGroup row>
                    <CCol className="ml-3">
                      <Controller
                        name="start_periode"
                        control={control}
                        defaultValue={false}
                        value="true"
                        render={(props) => (
                          <CInputCheckbox
                            onChange={(e) => props.onChange(e.target.checked)}
                            // onClick={(e) => itemGroup(e.target.checked)}
                            checked={props.value}
                          />
                        )}
                      />
                      <CCol>
                        <CLabel htmlFor="text-input">
                          {JsonEditorLaporan.start_periode}
                        </CLabel>
                        <Controller
                          control={control}
                          options={dataWaktu}
                          name="periode"
                          defaultValue={""}
                          id="periode"
                          as={Select}
                          // render={({ onChange }) => (
                          //   <Select
                          //     onChange={(e) => {
                          //       onChange(e);
                          //       setOptionKota(e);
                          //     }}
                          //     options={dataWaktu}
                          //   />
                          // )}
                        />
                      </CCol>
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol xl="6" md="6">
                  <CFormGroup row>
                    <CCol className="ml-3">
                      <Controller
                        name="end_periode"
                        control={control}
                        defaultValue={false}
                        value="true"
                        render={(props) => (
                          <CInputCheckbox
                            onChange={(e) => props.onChange(e.target.checked)}
                            // onClick={(e) => itemGroup(e.target.checked)}
                            checked={props.value}
                          />
                        )}
                      />
                      <CCol>
                        <CLabel htmlFor="text-input">
                          {JsonEditorLaporan.end_periode}
                        </CLabel>
                        <Controller
                          control={control}
                          options={dataWaktu}
                          name="periode"
                          defaultValue={""}
                          id="periode"
                          as={Select}
                        />
                      </CCol>
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xl="12">
          <CCard>
            <CCardHeader>
              <h6>{JsonEditorLaporan.form_filter}</h6>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                //items={dataGrid.data}
                fields={field}
                itemsPerPageSelect
                itemsPerPage={20}
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

      <CRow>
        <CCol xl="12">
          <CCard>
            <CCardHeader></CCardHeader>
            <CCardBody>
              <CRow>
                <CCol lg="6">
                  <CFormGroup row>
                    <CCol xl="12">
                      <CLabel htmlFor="text-input">
                        {JsonEditorLaporan.data_source}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="12">
                      <Controller
                        control={control}
                        name="category"
                        defaultValue={""}
                        id="category"
                        as={Select}
                        // render={({ onChange }) => (
                        //   <Select
                        //     onChange={(e) => {
                        //       onChange(e.value);
                        //       setOptionNama(e.value);
                        //     }}
                        //     options={dataKategori}
                        //   />
                        // )}
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol lg="6">
                  <CFormGroup row>
                    <CCol xl="12">
                      <CLabel htmlFor="text-input">
                        {JsonEditorLaporan.data_source_filter}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="12">
                      <Controller
                        control={control}
                        as={Select}
                        name="name"
                        defaultValue={""}
                        id="name"
                        // render={({ onChange }) => (
                        //   <Select
                        //     onChange={(e) => {
                        //       onChange(e.value);
                        //       showFilter();
                        //     }}
                        //     options={dataNama}
                        //   />
                        // )}
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormGroup row>
                    <CCol xl="12">
                      <CLabel htmlFor="text-input">
                        {JsonEditorLaporan.description}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="6">
                      <textarea
                        className="form-control"
                        name="description"
                        rows="4"
                        ref={register}
                      ></textarea>
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xl="12">
          <CCard>
            <CCardHeader></CCardHeader>
            <CCardBody>
              <CRow>
                <CCol lg="6">
                  <CFormGroup row>
                    <CCol xl="12">
                      <CLabel htmlFor="text-input">
                        {JsonEditorLaporan.template}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="12">
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CButton
                    //   key={key}
                    size="sm"
                    color={"warning"}
                    className="mr-3"
                    //  disabled={row.value}
                    // style={{ float: "right" }}
                  >
                    <CIcon name="cil-envelope-letter" />
                    {JsonEditorLaporan.button_download_template}
                  </CButton>
                  <CButton
                    //   key={key}
                    size="sm"
                    color={"success"}
                    className="mr-3"
                    //  disabled={row.value}
                    // style={{ float: "right" }}
                  >
                    <CIcon name="cil-envelope-letter" />

                    {JsonEditorLaporan.button_upload_template}
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xl="12">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol lg="6">
                  <CFormGroup row>
                    <CCol xl="12">
                      <CLabel htmlFor="text-input">
                        {JsonEditorLaporan.category}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" xl="12">
                      <Controller
                        control={control}
                        options={dataLang}
                        name="category"
                        defaultValue={""}
                        id="category"
                        as={Select}
                        // render={({ onChange }) => (
                        //   <Select
                        //     onChange={(e) => {
                        //       onChange(e.value);
                        //       setOptionNama(e.value);
                        //     }}
                        //     options={dataKategori}
                        //   />
                        // )}
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CDataTable
                    //items={dataGrid.data}
                    fields={fieldlang}
                    itemsPerPageSelect
                    itemsPerPage={20}
                    columnFilter
                    sorter
                    hover
                    size={"md"}
                    pagination
                    tableFilter
                    cleaner
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default EditorLaporan;
