import { getAllKeyboardIds, loadYamlFile } from '$lib/utils/keyboards';

export async function load() {
	const keyboardIds = await getAllKeyboardIds();
	const keyboards = [];

	for (let i = 0; i < keyboardIds.length; i++) {
		const id = keyboardIds[i];
		const keyboardData = await loadYamlFile('keyboards/' + id);
		keyboards.push({
			id: id,
			name: keyboardData?.name
		});
	}

	return {
		keyboards
	};
}
