/* eslint-disable no-undef */
const { average } = require('../utils/for_testing')

describe.skip('average', () => {
	test('of one value is the value itself', () => {
		expect(average([1])).toBe(NaN)
	})
})
