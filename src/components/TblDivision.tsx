import React, { useEffect, useState } from "react"

import TblResult from "./TblResult"
import TblRoots from "./TblRoots"

import { fillStepInfo, getLastStepInfo } from "../utils/info"
import type { NumberInfo, StepInfo } from "../utils/types"


interface Props {
  dividend: number
  divisor:  number
}

export default function TblDivision({ dividend, divisor }: Props) {
  const [pairs]   = useState<StepInfo[]>([])
  const [results] = useState<Record<number, number>>({})

  const [quotient, setQuotient] = useState<string>("")
  const [periodic, setPeriodic] = useState<string>("")

  useEffect(() => {
    if (pairs.length)
      return

    let step:   number = 0
    let first:  number = dividend
    let second: number = 0

    let result: string = ""

    const numbers: number[] = Array.from({ length: 9 }).map(() => {
      second += divisor
      return second
    })

    while (step < 1000) {
      const stepInfo: StepInfo = [[0, 0, 0, 0], [0, 0, 0, 0], 1, false]
      let   zeros:    number   = -1

      second = numbers[0]

      results[first] = step

      while (first < second) {
        first *= 10
        ++zeros

        results[first] = step
      }

      if (zeros >= 0) {
        if (step === 0)
          result = "0."

        if (zeros > 0)
          result += "0".repeat(zeros)
      }

      let quotient: number = 1

      while (first > numbers[quotient]) {
        second = numbers[quotient]

        ++quotient
      }

      result += quotient

      fillStepInfo(stepInfo, first, zeros + 1, second, quotient)

      pairs.push(stepInfo)

      first = first - second

      if (results[first] >= 0) {
        step = results[first]
        pairs[step][3] = true

        setPeriodic(pairs.reduce((acc: string, item: StepInfo, index: number) => {
          if (index < step)
            return ""

          let zeros = item[0][1]

          if (index === step)
            zeros -= String(item[0][0]).length - String(first).length
          else
            --zeros

          if (zeros > 0)
            return acc + "0".repeat(zeros) + item[2]
          else
            return acc + item[2]
        }, ""))

        const stepInfo: StepInfo = getLastStepInfo(first)
        pairs.push(stepInfo)

        break
      }

      ++step
    }

    setQuotient(result)
  }, [dividend, divisor])

  if (quotient === "")
    return null

  let previous: NumberInfo | null = null
  let offset:   number            = 0

  return (
    <div className="division">
      <TblRoots pairs={pairs} />

      <table>
        <tbody>
          <tr>
            <td>&nbsp;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td rowSpan={2}>
              <TblResult divisor={divisor} quotient={quotient} periodic={periodic} />
            </td>
          </tr>

          {
            pairs.map((pair: StepInfo, index: number) => {
              const first:  NumberInfo        = pair[0]
              const second: NumberInfo | null = pair[1]

              const zeros: string = "0".repeat(first[1])
              const str1:  string = String(first[0])
              const str2:  string = second ? String(second[0]) : ""

              const localOffset = previous ? previous[3] - first[3] + first[1] : 0
              offset += localOffset

              previous = first

              return (
                <React.Fragment key={`DP.${index}`}>
                  <tr>
                    {
                      Array.from({ length: offset }).map((_, index: number) => (
                        <td key={`DFS.${index}`} />
                      ))
                    }

                    {
                      second
                        ? (
                          <td className="minus" rowSpan={2}>&minus;</td>
                        )
                        : (
                          <td></td>
                        )
                    }

                    {
                      str1.slice(0, -first[1] || 100).split("").map((item: string, index: number, array: string[]) => (
                        offset === 0 && index === array.length - 1
                          ? (
                            <td key={`DFD.${index}`} className="first" data-root={`${first[2]}`}>
                              {item}
                              <div className="dot">.</div>
                            </td>
                          )
                          : (
                            <td key={`DFD.${index}`} className="first" data-root={`${first[2]}`}>{item}</td>
                          )
                      ))
                    }
                    {
                      zeros.split("").map((_, index: number) => (
                        <td key={`DFZ.${index}`} className="zero" data-root={`${first[2]}`}>0</td>
                      ))
                    }
                  </tr>

                  {
                    str2
                      && (
                        <tr key={`DS.${index}`} className="second">
                          {
                            Array.from({ length: offset }).map((_, index: number) => (
                              <td key={`DSS.${index}`} />
                            ))
                          }

                          {
                            str1.length - str2.length
                              ? (
                                <td className="second"></td>
                              )
                              : null
                          }

                          {
                            str2.split("").map((item: string, index:number) => (
                              <td key={`DSD.${index}`} className="second" data-root={`${second![2]}`}>{item}</td>
                            ))
                          }
                        </tr>
                      )
                  }
                </React.Fragment>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
