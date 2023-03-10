/* eslint-disable no-undef */
const { palindrome } = require('../utils/for_testing')

test.skip('palindrome of lautaro', () => {
	const result = palindrome('lautaro')

	expect(result).toBe('oratual')
})

test.skip('palindrome of empty string', () => {
	const result = palindrome('')

	expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
	const result = palindrome()

	expect(result).toBeUndefined()
})
