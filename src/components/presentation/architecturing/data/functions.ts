/** Content for the "Small functions, clear names" slide */

import type { Comparison } from './types';

/** One function doing every job, split into small functions that each do one thing */
export const splitFunction = {
	beforeLabel: 'One function doing everything',
	afterLabel: 'Small functions, each doing one thing',
	beforeNote: 'To know what it does, you have to read how it does it',
	afterNote: 'The top reads like a story; the details wait below, each with a name',
	before: `
// presentation/RegisterViewModel.kt
fun onRegisterClick(form: RegisterForm) {
    if (!form.email.contains("@")) {
        _uiState.update { it.copy(error = "Invalid email") }
        return
    }
    if (form.password.length < 8) {
        _uiState.update { it.copy(error = "Password too short") }
        return
    }
    viewModelScope.launch { authRepository.register(form) }
}`,
	after: `
// presentation/RegisterViewModel.kt
fun onRegisterClick(form: RegisterForm) {
    val error = validationError(form)
    if (error == null) register(form) else showError(error)
}

private fun validationError(form: RegisterForm): String? = when {
    !form.email.contains("@") -> "Invalid email"
    form.password.length < 8 -> "Password too short"
    else -> null
}

private fun showError(message: String) = _uiState.update { it.copy(error = message) }
private fun register(form: RegisterForm) =
    viewModelScope.launch { authRepository.register(form) }`,
};

/** A quick test for "does one thing" */
export const oneThingTest = 'Can you describe it without saying "and"?';

/** Every line of a function should sit at the same level: steps, not details */
export const oneLevel: Comparison = {
	left: {
		tone: 'bad',
		label: 'Mixed levels',
		code: `
fun onRegisterClick(form: RegisterForm) {
    val error = validationError(form)
    if (error != null) {
        _uiState.update { it.copy(error = error) }
        return
    }
    register(form)
}`,
	},
	right: {
		tone: 'good',
		label: 'One level',
		code: `
fun onRegisterClick(form: RegisterForm) {
    val error = validationError(form)
    if (error == null) register(form) else showError(error)
}`,
	},
	reasons: [
		'Each line is one step of the story',
		'Details live one level down, behind a name',
		'Read the top; dive in only when you need to',
	],
};

/** Names that say what, so the reader can skip the how */
export interface NamingTip {
	bad: string;
	good: string;
	why: string;
}

export const naming: NamingTip[] = [
	{ bad: 'data', good: 'unreadMessages', why: 'Say what it holds' },
	{ bad: 'handle()', good: 'register()', why: 'A function name is a verb' },
	{ bad: 'flag', good: 'isLoggedIn', why: 'A boolean reads as a question' },
	{ bad: 'validateAndSave()', good: 'validate() + save()', why: 'Need "and"? It\'s two functions' },
];

export const namingClosing = 'A good name lets the reader skip the code.';

/** Comments: the name already says what, so a comment earns its place by saying why */
export const comments: Comparison = {
	left: {
		tone: 'bad',
		label: 'Repeats the code',
		code: `
// check if password is shorter than 8
if (form.password.length < 8) ...`,
	},
	right: {
		tone: 'good',
		label: 'Explains the reason',
		code: `
// The auth API rejects passwords under 8 characters
if (form.password.length < MIN_PASSWORD_LENGTH) ...`,
	},
	reasons: [
		'Comment says what? Try a better name first',
		'Comments go stale; names change with the code',
		'Delete commented-out code: git remembers it',
	],
};
