/** Content for the "References" slide: what this talk was built on, grouped by topic */

export interface Reference {
	title: string;
	source: string;
	/** Books have no link */
	url?: string;
}

export interface ReferenceGroup {
	topic: string;
	items: Reference[];
}

export const referenceGroups: ReferenceGroup[] = [
	{
		topic: 'Modules & layers',
		items: [
			{ title: 'The "Real" Modularization in Android', source: 'Denis Brandi · Medium', url: 'https://medium.com/clean-android-dev/the-real-clean-architecture-in-android-modularization-e26940fd0a23' },
			{ title: 'Guide to app modularization', source: 'Android Developers', url: 'https://developer.android.com/topic/modularization' },
			{ title: 'Presentation Domain Data Layering', source: 'Martin Fowler', url: 'https://martinfowler.com/bliki/PresentationDomainDataLayering.html' },
		],
	},
	{
		topic: 'Direction & coupling',
		items: [
			{ title: 'The Clean Architecture', source: 'Robert C. Martin', url: 'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html' },
			{ title: 'The Onion Architecture: part 1', source: 'Jeffrey Palermo', url: 'https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/' },
		],
	},
	{
		topic: 'Repositories, use cases & mappers',
		items: [
			{ title: 'The "Real" Repository Pattern in Android', source: 'Denis Brandi · Medium (ProAndroidDev)', url: 'https://proandroiddev.com/the-real-repository-pattern-in-android-efba8662b754' },
			{ title: 'Repository', source: 'Martin Fowler', url: 'https://martinfowler.com/eaaCatalog/repository.html' },
			{ title: 'Domain layer', source: 'Android Developers', url: 'https://developer.android.com/topic/architecture/domain-layer' },
		],
	},
	{
		topic: 'Clean code',
		items: [
			{ title: 'Software Architecture Design Principles: KISS, YAGNI, DRY', source: 'Mehmet Ozkaya · Medium', url: 'https://medium.com/design-microservices-architecture-with-patterns/software-architecture-design-principles-kiss-yagni-dry-341ce969212c' },
			{ title: 'The Wrong Abstraction', source: 'Sandi Metz', url: 'https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction' },
			{ title: 'Function Length', source: 'Martin Fowler', url: 'https://martinfowler.com/bliki/FunctionLength.html' },
		],
	},
	{
		topic: 'SOLID',
		items: [
			{ title: 'The "Real" Clean Architecture in Android: S.O.L.I.D.', source: 'Denis Brandi · Medium', url: 'https://medium.com/clean-android-dev/the-real-clean-architecture-in-android-part-1-s-o-l-i-d-6a661b103451' },
			{ title: 'The Principles of OOD', source: 'Robert C. Martin', url: 'http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod' },
		],
	},
	{
		topic: 'Books',
		items: [
			{ title: 'Clean Code', source: 'Robert C. Martin' },
			{ title: 'Clean Architecture', source: 'Robert C. Martin' },
			{ title: 'The Pragmatic Programmer (where DRY comes from)', source: 'David Thomas & Andrew Hunt' },
		],
	},
];
