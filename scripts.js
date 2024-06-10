new Vue({
    el: '#app',
    data: {
        characters: [],
        searchQuery: ''
    },
    created() {
        this.fetchCharacters();
    },
    methods: {
        async fetchCharacters() {
            const query = this.searchQuery.trim();
            const url = query ? `https://rickandmortyapi.com/api/character/?name=${query}` : 'https://rickandmortyapi.com/api/character';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.characters = data.results;
            } catch (error) {
                console.error('Fetching error:', error);
                this.characters = [];
            }
        }
    }
});
