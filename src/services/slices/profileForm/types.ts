export type TInputsNames = "name"|"email"|"password"

export interface IInputState {
  error: boolean;
  value: string;
  changed: boolean;
}
export type TInputsState = {
  [propName in TInputsNames]: IInputState
};