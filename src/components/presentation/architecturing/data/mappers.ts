/** Content for the "Mappers" slide: first without a domain, then with one */

import type { Comparison, DiagramLayer, Snippet } from './types';

export interface ModelCard {
	layer: 'data' | 'domain' | 'presentation';
	/** Drawn dashed: only add it when it is needed */
	optional?: boolean;
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

/** Without a domain: data hands presentation this, never the DTO */
export const dataModel: ModelCard = {
	layer: 'data',
	code: `
data class OrderDataModel(
    val id: String,
    val total: Money,
    val status: OrderStatus,
    val note: String,
)`,
};

/** With a domain: data maps straight to this instead of a data model */
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
	optional: true,
	code: `
internal data class OrderUiModel(
    val total: String,
    val statusLabel: String,
    val note: String,
)`,
};

const optionalUi = 'Optional: only when the screen needs its own shape; otherwise it shows the model as is';

/** Without a domain: data makes the DTO valid; presentation may format it */
export const dataMappers: Snippet[] = [
	{
		lives: 'data',
		title: 'toDataModel()',
		note: 'Makes it valid: decides what "missing" means, so the DTO never leaves data',
		code: `
// data/mapper/OrderMapper.kt
internal fun OrderDto.toDataModel(): OrderDataModel? {
    val id = id ?: return null
    val cents = totalPriceCents ?: return null
    return OrderDataModel(
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
		note: optionalUi,
		code: `
// presentation/mapper/OrderUiMapper.kt
internal fun OrderDataModel.toUiModel() = OrderUiModel(
    total = total.format(),
    statusLabel = status.label(),
    note = note.ifEmpty { "—" },
)`,
	},
];

/** With a domain: the same two jobs, but data maps straight to the domain model */
export const domainMappers: Snippet[] = [
	{
		lives: 'data',
		title: 'toDomain()',
		note: 'Same job, new target: the domain model takes the data model’s place',
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
		note: optionalUi,
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
// data/model/OrderDataModel.kt
internal data class OrderDataModel(val id: String, ...) {
    // data now imports a presentation class
    fun toUiModel(): OrderUiModel = ...
}`,
	},
	right: {
		tone: 'good',
		label: 'Separate files',
		code: `
// data/mapper/OrderMapper.kt
internal fun OrderDto.toDataModel(): OrderDataModel? = ...

// presentation/mapper/OrderUiMapper.kt
internal fun OrderDataModel.toUiModel(): OrderUiModel = ...`,
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
// domain/model/OrderDomainModel.kt
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

/** Where the mapper files live, without and with a domain; the data model gives way to the domain model */
export const mapperFiles: DiagramLayer[] = [
	{ key: 'presentation', files: [{ name: 'OrderUiMapper.kt' }] },
	{ key: 'data', files: [{ name: 'OrderDto.kt' }, { name: 'OrderDataModel.kt' }, { name: 'OrderMapper.kt' }] },
];

export const mapperFilesWithDomain: DiagramLayer[] = [
	{ key: 'presentation', files: [{ name: 'OrderUiMapper.kt' }] },
	{ key: 'domain', files: [{ name: 'OrderDomainModel.kt' }] },
	{ key: 'data', files: [{ name: 'OrderDto.kt' }, { name: 'OrderMapper.kt' }] },
];
