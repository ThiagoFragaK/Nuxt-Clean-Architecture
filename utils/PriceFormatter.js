export default {
	FormatPrice(value) {
        if (value === 0) return value; 
      
        if (typeof value === 'number') {
          return parseFloat(value.toFixed(2)); 
        }
      
        if (typeof value === 'string') {         
          const cleanedValue = value.replace(/[^0-9,\.]/g, '').replace(',', '.');
          return parseFloat(parseFloat(cleanedValue).toFixed(2));
        }
      
        return value;  
      }
};
