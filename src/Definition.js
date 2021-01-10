export { getDefinition }

async function getDefinition(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json()
    return data[0]?.meanings[0]?.definitions[0];
}