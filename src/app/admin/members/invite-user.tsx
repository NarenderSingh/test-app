"use client";

import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import LoadingBackdrop from "@/app/component/backdrop";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import {
  IInviteModal,
  IRole,
  IUserInvite,
} from "@/app/utils/interface/app-interface";
import { memberService } from "@/app-service/member/member-service";
import { ROLES } from "@/app/utils/constants/app-enum";

export default function InviteModal(props: IInviteModal) {
  const { inviteModal, setInviteModal, setSearchType, getInvites, roles } =
    props;
  const [emails, setEmails] = useState<any[]>([]);
  const [role, SetRole] = useState<number>(ROLES.ADMIN);
  const [invitesList, setInvitesList] = useState<IUserInvite[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    cleanForm();
  }, [inviteModal]);

  const cleanForm = () => {
    setEmails([]);
    setInvitesList([]);
    SetRole(ROLES.ADMIN);
  };

  const handleClose = () => {
    setInviteModal(false);
  };

  const addInvitedUser = () => {
    const data = [];
    emails.forEach((email: any) => {
      data.push({
        email: email,
        role: role,
      });
    });

    setInvitesList([...invitesList, ...data]);
    setEmails([]);
    SetRole(1);
  };

  const onSendInvites = (e: any) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      invitesList.forEach((invite: any, key: number) => {
        const payload = {
          email: invite.email,
          role_id: invite.role,
        };

        memberService
          .sendInvite(payload)
          .then(() => {
            if (key === invitesList.length - 1) {
              toast.success("Invites sent successfully");
              setLoading(false);
              setInvitesList([]);
              setInviteModal(false);
              setSearchType("invite");
              getInvites();
            }
          })
          .catch((e: any) => {
            toast.error(e?.response?.data?.message);
            setLoading(false);
          });
      });
    }, 1500);
  };

  const onGridRoleChanged = (e: any, index: number) => {
    const newData = [...invitesList];
    newData[index].role = e.target.value;
    setInvitesList(newData);
  };

  const onGridDelete = (row: IUserInvite) => {
    setInvitesList(invitesList.filter((x) => x.email !== row.email));
  };

  return (
    <React.Fragment>
      <Dialog
        open={inviteModal}
        onClose={handleClose}
        scroll={"paper"}
        maxWidth={"md"}
        fullWidth
        className="dialog-invite-user"
      >
        <DialogTitle className="dialog-header">Invite New User</DialogTitle>
        <DialogContent dividers className="dialog-content">
          {loading && <LoadingBackdrop />}
          <Paper
            component="form"
            className="paper-user-invite"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Autocomplete
              multiple
              options={[]}
              value={emails}
              onChange={(_event, newValue) => {
                setEmails(newValue);
              }}
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
                      variant="outlined"
                      label={option}
                      key={key}
                      {...tagProps}
                    />
                  );
                })
              }
              freeSolo
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Enter User Email"
                />
              )}
            />
            <Select
              variant="standard"
              value={role}
              onChange={(e) => SetRole(Number(e.target.value))}
              className="select-user"
            >
              {roles?.map((role: IRole, key: number) => {
                return (
                  <MenuItem key={key} value={role.id}>
                    {role.title}
                  </MenuItem>
                );
              })}
            </Select>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              onClick={addInvitedUser}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Paper>
          <br />
          <br />

          {invitesList.length > 0 && <h3>List of Users</h3>}
          {invitesList.length > 0 && (
            <Table
              sx={{ width: "55%" }}
              aria-label="simple table"
              className="table-user"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Access Role</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invitesList?.map((row: any, key: number) => (
                  <TableRow key={key}>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="center">
                      <Select
                        variant="outlined"
                        value={row.role}
                        onChange={(e) => onGridRoleChanged(e, key)}
                        className="select-user-grid"
                      >
                        {roles?.map((role: IRole, key: number) => {
                          return (
                            <MenuItem key={key} value={role.id}>
                              {role.title}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <DeleteOutlineIcon onClick={() => onGridDelete(row)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions className="dialog-footer">
          <Button
            className="btn-code-link"
            onClick={handleClose}
            style={{ marginRight: "20px" }}
          >
            Cancel
          </Button>
          <LoadingButton
            size="medium"
            autoFocus
            onClick={onSendInvites}
            loading={loading}
            loadingPosition="start"
            variant="contained"
            disabled={invitesList.length === 0}
          >
            Invite Users
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
