import { createSlice } from "@reduxjs/toolkit";

function convertToIST(utcDateString) {
  const date = new Date(utcDateString);
  return date.toLocaleString(undefined, {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const qrCodeSlice = createSlice({
  name: "qrCode",
  initialState: {
    qrCodes: [],
  },
  reducers: {
    setQrCodes: (state, action) => {
      state.qrCodes = action.payload.map(qrCode => ({
        ...qrCode,
        createdAt: convertToIST(qrCode.createdAt),
        updatedAt: convertToIST(qrCode.updatedAt),
        markedByStudents: qrCode.markedByStudents.map(ele => ({
          ...ele,
          scanDate: convertToIST(ele?.scanTime).split(", ")[0],
          scanTime: convertToIST(ele?.scanTime).split(", ")[1],
        })),
      }));
    },
  },
});

export const { setQrCodes } = qrCodeSlice.actions;
export default qrCodeSlice.reducer;
