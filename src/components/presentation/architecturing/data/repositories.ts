/** Content for the "Who asks for the data?" slide: repositories without a domain, with one, then use cases */

import type { Comparison, DiagramLayer, Snippet } from './types';

/** Where the files live; when the domain appears, the contract moves into it */
export const filesWithoutDomain: DiagramLayer[] = [
	{ key: 'presentation', files: [{ name: 'OrderViewModel.kt' }] },
	{ key: 'data', files: [{ name: 'OrderRepository.kt', highlight: true }, { name: 'OrderRepositoryImpl.kt' }] },
];

export const filesWithDomain: DiagramLayer[] = [
	{ key: 'presentation', files: [{ name: 'OrderViewModel.kt' }] },
	{ key: 'domain', files: [{ name: 'OrderRepository.kt', highlight: true }, { name: 'PlaceOrderUseCase.kt' }] },
	{ key: 'data', files: [{ name: 'OrderRepositoryImpl.kt' }] },
];

/** Without a domain: the contract and its implementation both live in data */
export const withoutDomain: { snippets: Snippet[] } = {
	snippets: [
		{
			title: 'OrderRepository',
			lives: 'data',
			note: "Swap the real one for a fake: the ViewModel doesn't change",
			code: `
// data/repository/OrderRepository.kt
interface OrderRepository { suspend fun getOrders(): List<OrderDto> }

// data/repository/OrderRepositoryImpl.kt
internal class OrderRepositoryImpl(private val api: OrderApi) : OrderRepository {
    override suspend fun getOrders() = api.getOrders()
}

// test/FakeOrderRepository.kt
internal class FakeOrderRepository : OrderRepository {
    override suspend fun getOrders() = listOf(sampleOrder)
}`,
		},
		{
			title: 'OrderViewModel',
			lives: 'presentation',
			note: 'Knows the contract, not where the orders come from',
			code: `
// presentation/OrderViewModel.kt
internal class OrderViewModel(
    private val repository: OrderRepository,
) : ViewModel() {
    suspend fun load() = repository.getOrders()
        .map { it.toUiModel() }
}`,
		},
	],
};

/** With a domain: the contract moves into it; the implementation stays in data */
export const withDomain: { snippets: Snippet[] } = {
	snippets: [
		{
			title: 'OrderRepository',
			lives: 'domain',
			note: 'The domain says what it needs, in its own models',
			code: `
// domain/repository/OrderRepository.kt
internal interface OrderRepository {
    suspend fun getOrders(): List<OrderDomainModel>
}`,
		},
		{
			title: 'OrderRepositoryImpl',
			lives: 'data',
			note: 'Data provides how, and maps to domain models on the way out',
			code: `
// data/repository/OrderRepositoryImpl.kt
internal class OrderRepositoryImpl(
    private val api: OrderApi,
) : OrderRepository {
    override suspend fun getOrders() =
        api.getOrders().mapNotNull { it.toDomain() }
}`,
		},
	],
};

/** Simple logic talks to the repository directly; complex logic earns a use case */
export const useCases: Comparison = {
	left: {
		tone: 'neutral',
		label: 'Simple: no use case needed',
		code: `
// presentation/OrderListViewModel.kt
internal class OrderListViewModel(
    private val repository: OrderRepository,
) : ViewModel() {
    // nothing to decide: just show the orders
    suspend fun load() = repository.getOrders()
        .map { it.toUiModel() }
}`,
	},
	right: {
		tone: 'good',
		label: 'Complex: a use case earns its place',
		code: `
// domain/usecase/PlaceOrderUseCase.kt
class PlaceOrderUseCase(
    private val cart: CartRepository, private val inventory: InventoryRepository,
    private val promos: PromoRepository, private val orders: OrderRepository,
) {
    suspend operator fun invoke(promoCode: String?): Result<OrderDomainModel> {
        val items = cart.getItems()
        if (items.any { !inventory.isAvailable(it) }) return Result.failure(OutOfStock)
        val promo = promoCode?.let { promos.find(it) }
        // a discount is never more than 50% of the subtotal
        val discount = minOf(promo?.discountFor(items) ?: Money.ZERO, items.subtotal / 2)
        return orders.create(items, total = items.subtotal - discount + shipping(items))
    }
}`,
	},
	reasons: [
		'Combines several repositories',
		'Rules must be the same on every screen',
		'Used by more than one screen',
		'Many branches worth testing',
	],
};
