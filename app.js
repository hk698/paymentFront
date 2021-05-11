let app = new Vue({
    el: '#app',
    data: {
        sitename: 'Please send the screenshot of the payment to the merchant',
        checkout: {
            name: '',
            number: ''
        },
        placeholder: 'Your Name',
        placeholder2:'Mobile Number'
    },
    methods: {
        checkoutFinish(){

            this.cart.forEach(item => {

                let body = {
                    "name": this.checkout.name,
                    "phone": this.checkout.number,
                    "lessonID": item.lesson._id,
                    "noOfItem": item.noOfItem
                };
                this.newOrder(body);

            });
        },
        newOrder(order) {

            fetch('https://individialwork2.herokuapp.com/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            }).catch(error => console.log(error));

        },
    computed:{
        validCheckout(){
            let testName= /^[a-zA-Z\s]*$/.test(this.checkout.name);
            let testNumber= /^\d+$/.test(this.checkout.number);

            if (testName && this.checkout.name.length > 0 && testNumber){
                return true;
            }
            return false;
        },
        
    },
    // mounted(){
    //     this.accessLessons();
    // }
}
})