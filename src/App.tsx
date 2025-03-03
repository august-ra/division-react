import { useState } from "react"
import "./App.css"

import TblDivision from "./components/TblDivision"


export default function App() {
  const [dividend] = useState<number>(1)
  const [divisor]  = useState<number>(589)

  return (
    <TblDivision dividend={dividend} divisor={divisor} />
  )
}
