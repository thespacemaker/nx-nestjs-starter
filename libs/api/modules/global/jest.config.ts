/* eslint-disable */
export default {
	displayName: 'api-modules-global',
	preset: '../../../../jest.preset.js',
	globals: {},
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../../../coverage/libs/api/modules/global',
};
