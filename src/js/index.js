// Global app controller

import Search from './models/Search';
import { elements } from './views/base';
import * as searchView from './views/searchView';

/*
 ! GLOBAL STATE
 * - Search Object
 * - Current recipe object
 * - Shooping list objst
 * - Liked Recipes
 */
const state = {};

const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        // 2. New search object and add it state
        state.search = new Search(query);

        // 3. Prepare UI for results (search spinner);
        searchView.clearInput();
        searchView.clearResults();

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
        searchView.renderResults(state.search.result);
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // ? Stops the reloading
    controlSearch();
});