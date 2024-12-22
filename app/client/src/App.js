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
function App() {
  return (
    <div className="App">
      <header className="mainContainer">
        <Form>
          <FormGroup>
            <Select id="select-0" labelText="Select Year">
              {years.map((yearVal => (<SelectItem text={yearVal} value={yearVal} />
              )))}
            </Select>
          </FormGroup>
        </Form>
        <Form>
          <FormGroup>
            <Select id="select-1" labelText="Select Month">
              {months.map((monthVal => (<SelectItem text={monthVal} value={monthVal} />
              )))}
            </Select>
          </FormGroup>
        </Form>
        <Form>
          <FormGroup>
            <Select id="select-2" labelText="Select Cost Center">
              {costCenters.map((costCentersVal => (<SelectItem text={costCentersVal} value={costCentersVal} />
              )))}
            </Select>
          </FormGroup>
        </Form>
        <Form>
          <FormGroup>
            <Select id="select-3" labelText="Select Account">
              {accounts.map((accountVal => (<SelectItem text={accountVal} value={accountVal} />
              )))}
            </Select>
          </FormGroup>
          <Button>Predict</Button>
        </Form>
      </header>
    </div>
  );
}

export default App;
