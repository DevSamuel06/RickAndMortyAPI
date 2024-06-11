new Vue({
    el: '#app',
    data: {
        characters: [],
        searchQuery: '',
        isLoading: false,
        error: null,
        selectedCharacter: null
    },
    created() {
        this.fetchCharacters();
    },
    methods: {
        async fetchCharacters() {
            this.isLoading = true;
            this.error = null;
            const query = this.searchQuery.trim();
            const url = query ? `https://rickandmortyapi.com/api/character/?name=${query}` : 'https://rickandmortyapi.com/api/character';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Erro na rede: ' + response.statusText);
                }
                const data = await response.json();
                this.characters = data.results;
            } catch (error) {
                console.error('Erro ao buscar personagens:', error);
                this.error = 'Ocorreu um erro ao buscar os personagens. Tente novamente mais tarde.';
                this.characters = [];
            } finally {
                this.isLoading = false;
            }
        },
        showCharacterDetails(character) {
            this.selectedCharacter = character;
        },
        closeModal() {
            this.selectedCharacter = null;
        }
    }
});
