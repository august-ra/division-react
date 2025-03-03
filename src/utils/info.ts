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


export function calcUnits(value: number, unit_0: string, unit_1: string, unit_2: string): string {
  let reminder: number = value % 100

  if (reminder >= 11 && reminder <= 19)
    return unit_0

  reminder = reminder % 10

  if (reminder === 1)
    return unit_1
  else if (reminder >= 2 && reminder <= 4)
    return unit_2
  else
    return unit_0
}


export function calcSumOfDigits(digits: string): number {
  return digits.split("").reduce((acc: number, digit: string) => acc + Number(digit), 0)
}
