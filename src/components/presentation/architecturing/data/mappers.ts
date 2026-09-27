/** Content for the "Mappers" slide: first without a domain, then with one */

import type { Comparison, DiagramLayer, Snippet } from './types';

export interface ModelCard {
	layer: 'data' | 'domain' | 'presentation';
	code: string;
}

export const dto: ModelCard = {
	layer: 'data',
	code: `
data class OrderDto(
    val id: String?,
    val totalPriceCents: Long?,
    val status: String?,
    val note: String?,
)`,
};

export const domainModel: ModelCard = {
	layer: 'domain',
	code: `
data class OrderDomainModel(
    val id: String,
    val total: Money,
    val status: OrderStatus,
    val note: String,
)`,
};

export const uiModel: ModelCard = {
	layer: 'presentation',
	code: `
internal data class OrderUiModel(
    val total: String,
    val statusLabel: String,
    val note: String,
)`,
};

/** Without a domain: one function handles missing data and formatting */
export const singleMapper: Snippet = {
	lives: 'presentation',
	title: 'toUiModel()',
	note: 'Does two jobs at once: decides what missing data means, and formats it for display',
	code: `
// presentation/mapper/OrderUiMapper.kt
internal fun OrderDto.toUiModel(): OrderUiModel = OrderUiModel(
    total = totalPriceCents?.let(::formatRupiah) ?: "Price unavailable",
    statusLabel = when (status) {
        "P" -> "Waiting for payment"
        "D" -> "Paid"
        else -> "Unknown"
    },
    note = note ?: "—",
)`,
};

/** With a domain: the same work split into two single-purpose functions */
export const splitMappers: Snippet[] = [
	{
		lives: 'data',
		title: 'toDomain()',
		note: 'Makes it valid: decides what "missing" means',
		code: `
// data/mapper/OrderMapper.kt
internal fun OrderDto.toDomain(): OrderDomainModel? {
    val id = id ?: return null
    val cents = totalPriceCents ?: return null
    return OrderDomainModel(
        id = id,
        total = Money(cents),
        status = status.toOrderStatus(),
        note = note.orEmpty(),
    )
}`,
	},
	{
		lives: 'presentation',
		title: 'toUiModel()',
		note: 'Makes it readable: only formats',
		code: `
// presentation/mapper/OrderUiMapper.kt
internal fun OrderDomainModel.toUiModel() = OrderUiModel(
    total = total.format(),
    statusLabel = status.label(),
    note = note.ifEmpty { "—" },
)`,
	},
];

/** Why a mapper lives in its own file, first without a domain */
export const separation: Comparison = {
	left: {
		tone: 'bad',
		label: 'Inside the model',
		code: `
// data/model/OrderDto.kt
internal data class OrderDto(val id: String?, ...) {
    // data now imports a presentation class
    fun toUiModel(): OrderUiModel = ...
}`,
	},
	right: {
		tone: 'good',
		label: 'Separate file',
		code: `
// presentation/mapper/OrderUiMapper.kt
internal fun OrderDto.toUiModel(): OrderUiModel = ...`,
	},
	reasons: [
		'Data never imports presentation, so dependencies point one way',
		'Models stay plain data; mapping has its own reason to change',
		"Works on DTOs you can't edit, like generated API clients",
	],
};

/** The same rule once there is a domain: the domain never sees a DTO */
export const separationWithDomain: Comparison = {
	left: {
		tone: 'bad',
		label: 'Inside the model',
		code: `
// domain/OrderDomainModel.kt
internal data class OrderDomainModel(val id: String, ...) {
    companion object {
        // the domain now imports a data class
        fun from(dto: OrderDto): OrderDomainModel = ...
    }
}`,
	},
	right: {
		tone: 'good',
		label: 'Separate files',
		code: `
// data/mapper/OrderMapper.kt
internal fun OrderDto.toDomain(): OrderDomainModel? = ...

// presentation/mapper/OrderUiMapper.kt
internal fun OrderDomainModel.toUiModel(): OrderUiModel = ...`,
	},
	reasons: [
		'The domain never imports a DTO, so dependencies still point inward',
		'Each mapper lives in the outer layer that owns it',
		'Easy to test alone, without the models knowing about each other',
	],
};

/** Where the mapper files live, without and with a domain */
export const mapperFiles: DiagramLayer[] = [
	{ key: 'presentation', files: [{ name: 'OrderUiMapper.kt' }] },
	{ key: 'data', files: [{ name: 'OrderDto.kt' }] },
];

export const mapperFilesWithDomain: DiagramLayer[] = [
	{ key: 'presentation', files: [{ name: 'OrderUiMapper.kt' }] },
	{ key: 'domain', files: [{ name: 'OrderDomainModel.kt' }] },
	{ key: 'data', files: [{ name: 'OrderDto.kt' }, { name: 'OrderMapper.kt' }] },
];
