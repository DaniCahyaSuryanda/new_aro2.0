import React from "react";
import { CHeaderNavItem, CHeaderNav } from "@coreui/react";
import CIcon from "@coreui/icons-react";

const username =
  JSON.parse(sessionStorage.getItem("config")).userdata.username !== null
    ? JSON.parse(sessionStorage.getItem("config")).userdata.username
    : "GUEST";

const role =
  JSON.parse(sessionStorage.getItem("config")).userdata.role !== null
    ? JSON.parse(sessionStorage.getItem("config")).userdata.role
    : null;

const branchid =
  JSON.parse(sessionStorage.getItem("config")).userdata.branchid !== null
    ? JSON.parse(sessionStorage.getItem("config")).branchid
    : null;

const TheHeaderUser = () => {
  return (
    <CHeaderNav>
      <CHeaderNavItem className="px-1">
        <div className=" mx-2">
          {(role !== null) ? (
            <div>
              <CIcon name="cil-laptop" />
              &nbsp;
              {role}
            </div>
          ) : ''}
        </div>
      </CHeaderNavItem>
      <CHeaderNavItem className="px-1">
        <div className=" mx-2">
          {(branchid !== null) ? (
            <div>
              <CIcon name="cil-location-pin" />
              &nbsp;
              {branchid}
            </div>
          ) : ''}
        </div>
      </CHeaderNavItem>
      <CHeaderNavItem className="px-1">
        <div className="mx-2">
          <CIcon name="cil-user" />
          &nbsp;
          {username}
        </div>
      </CHeaderNavItem>
    </CHeaderNav>
  );
};

export default TheHeaderUser;
