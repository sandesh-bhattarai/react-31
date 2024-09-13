export const setErrorMsg = (exception: any, setError: any) => {
	if (exception.status === 400 && exception.data.result !== null) {
		Object.keys(exception.data.result).map((field: any) => {
			setError(field, { message: exception.data.result[field] });
		});
	}
};

export function setCookie(cname: string, cvalue: string, exdays: number) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname: string) {
	let name = cname + "=";
	let ca = document.cookie.split(";"); // ['name=""','epries=""','path=""']

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		//
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

export function ucFirst(str: any) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatToYMD = (date: Date | string) => {
	const dateObj = new Date(date);
	// YYYY-MM-DD
	const year = dateObj.getFullYear()		// YYYY
	const month = `${dateObj.getMonth()+1}`.padStart(2 , '0')			// 1-12 
	const day = `${dateObj.getDate()}`.padStart(2, '0')				// 1-31
	
	return `${year}-${month}-${day}`;
};
