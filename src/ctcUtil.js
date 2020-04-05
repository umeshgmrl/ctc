const PF_RATE = 0.2561;
const PROFESSIONAL_TAX = 2.5;
const PRESUMPTIVE_RATE = 0.5;
const EMPLOYEE_TAX_DEDUCTION = 160;
const GST_RATE = 0;
const SLAB_1 = 250;
const SLAB_2 = 500;
const SLAB_3 = 1000;

const lac = (amount) => amount * 100;

const income_tax_slab_1 = (income) => {
	if (income <= SLAB_1) {
		return 0;
	}
	if (income > SLAB_2) {
		income = SLAB_2;
		income -= SLAB_1;
		return income * 0.05;
	}
};

const income_tax_slab_2 = (income) => {
	if (income <= SLAB_2) {
		return 0;
	}
	if (income > SLAB_3) {
		income = SLAB_3;
		income -= SLAB_2;
	}
	return income * 0.2;
};

const income_tax_slab_3 = (income) => {
	if (income <= SLAB_3) {
		return 0;
	}
	income -= SLAB_3;
	return income * 0.3;
};

const income_tax_for = (income) => {
	if (income <= 500) {
		return 0;
	}
	const tax =
		income_tax_slab_1(income) +
		income_tax_slab_2(income) +
		income_tax_slab_3(income);
	let cess = tax * 0.04;
	let surcharge = 0;
	if (income >= lac(100)) {
		console.log('Warning: ignoring surcharge for high income');
	}
	if (income >= lac(50)) {
		surcharge = tax * 0.1;
	}
	return tax + cess + surcharge;
};
const income_and_professional_tax_for = (income) => {
	return income_tax_for(income) + PROFESSIONAL_TAX;
};

const total_tax_for = (income, isEmployee) => {
	if (isEmployee) {
		return income_and_professional_tax_for(income - EMPLOYEE_TAX_DEDUCTION);
	}

	let EFFECTIVE_GST_RATE = GST_RATE / (1 + GST_RATE);
	let gst = income * EFFECTIVE_GST_RATE;
	income -= gst;
	income *= PRESUMPTIVE_RATE;
	return income_and_professional_tax_for(income) + gst;
};

const pf_for = (income) => Math.min(income, 15) * PF_RATE;

const take_home = (income, isEmployee = true) => {
	const tax = total_tax_for(income, isEmployee);
	const pf = isEmployee ? pf_for(income) : 0;
	income = income - tax - pf;
	return Math.floor(income / 12);
};


export const calcCtcToTakeHome = (income, isEmployee = true) => {
	if (!income) return "";
	return take_home(lac(income), isEmployee);
};

export const calcTakeHomeToCtc = (desired_take_home, isEmployee) => {
	if (!desired_take_home) return "";
	let ctc = 1;
	while (take_home(ctc, isEmployee) < desired_take_home) {
		ctc += 1;
	}
	return ctc/100;
};
