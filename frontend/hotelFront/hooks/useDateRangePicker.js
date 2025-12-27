import { useMemo, useState } from 'react';

function formatDate(date) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date);
}

export default function useDateRangePicker({
  initialCheckIn = new Date(),
  initialNights = 3,
} = {}) {
  const [checkIn, setCheckIn] = useState(() => new Date(initialCheckIn));
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date(initialCheckIn);
    d.setDate(d.getDate() + initialNights);
    return d;
  });
  const [pickerState, setPickerState] = useState({ visible: false, mode: 'checkin' });

  const checkInLabel = useMemo(() => formatDate(checkIn), [checkIn]);
  const checkOutLabel = useMemo(() => formatDate(checkOut), [checkOut]);

  const openPicker = (mode) => setPickerState({ visible: true, mode });

  const onPickerChange = (event, date) => {
    if (event?.type === 'dismissed') {
      setPickerState((s) => ({ ...s, visible: false }));
      return;
    }

    const picked = date || new Date();

    if (pickerState.mode === 'checkin') {
      setCheckIn(picked);

      if (picked >= checkOut) {
        const next = new Date(picked);
        next.setDate(next.getDate() + 1);
        setCheckOut(next);
      }
    } else {
      if (picked <= checkIn) {
        const next = new Date(checkIn);
        next.setDate(next.getDate() + 1);
        setCheckOut(next);
      } else {
        setCheckOut(picked);
      }
    }

    setPickerState((s) => ({ ...s, visible: false }));
  };

  return {
    checkIn,
    checkOut,
    checkInLabel,
    checkOutLabel,
    pickerState,
    openPicker,
    onPickerChange,
    setCheckIn,
    setCheckOut,
  };
}
