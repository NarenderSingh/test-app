"use client";

import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { Container, Typography, Box, Button, Grid, Stack } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { COLOR_CODE } from "@/app/utils/constants/app-enum";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import LoadingButton from "@mui/lab/LoadingButton";
import LoadingBackdrop from "@/app/component/backdrop";
import { settingService } from "@/app-service/setting/setting-svc";
import { toast } from "react-toastify";
import {
  IColor,
  IColorCode,
  ISaveSetting,
} from "@/app/utils/interface/app-interface";
import { colorCodeService } from "@/app-service/color/color-code-svc";

export default function AppearanceSettings() {
  const [loading, setLoading] = useState(false);
  const [colorCodes, setColorCodes] = useState<IColorCode[]>([]);
  const [color, setColor] = useState<IColor>({
    primary: "",
    secondary: "",
    success: "",
    danger: "",
  });
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [colorCode, setColorCode] = useState(COLOR_CODE.PRIMARY);
  const [uploadIcon, setUploadIcon] = useState<any>();
  const [uploadLogo, setUploadLogo] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      getColorCodes();
    }
  }, []);

  const getColorCodes = () => {
    setLoading(true);
    setTimeout(() => {
      colorCodeService
        .getColorCodes()
        .then((d: any) => {
          setColorCodes(d?.data);
          getSettingDetail();
        })
        .catch((e: any) => {
          setLoading(false);
          toast.error(e?.response?.data?.message);
        });
    }, 1000);
  };

  const getSettingDetail = () => {
    settingService
      .getSettingDetail()
      .then((d: any) => {
        const data = d?.data;
        const color: IColor = {
          primary: data.primary_color,
          secondary: data.secondary_color,
          success: data.success_color,
          danger: data.danger_color,
        };
        setColor(color);
        setLoading(false);
      })
      .catch((e: any) => {
        setLoading(false);
        toast.error(e?.response?.data?.message);
      });
  };

  const onColorChange = (selectedColor: any) => {
    const newColor = selectedColor.hex;

    switch (colorCode) {
      case COLOR_CODE.PRIMARY:
        setColor({ ...color, primary: newColor });
        break;
      case COLOR_CODE.SECONDARY:
        setColor({ ...color, secondary: newColor });
        break;
      case COLOR_CODE.SUCCESS:
        setColor({ ...color, success: newColor });
        break;
      case COLOR_CODE.DANGER:
        setColor({ ...color, danger: newColor });
        break;
      default:
        break;
    }
  };

  const onOpenColorPicker = (colorCode: any) => {
    setOpenColorPicker(true);
    setColorCode(colorCode);
  };

  const getSketchPickerColor = () => {
    switch (colorCode) {
      case COLOR_CODE.SECONDARY:
        return color.secondary;
      case COLOR_CODE.SUCCESS:
        return color.success;
      case COLOR_CODE.DANGER:
        return color.danger;
      case COLOR_CODE.PRIMARY:
      default:
        return color.primary;
    }
  };

  const showTickIcon = (color: string) => {
    if (
      colorCodes.filter((code: IColorCode) => code.code === color).length > 0
    ) {
      return;
    }
    return <DoneIcon className="color-tick" />;
  };

  const onUpdateChanges = () => {
    setLoading(true);
    setTimeout(() => {
      const payload: ISaveSetting = {
        primary_color: color.primary,
        secondary_color: color.secondary,
        success_color: color.success,
        danger_color: color.danger,
      };
      settingService
        .saveOrUpdateSetting(payload)
        .then(() => {
          setLoading(false);
          toast.success("Appearance settings updated successfully");
        })
        .catch((e: any) => {
          setLoading(false);
          toast.error("Error updating settings.");
          toast.error(e?.response?.data?.message);
        });
    }, 1500);
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    const name = event.target.name;

    if (selectedFile) {
      if (name === "uploadIcon") {
        setUploadIcon(selectedFile);
      } else if (name === "uploadLogo") {
        setUploadLogo(selectedFile);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {loading && <LoadingBackdrop />}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Appearance Settings
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Personalize the look and feel of your experience! Easily customize the
        interface to match your brand’s colors and style, ensuring seamless
        integration with your existing design.
      </Typography>

      {colorCodes.length > 0 && (
        <div>
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">ICON</Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload Icon
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="uploadIcon"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">LOGO</Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload Logo
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="uploadLogo"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ my: 2 }}>
            {/* Primary Color */}
            <Grid item xs={12} sm={12} sx={{ my: 2 }}>
              <Typography variant="subtitle1">Primary Color</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {colorCodes?.map((col: IColorCode, key: number) => (
                  <Box
                    key={key}
                    onClick={() => setColor({ ...color, primary: col.code })}
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: col.code,
                      borderRadius: 1,
                    }}
                  >
                    {col.code === color.primary && (
                      <DoneIcon className="done-icon-tick" />
                    )}
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onOpenColorPicker(COLOR_CODE.PRIMARY)}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: color.primary,
                      borderRadius: 1,
                      marginRight: 1,
                    }}
                  >
                    {showTickIcon(color.primary)}
                  </Box>
                  Custom Text ({color.primary})
                </Button>
              </Stack>
            </Grid>

            {/* Secondary Color */}
            <Grid item xs={12} sm={12} sx={{ my: 2 }}>
              <Typography variant="subtitle1">Secondary Color</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {colorCodes?.map((col: IColorCode, key: number) => (
                  <Box
                    key={key}
                    onClick={() => setColor({ ...color, secondary: col.code })}
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: col.code,
                      borderRadius: 1,
                    }}
                  >
                    {col.code === color.secondary && (
                      <DoneIcon className="done-icon-tick" />
                    )}
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onOpenColorPicker(COLOR_CODE.SECONDARY)}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: color.secondary,
                      borderRadius: 1,
                      marginRight: 1,
                    }}
                  >
                    {showTickIcon(color.secondary)}
                  </Box>
                  Custom Text ({color.secondary})
                </Button>
              </Stack>
            </Grid>

            {/* Success Color */}
            <Grid item xs={12} sm={12} sx={{ my: 2 }}>
              <Typography variant="subtitle1">Success Color</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {colorCodes?.map((col: IColorCode, key: number) => (
                  <Box
                    key={key}
                    onClick={() => setColor({ ...color, success: col.code })}
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: col.code,
                      borderRadius: 1,
                    }}
                  >
                    {col.code === color.success && (
                      <DoneIcon className="done-icon-tick" />
                    )}
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onOpenColorPicker(COLOR_CODE.SUCCESS)}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: color.success,
                      borderRadius: 1,
                      marginRight: 1,
                    }}
                  >
                    {showTickIcon(color.success)}
                  </Box>
                  Custom Text ({color.success})
                </Button>
              </Stack>
            </Grid>

            {/* Danger Color */}
            <Grid item xs={12} sm={12} sx={{ my: 2 }}>
              <Typography variant="subtitle1">Danger Color</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {colorCodes?.map((col: IColorCode, key: number) => (
                  <Box
                    key={key}
                    onClick={() => setColor({ ...color, danger: col.code })}
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: col.code,
                      borderRadius: 1,
                    }}
                  >
                    {col.code === color.danger && (
                      <DoneIcon className="done-icon-tick" />
                    )}
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onOpenColorPicker(COLOR_CODE.DANGER)}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: color.danger,
                      borderRadius: 1,
                      marginRight: 1,
                    }}
                  >
                    {showTickIcon(color.danger)}
                  </Box>
                  Custom Text ({color.danger})
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Grid container item xs={4} sm={4} style={{ display: "flex" }}>
            {openColorPicker && (
              <Box
                className="color-picker"
                sx={{ mt: 2, position: "absolute", float: "right" }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <Button
                      color="success"
                      onClick={() => setOpenColorPicker(false)}
                    >
                      <CheckIcon />
                    </Button>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      width: "50%",
                    }}
                  >
                    <Button
                      color="error"
                      onClick={() => setOpenColorPicker(false)}
                    >
                      <ClearIcon />
                    </Button>
                  </div>
                </div>
                <SketchPicker
                  color={getSketchPickerColor()}
                  onChangeComplete={(color: any) => onColorChange(color)}
                />
              </Box>
            )}
          </Grid>
          <div className="text-align-right">
            <LoadingButton
              sx={{ mt: 2 }}
              size="medium"
              onClick={onUpdateChanges}
              loading={loading}
              loadingPosition="start"
              variant="contained"
            >
              Update
            </LoadingButton>
          </div>
        </div>
      )}
    </Container>
  );
}
