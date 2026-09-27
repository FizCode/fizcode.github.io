/**
 * Light Kotlin highlighting at build time: returns HTML with `tok-*` spans
 * (styled in presentation.css). Nullable types (`String?`) and the elvis
 * operator (`?:`) stand out, since slides use them to show where "missing"
 * data is handled.
 */

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Order matters: comments and strings first, so keywords inside them stay plain
const TOKENS: [RegExp, string][] = [
	[/\/\/.*/, 'comment'],
	[/"(?:[^"\\]|\\.)*"/, 'string'],
	[/\b(?:fun|val|var|data|class|interface|enum|companion|object|internal|private|override|suspend|operator|abstract|return|when|else|if|for|in|throw|null)\b/, 'keyword'],
	[/\b[A-Z]\w*\b/, 'type'],
	[/\?:|(?<=[\w>])\?/, 'nullable'],
];
const pattern = new RegExp(TOKENS.map(([re]) => `(${re.source})`).join('|'), 'g');

export function highlightKotlin(code: string): string {
	return escape(code).replace(pattern, (match, ...groups) => {
		const kind = TOKENS[groups.findIndex((g, i) => i < TOKENS.length && g !== undefined)][1];
		return `<span class="tok-${kind}">${match}</span>`;
	});
}
