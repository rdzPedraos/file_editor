const repeatValue = (value, times) => {
	return Array.from({ length: times }, () => value).join(' ');
};

export { repeatValue };
