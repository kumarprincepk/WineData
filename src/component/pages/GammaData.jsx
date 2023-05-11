import React from "react";
import data from "../database/Data";

const GammaData = () => {
    // Function to calculate the mean of an array
    function meanClass(arr) {
        let sum = 0; // Variable to store the sum of all elements in the array
        for (let num of arr) {
            // Iterate over each number in the array
            sum += num; // Add the current number to the sum
        }
        return (sum / arr.length).toFixed(3); // Calculate the mean by dividing the sum by the array length and round to three decimal places
    }

    // Function to calculate the median of an array
    function medianClass(array) {
        array = array.sort((a, b) => a - b); // Sort the array in ascending order

        if (array.length % 2 !== 0) {
            // If the array length is odd
            return array[Math.floor(array.length / 2)].toFixed(3); // Return the middle element
        } else {
            // If the array length is even
            let mid1 = array[array.length / 2]; // Get the value of the element at the second middle position
            let mid2 = array[array.length / 2 - 1]; // Get the value of the element at the first middle position
            return ((mid1 + mid2) / 2).toFixed(3); // Return the average of the two middle elements
        }
    }

    // Function to calculate the mode(s) of an array
    function modeClass(arr) {
        const arrObj = {}; // Object to store the frequency of elements
        arr.forEach((elem) => {
            if (!arrObj[elem]) {
                // If the element does not exist as a property in the object
                arrObj[elem] = 0; // Initialize its count to 0
            }
            arrObj[elem]++; // Increment the count of the element
        });

        let result = []; // Array to store the mode(s)
        let max = 0; // Variable to store the maximum frequency

        for (let key in arrObj) {
            // Iterate over the object properties (elements) and their counts
            if (arrObj[key] > max) {
                // If the current element's count is greater than the maximum frequency
                result = [key]; // Set the current element as the new mode
                max = arrObj[key]; // Update the maximum frequency
            } else if (arrObj[key] === max) {
                // If the current element's count is equal to the maximum frequency
                result.push(key); // Add the current element to the modes array
            }
        }

        if (Object.keys(arrObj).length === result.length) {
            // If the number of unique elements is equal to the number of modes
            result = []; // Reset the modes array to empty (no distinct mode)
        }

        return result.map((num) => Number(num).toFixed(3)); // Convert modes to fixed decimal numbers
    }
    // Calculate gamma values for different alcohol classes
    const gamma1 = data?.filter(item => item.Alcohol === 1)?.map((item) => (item.Ash * item.Hue) / item.Magnesium);
    const gamma2 = data?.filter(item => item.Alcohol === 2)?.map((item) => (item.Ash * item.Hue) / item.Magnesium);
    const gamma3 = data?.filter(item => item.Alcohol === 3)?.map((item) => (item.Ash * item.Hue) / item.Magnesium);

    // Get unique alcohol classes
    const alcoholClasses = [...new Set(data.map(item => item.Alcohol))];

    return (
        <div>
            <h1>Gamma Data</h1>
            <table>
                <tr>
                    <th>Measure</th>
                    {alcoholClasses.map((alcoholClass, index) => (
                        <th key={index}>Class {alcoholClass}</th>
                    ))}
                </tr>
                <tr>
                    <th>Gamma <br /> Mean</th>
                    {alcoholClasses.map((alcoholClass, index) => {
                        const arr = data
                            ?.filter(item => item.Alcohol === alcoholClass)
                            ?.map((item) => (item.Ash * item.Hue) / item.Magnesium);
                        return <td key={index}>{meanClass(arr)}</td>;
                    })}
                </tr>
                <tr>
                    <th>Gamma <br /> Median</th>
                    {alcoholClasses.map((alcoholClass, index) => {
                        const arr = data
                            ?.filter(item => item.Alcohol === alcoholClass)
                            ?.map((item) => (item.Ash * item.Hue) / item.Magnesium);
                        return <td key={index}>{medianClass(arr)}</td>;
                    })}
                </tr>
                <tr>
                    <th>Gamma <br /> Mode</th>
                    {alcoholClasses.map((alcoholClass, index) => {
                        const arr = data
                            ?.filter(item => item.Alcohol === alcoholClass)
                            ?.map((item) => (item.Ash * item.Hue) / item.Magnesium);
                        return <td key={index}>{modeClass(arr) === [] ? modeClass(arr) : "Not Finding Mode"}</td>;
                    })}
                </tr>
            </table>
        </div>
    )
}

export default GammaData;