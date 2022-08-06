//jesli chcemy znalezc cene produktu ktory ans interesuje mozemy wykonac to w ponizszy sposob 'find-price'

const handlebarsHelpers = {
    'find-price': (entries,selectedItem)=>{
        console.log({entries, selectedItem});
        const found = entries.find(el => el[0] === selectedItem);
        if(!found){
            throw new Error(`Cannot find price of "${selectedItem}".`);
        } else{
            const[, price] = found;
            return price
        }
    },

    pricify: price => price.toFixed(2),

    isNotInArray: (array,element) => !array.includes(element),
    isInArray: (array, element) => array.includes(element),

};

module.exports = {
    handlebarsHelpers
}