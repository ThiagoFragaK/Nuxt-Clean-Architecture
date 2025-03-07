import axios from 'axios';
const url = "https://fakestoreapi.com";

export default {
    getAllProducts() {
        return axios.get(`${url}/products?limit=15`)
            .then((response) => {
                return response.data;
            })
            .catch(() => {
                return {
                    error: "There's an error fetching the products list."
                }
            });
    },
    getProductByID(productID) {
        return axios.get(`${url}/products/${productID}`)
            .then((response) => {
                return response.data;
            })
            .catch(() => {
                return {
                    error: "There's an error fetching the product's details."
                }
            });;
    },
}