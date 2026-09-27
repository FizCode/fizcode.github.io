/** Content for the "Keep it simple" slide: KISS, YAGNI, then where the talk already used them */

export interface Principle {
	name: string;
	stands: string;
	beforeLabel: string;
	afterLabel: string;
	beforeNote: string;
	afterNote: string;
	before: string;
	after: string;
}

export const kiss: Principle = {
	name: 'KISS',
	stands: 'Keep It Simple, Stupid',
	beforeLabel: 'Clever',
	afterLabel: 'Simple',
	beforeNote: 'A lookup map, a let and an elvis in one line: it works, but you have to decode it',
	afterNote: 'Your teammate understands it in one read',
	before: `
// presentation/mapper/OrderStatusLabel.kt
internal fun statusLabel(status: String?): String =
    status?.let { mapOf("P" to "Waiting for payment", "D" to "Paid")[it] } ?: "Unknown"`,
	after: `
// presentation/mapper/OrderStatusLabel.kt
internal fun statusLabel(status: String?): String = when (status) {
    "P" -> "Waiting for payment"
    "D" -> "Paid"
    else -> "Unknown"
}`,
};

export const yagni: Principle = {
	name: 'YAGNI',
	stands: "You Aren't Gonna Need It",
	beforeLabel: '"We might need it someday"',
	afterLabel: 'What this screen needs today',
	beforeNote: 'Used by exactly one screen, yet everyone has to read, test and maintain it',
	afterNote: 'Add the abstraction when a second real need shows up',
	before: `
// data/repository/BaseRepository.kt
internal abstract class BaseRepository<T, ID>(
    private val cache: Cache<ID, T>,
    private val paginator: Paginator<T>,
    private val syncPolicy: SyncPolicy,
) {
    abstract suspend fun fetch(page: Int): List<T>
    suspend fun getAll(): List<T> = ...
}`,
	after: `
// domain/repository/OrderRepository.kt
internal interface OrderRepository {
    suspend fun getOrders(): List<OrderDomainModel>
}`,
};

/**
 * Where this talk already added structure only when there was a reason:
 * a mini picture of what the audience saw, then "start with … / add … when …"
 */
export interface RecapItem {
	sketch: 'domain' | 'module' | 'usecase' | 'mapper' | 'dry';
	start: string;
	add: string;
	when: string;
}

export const recap: RecapItem[] = [
	{ sketch: 'domain', start: 'presentation + data', add: 'a domain', when: 'business rules grow' },
	{ sketch: 'module', start: 'code inside one feature', add: 'a shared module', when: 'a second feature needs it' },
	{ sketch: 'usecase', start: 'ViewModel → repository', add: 'a use case', when: 'the logic gets complex' },
	{ sketch: 'mapper', start: 'one mapper', add: 'a second mapper', when: 'a domain arrives' },
	{ sketch: 'dry', start: 'a copy, if it only looks alike', add: 'one home', when: "it's the same business rule" },
];

export const closing = "Simple isn't sloppy. Build what today needs — well.";
