"use client";

import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import { toast } from "react-toastify";
import InviteUserModal from "./invite-user";
import RefreshIcon from "@mui/icons-material/Refresh";
import { memberService } from "@/app-service/member/member-service";
import LoadingBackdrop from "@/app/component/backdrop";
import { ROLES, SEARCH_TYPE } from "@/app/utils/constants/app-enum";
import {
  IMember,
  IRole,
  IUpdateRole,
} from "@/app/utils/interface/app-interface";
import { roleService } from "@/app-service/role/role-service";

export default function MembersPage() {
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedUserRole, setSelectedUserRole] = useState<number>(ROLES.USER);
  const [searchType, setSearchType] = useState<string>(SEARCH_TYPE.USER);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredInvites, setFilteredInvites] = useState([]);
  const [users, setUsers] = useState<IMember[]>([]);
  const [invites, setInvites] = useState<IMember[]>([]);
  const [inviteModal, setInviteModal] = useState(false);
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    setLoading(true);
    if (typeof window !== "undefined") {
      getRoles();
      getMembers();
      getInvites();
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

  const getMembers = () => {
    setTimeout(() => {
      memberService
        .getMembers()
        .then((d: any) => {
          const data = d?.data;
          const users: IMember[] = [];

          data.forEach((user: any) => {
            users.push({
              id: user.id,
              name: user.first_name + " " + user.last_name,
              email: user.email,
              isEdited: false,
              photo_url: user.photo_url,
              role: user.role_id,
              searchType: SEARCH_TYPE.USER,
            });
          });

          setUsers(users);
          setLoading(false);
        })
        .catch((e: any) => {
          setLoading(false);
          toast.error(e?.response?.data?.message);
        });
    }, 100);
  };

  const getInvites = () => {
    memberService
      .getInvites()
      .then((d: any) => {
        const data = d?.data;
        const invites: IMember[] = [];

        data.forEach((invite: any) => {
          invites.push({
            id: invite.id,
            name: invite.email,
            email: invite.email,
            isEdited: false,
            photo_url: null,
            role: invite.role_id,
            searchType: SEARCH_TYPE.INVITE,
          });
        });

        setInvites(invites);
      })
      .catch((e: any) => {
        setLoading(false);
        toast.error(e?.response?.data?.message);
      });
  };

  const onListItemClick = (e: any, index: number) => {
    setSelectedIndex(index);
  };

  const onSearchTypeChange = (e: any, newsearchType: string) => {
    if (newsearchType === null) {
      setSearchType(SEARCH_TYPE.USER);
      return;
    }
    setSearchType(newsearchType);
  };

  const onSearchUser = () => {
    if (searchType === SEARCH_TYPE.USER) {
      const _filteredUsers = users.filter(
        (user: any) =>
          user?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          user?.email?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredUsers(_filteredUsers);
    }

    if (searchType === SEARCH_TYPE.INVITE) {
      const _filteredInvites = invites.filter(
        (invite: any) =>
          invite?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          invite?.email?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredInvites(_filteredInvites);
    }
  };

  const onClearSearch = () => {
    setFilteredUsers([]);
    setFilteredInvites([]);
    setSearchText("");
  };

  const onEditUser = (selectedUser: any) => {
    setUsers(
      users.map((user: any) => {
        return user.id === selectedUser.id
          ? { ...user, isEdited: true }
          : { ...user, isEdited: false };
      })
    );
  };

  const onCancelEdit = (selectedUser: any) => {
    setUsers(
      users.map((user: any) => {
        return user.id === selectedUser.id
          ? { ...user, isEdited: false }
          : { ...user, isEdited: false };
      })
    );
  };

  const onUpdateUser = (selectedUser: any) => {
    setLoading(true);
    setTimeout(() => {
      const payload: IUpdateRole = {
        user_id: selectedUser.id,
        role_id: selectedUserRole,
      };
      memberService
        .updateRole(payload)
        .then((d: any) => {
          if (d?.status === 202) {
            setUsers(
              users.map((user: any) => {
                return user.id === selectedUser.id
                  ? { ...user, isEdited: false, role: selectedUserRole }
                  : { ...user, isEdited: false };
              })
            );
            toast.success("User role updated successfully");
          }

          setLoading(false);
        })
        .catch((e: any) => {
          setLoading(false);
          toast.error(e?.response?.data?.message);
        });
    }, 1500);
  };

  const onRoleChange = (value: number) => {
    setSelectedUserRole(value);
  };

  const onInviteClick = () => {
    setInviteModal(true);
  };

  const renderList = (user: IMember, key: number) => {
    return (
      <ListItemButton
        key={key}
        alignItems="center"
        selected={selectedIndex === key}
        onClick={(event) => onListItemClick(event, key)}
      >
        <ListItemAvatar>
          <Avatar alt={user.name} src={user.photo_url} />
        </ListItemAvatar>
        <ListItemText primary={user.name} secondary={user.email} />

        {user.role === ROLES.ADMIN && (
          <Chip
            label="Admin"
            color="primary"
            size="medium"
            variant="outlined"
            className="chip-admin"
            style={{ textAlign: "left" }}
          />
        )}
        {user.isEdited && (
          <React.Fragment>
            <Select
              defaultValue={user.role}
              onChange={(e) => onRoleChange(Number(e.target.value))}
              className="role-select"
            >
              {roles?.map((role: IRole, key: number) => {
                return (
                  <MenuItem key={key} value={role.id}>
                    {role.title}
                  </MenuItem>
                );
              })}
            </Select>

            <IconButton
              color="success"
              size="small"
              onClick={() => onUpdateUser(user)}
            >
              <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton
              color="error"
              size="small"
              onClick={() => onCancelEdit(user)}
            >
              <HighlightOffIcon />
            </IconButton>
          </React.Fragment>
        )}
        {!user?.isEdited && user?.searchType === SEARCH_TYPE.USER && (
          <IconButton
            color="primary"
            size="small"
            className="edit-icon"
            onClick={() => onEditUser(user)}
          >
            <EditIcon />
          </IconButton>
        )}
      </ListItemButton>
    );
  };

  return (
    <React.Fragment>
      {loading && <LoadingBackdrop />}
      <h1>Members</h1>
      <p className="member-desc">
        Manage your member, and control which people see and may access.
      </p>
      <div className="member-user-group">
        <div className="member-user-first">
          <h3>Users</h3>
          <p className="member-desc-small">User belongs to your workspace</p>
        </div>
        <div className="member-user-second">
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<AddIcon />}
            onClick={onInviteClick}
          >
            Invite
          </Button>
        </div>
      </div>
      <div className="member-search-group">
        <div className="member-search-first">
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <IconButton
              type="button"
              color="primary"
              sx={{ p: "10px" }}
              onClick={onClearSearch}
            >
              <RefreshIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for members"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              type="button"
              color="primary"
              sx={{ p: "10px" }}
              onClick={onSearchUser}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className="member-search-second">
          <ToggleButtonGroup
            color="primary"
            value={searchType}
            onChange={onSearchTypeChange}
            exclusive
            fullWidth
            className="toggle-button-group"
          >
            <ToggleButton value={SEARCH_TYPE.USER}>User</ToggleButton>
            <ToggleButton value={SEARCH_TYPE.INVITE}>Invite</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      {searchType === SEARCH_TYPE.USER && filteredUsers.length === 0 && (
        <div className="member-list">
          <List>
            {users?.map((user: any, key: number) => {
              return renderList(user, key);
            })}
          </List>
        </div>
      )}

      {searchType === SEARCH_TYPE.INVITE && filteredInvites.length === 0 && (
        <div className="member-list">
          <List>
            {invites?.map((user: any, key: number) => {
              return renderList(user, key);
            })}
          </List>
        </div>
      )}

      {searchType === SEARCH_TYPE.USER && filteredUsers.length > 0 && (
        <div className="member-list">
          <List>
            {filteredUsers?.map((user: any, key: number) => {
              return renderList(user, key);
            })}
          </List>
        </div>
      )}

      {searchType === SEARCH_TYPE.INVITE && filteredInvites.length > 0 && (
        <div className="member-list">
          <List>
            {filteredInvites?.map((user: any, key: number) => {
              return renderList(user, key);
            })}
          </List>
        </div>
      )}

      <InviteUserModal
        inviteModal={inviteModal}
        setInviteModal={setInviteModal}
        setSearchType={setSearchType}
        getInvites={getInvites}
        roles={roles}
      />
    </React.Fragment>
  );
}
