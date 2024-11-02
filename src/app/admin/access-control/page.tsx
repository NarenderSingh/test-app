"use client";

import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoadingBackdrop from "@/app/component/backdrop";
import {
  IModuleAccess,
  IRole,
  IUpdateModuleAccess,
} from "@/app/utils/interface/app-interface";
import Switch from "@mui/material/Switch";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { roleService } from "@/app-service/role/role-service";
import { moduleAccessService } from "@/app-service/module-access/module-access-service";

export default function AcessControlPage() {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [modules, setModules] = useState<IModuleAccess[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getRoles();
      getModuleAccess();
    }
  }, []);

  const getRoles = () => {
    roleService
      .getRoles()
      .then((d: any) => {
        const data = d?.data;
        setRoles(data);
      })
      .catch((e: any) => {
        toast.error(e?.response?.data?.message);
      });
  };

  const getModuleAccess = () => {
    setLoading(true);
    moduleAccessService
      .getModuleAccess()
      .then((d: any) => {
        const data = d?.data;
        setModules(data);
        setLoading(false);
      })
      .catch((e: any) => {
        toast.error(e?.response?.data?.message);
      });
  };

  const onModuleAccessChange = (e: any, id: number) => {
    const { name, checked } = e.target;
    const payload: IUpdateModuleAccess = {
      id: id,
      column_name: name,
      checked: checked,
    };

    moduleAccessService.updateModuleAccess(payload);

    setModules(
      modules.map((module: IModuleAccess) => {
        return module.id === id ? { ...module, [name]: checked } : module;
      })
    );
  };

  return (
    <React.Fragment>
      {loading && <LoadingBackdrop />}
      <div>
        <h1>Access Control</h1>
        <p className="access-control-desc">
          Manage your access and privileges.
        </p>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} className="table-role">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <h4>Module</h4>
              </TableCell>
              {roles?.map((role: IRole, key: number) => (
                <TableCell key={key} align="center">
                  <h4>{role.title}</h4>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {modules?.map((module: IModuleAccess, key: number) => (
              <TableRow key={key}>
                <TableCell align="left">
                  <span>{module?.title}</span>
                  {module?.info && (
                    <Tooltip title={module?.info}>
                      <IconButton>
                        <InfoIcon className="info-icon" />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    color="primary"
                    name="admin_access"
                    checked={module?.admin_access}
                    onChange={(e) => onModuleAccessChange(e, module?.id)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    color="success"
                    name="manager_access"
                    checked={module?.manager_access}
                    onChange={(e) => onModuleAccessChange(e, module?.id)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    color="primary"
                    name="user_access"
                    value={module?.user_access}
                    onChange={(e) => onModuleAccessChange(e, module?.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
