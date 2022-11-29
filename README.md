# Development

### Link to Deployed Website
https://github.com/sexyOtter555/Development.git

### Goal and Value of the Application
The Corgibucks Coffee Shop site serves as an order site that allows customers to filter/sort on the available items and checkout. The value of the application is that it provides an useful interface that allows users to order food and drink online instead of having to wait in line in store.

### Usability Principles Considered
The filter and sort buttons are intuitive, learnable, and adaptable, based on reviews by peers. There is also an option on the top of the nav bar tha allows users to clear filters completely. Instructions to add, drop, and proceed are in positions following emperial guides that align well with user intuition and habits. 

### Organization of Components
The Corgibucks Coffee Shop site contains a display of items section and an aggregator section (or the cart of the customer section.) For the main section displaying the items that are available, components such as Filter, Products are used. For the aggregator section, Cart component is used. The functions component is used to pass down the event to render the items that appear on the page and change state according to actions triggered in Filter or Cart section. The library.json file is used to store all the information of the menu items. The Functions component, being passed down to App.js, would render the final webpage.

### How Data is Passed Down Through Components
 Data Passed down through components & User interaction in changing state: Example 1: Say the user clicks on "Order by Price" in the Filter component, and select "lowest"; this action will trigger the onChange, which uses props to call the function sortOnPrice in Functions, this function set state so that sort in the constructor would update to "lowest" and the function sorts the products by price from lowest to highest. The function is called in the render and the latest state is updated to reflect the sorted products on the webpage. Similarly, other filters like "Dietary Restrictions" and "Category" follows the same logic.

### How the User Triggers State Changes
For the aggregators, say the user wants to buy two Corgi Lattes. The user clicks on "Add to Cart", this action will trigger the onClick in the Cart component, which uses props to call the function addToCart in Functions. This function set state so that the item will be pushed to the empty list called cartItems in the constructor if the item was not there originally. If the item was there originally, the aggregator would update the number of that particular item in the Cart. The user can also add the number of items in the Cart section using the same function. However, users cannot reduce the number of the Corgi Lattes below one in the Cart section by clicking on the "-", instead they will need to click on "remove", so that the action calls function removeFromCart in Functions and pull that item from the cartItems list.


