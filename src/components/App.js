import React from 'react';
import { calcCtcToTakeHome, calcTakeHomeToCtc } from "../ctcUtil";
import "./App.css";
class Home extends React.Component {
	state = {
		employeeCtc: "",
		employeeTakeHome: "",
		consultantCtc: "",
		consultantTakeHome: "",
	}

	onInputChange = e => {
		if (e.target.name === "employeeCtc") {
			const value = e.target.value;
			this.setState({
				employeeCtc: value,
				employeeTakeHome: calcCtcToTakeHome(value),
			});
		}
		if(e.target.name === "employeeTakeHome") {
			const value = e.target.value;
			this.setState({
				employeeTakeHome: value,
				employeeCtc: calcTakeHomeToCtc(value),
			});
		}
		if (e.target.name === "consultantCtc") {
			const value = e.target.value;
			this.setState({
				consultantCtc: value,
				consultantTakeHome: calcCtcToTakeHome(value, false),
			});
		}
		if(e.target.name === "consultantTakeHome") {
			const value = e.target.value;
			this.setState({
				consultantTakeHome: value,
				consultantCtc: calcTakeHomeToCtc(value, false),
			});
		}
	}

	render() {
		return (
			<div>
				<strong>Employee</strong><br/>
				<span>Take home CTC: </span>
				<input type="text" name="employeeCtc" value={this.state.employeeCtc} onChange={this.onInputChange}/>
				<span> lakhs</span>
				<span> gets </span>
				<input type="text" name="employeeTakeHome" value={this.state.employeeTakeHome} onChange={this.onInputChange}/>
				<span> thousands / month</span>
				<hr/>

				<strong>Consultant</strong><br/>
				<span>Take home CTC: </span>
				<input type="text" name="consultantCtc" value={this.state.consultantCtc} onChange={this.onInputChange}/>
				<span> lakhs</span>
				<span> gets </span>
				<input type="text" name="consultantTakeHome" value={this.state.consultantTakeHome} onChange={this.onInputChange}/>
				<span> thousands</span>
			</div>
		)
	}
}
export default Home;
