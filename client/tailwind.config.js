/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				base: 'rgb( var(--base) / <alpha-value> )',
				'base-light': 'rgb( var(--base-light) / <alpha-value> )',

				primary: 'rgb( var(--primary) / <alpha-value> )',
				'primary-light': 'rgb( var(--primary-light) / <alpha-value> )',

				secondary: 'rgb( var(--secondary) / <alpha-value> )',
				'secondary-light': 'rgb( var(--secondary-light) / <alpha-value> )',

				info: 'rgb( var(--info) / <alpha-value> )',
				'info-light': 'rgb( var(--info-light) / <alpha-value> )',
			},
		},
	},
	plugins: [],
};
