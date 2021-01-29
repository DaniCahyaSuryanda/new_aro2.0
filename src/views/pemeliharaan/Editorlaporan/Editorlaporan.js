import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CButton,
  CCardFooter,
  CDataTable,
} from "@coreui/react";
import JsonEditorLaporan from "json/lang/id/Editor Laporan/editorlaporan.json";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import Input from "component/Input";

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
                <Input
                  typefield="text"
                  type="text"
                  label={JsonEditorLaporan.category}
                  name="category"
                  defaultValue=""
                  id="category"
                  md="6"
                  lg="6"
                />
                <Input
                  typefield="text"
                  type="text"
                  label={JsonEditorLaporan.name}
                  name="name"
                  defaultValue=""
                  id="name"
                  md="6"
                  lg="6"
                />
              </CRow>
              <CRow>
                <CCol>
                  <CButton size="sm" color={"warning"} className="mr-3">
                    <CIcon name="cil-envelope-letter" />
                    {JsonEditorLaporan.button_downloadcsv}
                  </CButton>
                  <CButton size="sm" color={"success"} className="mr-3">
                    <CIcon name="cil-envelope-letter" />
                    {JsonEditorLaporan.button_downloadxlsx}
                  </CButton>
                  <CButton size="sm" color={"primary"} className="mr-3">
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
            <CCardBody>
              <CRow>
                <CCol lg="6" md="6">
                  <CRow>
                    <Input
                      typefield="checkbox"
                      label={""}
                      name="start_periode"
                      id="start_periode"
                      md="1"
                      lg="1"
                      value={true}
                      defaultValue={false}
                      ref={control}
                    />

                    <Input
                      ref={control}
                      typefield="select"
                      label={JsonEditorLaporan.start_periode}
                      name="periode"
                      id="periode"
                      md="11"
                      lg="11"
                      options={dataWaktu}
                      defaultValue=""
                    />
                  </CRow>
                </CCol>
                <CCol lg="6" md="6">
                  <CRow>
                    <Input
                      typefield="checkbox"
                      label={""}
                      name="end_periode"
                      id="end_periode"
                      md="1"
                      lg="1"
                      value={true}
                      ref={control}
                      defaultValue={false}
                    />
                    <Input
                      ref={control}
                      typefield="select"
                      label={JsonEditorLaporan.end_periode}
                      name="periode"
                      id="periode"
                      md="11"
                      lg="11"
                      options={dataWaktu}
                      defaultValue=""
                    />
                  </CRow>
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
                <Input
                  ref={control}
                  typefield="select"
                  label={JsonEditorLaporan.data_source}
                  name="category"
                  id="category"
                  md="6"
                  lg="6"
                  options={[]}
                  defaultValue=""
                />
                <Input
                  ref={control}
                  typefield="select"
                  label={JsonEditorLaporan.data_source_filter}
                  name="name"
                  id="name"
                  md="6"
                  lg="6"
                  options={dataWaktu}
                  defaultValue=""
                />
              </CRow>
              <CRow>
                <Input
                  ref={register}
                  typefield="textarea"
                  type="text"
                  label={JsonEditorLaporan.description}
                  name="description"
                  id="description"
                  rows="4"
                  md="12"
                  lg="12"
                  options={dataWaktu}
                  defaultValue=""
                />
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
              <Input
                  typefield="text"
                  type="text"
                  label={JsonEditorLaporan.template}
                  name="category"
                  defaultValue=""
                  id="category"
                  md="6"
                  lg="6"
                />
              </CRow>
              <CRow>
                <CCol>
                  <CButton
                    size="sm"
                    color={"warning"}
                    className="mr-3"
                  >
                    <CIcon name="cil-envelope-letter" />
                    {JsonEditorLaporan.button_download_template}
                  </CButton>
                  <CButton
                    size="sm"
                    color={"success"}
                    className="mr-3"
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
              <Input
                  ref={control}
                  typefield="select"
                  label={JsonEditorLaporan.category}
                  name="category"
                  id="category"
                  md="3"
                  lg="3"
                  options={dataLang}
                  defaultValue=""
                />
              </CRow>
              <CRow>
                <CCol>
                  <CDataTable
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
