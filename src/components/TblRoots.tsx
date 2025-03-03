import React, { useState } from "react"

import type { NumberInfo, StepInfo } from "../utils/types"


interface Props {
  pairs: StepInfo[]
}

function TblRoots({ pairs }: Props) {
  const [activeRoot, setActiveRoot] = useState<number>(0)

  function toggleActiveRoot(value: number) {
    const element: HTMLElement = document.querySelector(":root")!
    element.style.setProperty(`--root-${activeRoot}`, "#ffffffdd")

    if (activeRoot !== value) {
      element.style.setProperty(`--root-${value}`, "yellow")
      setActiveRoot(value)
    } else {
      setActiveRoot(0)
    }
  }

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
                <tr onClick={() => toggleActiveRoot(first[2])}>
                  <td>{first[3]}</td>
                  <td data-root={`${first[2]}`}>{first[2]}</td>
                </tr>

                {
                  second
                    && (
                      <tr onClick={() => toggleActiveRoot(second[2])}>
                        <td className="second">{second[3]}</td>
                        <td className="second" data-root={`${second[2]}`}>{second[2]}</td>
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
