import React, { useState } from 'react';
import { Paint } from './index';


export default PaintsList;

// This should handle various data filtering

const sortOptions = {
    AlphabeticalAsc: false,
    AlphabeticalDesc: false
}

const sortFunctions = {
    AlphabeticalAsc: AlphabeticalAsc,
    AlphabeticalDesc: AlphabeticalDesc,
}

function PaintsList(props) {

    const { paintData, onPaintClick } = props;

    const [selectedFilters, updateFilters] = useState(sortOptions);


    const sortChanged = (e) => {

        const ascInput = document.getElementById('AlphabeticalAsc');
        const descInput = document.getElementById('AlphabeticalDesc');

        const updatedValues = {
            AlphabeticalAsc: ascInput.checked,
            AlphabeticalDesc: descInput.checked
        };

        updateFilters(prevState => { return { ...prevState, ...updatedValues } });
    }

    // `const filterChanged = (e) => {
        //     // TODO:
    // }`

    const requestedSort = Object.keys(selectedFilters).find(f => selectedFilters[f]);

    let filteredData = paintData;

    // when filters are added do those first, then sort the results


    if (requestedSort) {
        filteredData = sortFunctions[requestedSort](paintData);
    }
        console.log(filteredData)
    return (
        <div>
            <input type="text" name="SearchBar" id="SearchBar" placeholder="Doesn't work yet....." />
            <div className="filters">
                <span className={`filter-button ${selectedFilters.AlphabeticalAsc ? 'active' : ''}`}>
                    <input type="radio" name="AlphabeticalDirection" id="AlphabeticalAsc" onChange={sortChanged} />
                    <label htmlFor="AlphabeticalAsc">A to Z</label>
                </span>
                <span className={`filter-button ${selectedFilters.AlphabeticalDesc ? 'active' : ''}`}>
                    <input type="radio" name="AlphabeticalDirection" id="AlphabeticalDesc" onChange={sortChanged} />
                    <label htmlFor="AlphabeticalDesc">Z to A</label>
                </span>
            </div>
            <ul className="paint-list">
                {
                    filteredData.map((paint, i) => {
                        return <Paint key={`paint${i}`} paint={paint} onPaintClick={onPaintClick} />
                    })
                }
            </ul>
        </div>
    )
}

function AlphabeticalAsc(data) {
    return data.sort((a, b) => a.name > b.name);
}

function AlphabeticalDesc(data) {
    return data.sort((a, b) => a.name < b.name);
}
