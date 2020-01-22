export const calculateAge = (birthYear: number, birthMonth: number, birthDay: number): number => {
	const date: Date = new Date();
	const year = date.getFullYear(); // current year
	const month = date.getMonth() + 1; // 1-12
	const day = date.getDate(); // 1-31
	if (month < birthMonth) {
		return year - birthYear - 1;
	} else if (month === birthMonth && day < birthDay) {
		return year - birthYear - 1;
	}
	return year - birthYear;
};
