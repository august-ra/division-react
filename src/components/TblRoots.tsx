import React from "react"

import type { NumberInfo, StepInfo } from "../utils/types"


interface Props {
  pairs: StepInfo[]
}

function TblRoots({ pairs }: Props) {
  return (
    <table className="digital-roots">
      <tbody>
        <tr>
          <td></td>
          <td title="digital roots">&nbsp;dr&nbsp;</td>
        </tr>

        {
          pairs.map((pair: StepInfo, index: number) => {
            const first:  NumberInfo        = pair[0]
            const second: NumberInfo | null = pair[1]

            return (
              <React.Fragment key={index}>
                <tr>
                  <td>{first[3]}</td>
                  <td>{first[2]}</td>
                </tr>

                {
                  second
                    && (
                      <tr>
                        <td className="second">{second[3]}</td>
                        <td className="second">{second[2]}</td>
                      </tr>
                    )
                }
              </React.Fragment>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default React.memo(TblRoots)
