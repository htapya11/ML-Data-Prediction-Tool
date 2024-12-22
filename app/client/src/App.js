import "./app.scss"
import {
  Form,
  FormGroup,
  Select,
  SelectItem,
  Button,
  Loading
} from "carbon-components-react"
import {years, months, costCenters, accounts} from "./utils"
import { useState } from "react";
import axios from "axios"
function App() {

  const [year, setYear] = useState(2020)
  const [month, setMonth] = useState("Jan")
  const [costCenter, setCostCenter] = useState("CC101")
  const [account, setAccount] = useState(1000000)
  const [prediction, setPrediction] = useState()
  const [scores, setScores] = useState([])

  const runPred = async(year, month, costCenter, account) => {
    setPrediction("Scoring")
    const res = await axios.post("/api/wml/score", {
      year,
      month,
      costCenter,
      account,
    })
    setPrediction(res.data.values[0])
    setScores([...scores,
      {group:year+month+costCenter+account, value:res.data.values[0][0]},
    ])
    console.log(res)
  }

  return (
    <div className="App">
      <header className="mainContainer">
        <Form>
          <FormGroup>
            <Select id="select-0" labelText="Select Year" onChange={e=>setYear(e.target.value)}>
              {years.map((yearVal => (<SelectItem text={yearVal} value={yearVal} />
              )))}
            </Select>
          </FormGroup>
        </Form>
        <Form>
          <FormGroup>
            <Select id="select-1" labelText="Select Month" onChange={e=>setMonth(e.target.value)}>
              {months.map((monthVal => (<SelectItem text={monthVal} value={monthVal} />
              )))}
            </Select>
          </FormGroup>
        </Form>
        <Form>
          <FormGroup>
            <Select id="select-2" labelText="Select Cost Center" onChange={e=>setCostCenter(e.target.value)}>
              {costCenters.map((costCentersVal => (<SelectItem text={costCentersVal} value={costCentersVal} />
              )))}
            </Select>
          </FormGroup>
        </Form>
        <Form>
          <FormGroup>
            <Select id="select-3" labelText="Select Account" onChange={e=>setAccount(e.target.value)}>
              {accounts.map((accountVal => (<SelectItem text={accountVal} value={accountVal} />
              )))}
            </Select>
          </FormGroup>
          <Button onChange={e=>runPred(year, month, costCenter, account)}>Predict</Button>
        </Form>
        <div className="predictionContainer">
          {prediction !=="Scoring" && prediction ? 
          "The model predicted":""}
        <div className="predictionResult">
          {prediction=="Scoring" ? (<Loading description="Loading..." />) : !prediction ? "" : parseInt(prediction)}
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
