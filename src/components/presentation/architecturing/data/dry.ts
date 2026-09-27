/** Content for the "Don't repeat yourself… wisely" slide */

import type { Comparison } from './types';

/** Real duplication: one business rule copied into two screens, then given one home */
export const duplicatedRule = {
	beforeLabel: 'The same rule, copied into two screens',
	afterLabel: 'One home for the rule',
	beforeNote: 'Change the 50% cap, and you have to find every copy',
	afterNote: 'Change it once; every screen follows',
	before: `
// presentation/CheckoutViewModel.kt
val discount = minOf(promo.amount, subtotal / 2)

// presentation/BuyNowViewModel.kt
val discount = minOf(promo.amount, subtotal / 2)`,
	after: `
// domain/usecase/PlaceOrderUseCase.kt
val discount = minOf(promo.amount, subtotal / 2)

// presentation/CheckoutViewModel.kt
placeOrder(promoCode)

// presentation/BuyNowViewModel.kt
placeOrder(promoCode)`,
};

/** Code that only looks alike is not repetition: the three models from the mapper slide */
export const lookAlike: Comparison = {
	left: {
		tone: 'bad',
		label: 'One Order for everything',
		code: `
// one model for every layer
internal data class Order(
    @SerialName("total_price_cents")
    val totalPriceCents: Long?,   // the API
    val status: OrderStatus,      // the rules
    val formattedTotal: String,   // the screen
)`,
	},
	right: {
		tone: 'good',
		label: 'Three models, three reasons to change',
		code: `
// changes with the API
internal data class OrderDto(...)

// changes with the business rules
internal data class OrderDomainModel(...)

// changes with the screen
internal data class OrderUiModel(...)`,
	},
	reasons: [
		'An API rename should not break the screen',
		'They look alike today, but change for different reasons',
		"That isn't repetition: it's three pieces of knowledge",
	],
};

/** The question to ask before merging look-alike code */
export const ruleOfThumb = {
	question: 'Would these change together, for the same reason?',
	yes: { answer: 'Yes: same knowledge', action: 'Give it one home, right away' },
	no: { answer: 'No: they only look alike', action: 'Keep the copies; extract when a third one appears' },
	quote: 'Duplication is far cheaper than the wrong abstraction.',
	author: 'Sandi Metz',
};
