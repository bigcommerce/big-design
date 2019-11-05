export interface ZIndex {
  sticky: number;
  fixed: number;
  modalBackdrop: number;
  modal: number;
  tooltip: number;
  popover: number;
}

export const zIndex: ZIndex = {
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};
