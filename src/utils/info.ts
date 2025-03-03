import type { NumberInfo, StepInfo } from "./types"


export function fillStepInfo(info: StepInfo, first: number, zeros: number, second: number, quotient: number, periodic: boolean = false) {
  setNumberInfo(info[0], first, zeros)
  setNumberInfo(info[1]!, second)
  info[2] = quotient
  info[3] = periodic
}

export function getLastStepInfo(first: number): StepInfo {
  const info: StepInfo = [[0, 0, 0, 0], null, 0, false]
  setNumberInfo(info[0], first)

  return info
}

export function setNumberInfo(info: NumberInfo, value: number, zeros: number = 0) {
  info[0] = value
  info[1] = zeros
  info[2] = value % 9 || 9 // digital root
  info[3] = String(value).length
}
