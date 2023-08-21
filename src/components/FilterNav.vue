<template>
    <div>
    
        <nav class="filter__nav">
    
            <!-- I passed some arguments in the 'updateFilter' coz I'm trying to filter something (Projects) BY DIFFERENT things. -->
    
            <!-- So I can check for that values later. -->
    
    
    
            <!-- Filtering and displaying ALL Projects. -->
    
            <button @click="updateFilter('all')" :class="{ active: current === 'all' }">View All</button>
            <!-- If the value of current is 'all', i.e, if User clicks on the button 'View all' this button is gonna have class 'active'. -->
    
    
    
            <!-- Filtering and displaying ONGOING Projects. -->
    
            <button @click="updateFilter('ongoing')" :class="{ active: current === 'ongoing' }">Ongoing</button>
              <!-- If the value of current is 'ongoing', i.e, if User clicks on the button 'Ongoing' this button is gonna have class 'active'. -->
    
    
    
            <!-- Filtering and displaying COMPLETED Projects. -->
    
            <button @click="updateFilter('completed')" :class="{ active: current === 'completed' }">Completed</button>
              <!-- If the value of current is 'completed', i.e, if User clicks on the button 'Completed' this button is gonna have class 'active'. -->
    
        </nav>
    
    </div>
</template>

<script>
export default {
    props: ['current'],
    methods: {
        // Just because there are different custom arguments passed into the updateFilters up there, I have to represent the different arguments with one keyword here.
        // So "by" stands for 'all', 'ongoing', 'completed'.

        updateFilter(by) {
            // Now I need to emit an event which I can listen to in the Home component coz it's in the Home component I'm gonna nest the filter navs so I can react to that filter changing.
            // When I react to the filter changing, at that point, I can go ahead and filter the Projects based on that criteria.

            this.$emit('filterChange', by)

            // Remember, the "by" stands for whatever button User clicks up there.
            // So when the 'View All' button is clicked, this "by" will be 'all', when the 'ongoing' button is clicked, this "by" will be 'ongoing'.....and like that.....

            // So now I'm able to listen to whatever event user clicks up there.
            // And I'm emitting to the Home component coz it's from there all activities will take place.
            // So when we emit, we send a data along. Now I'm sending the "by" since that's gonna be the filter to work with in the Home view.

            // I used "$event" to get access to this 'by' in the Home view and remember that 'by' holds all the different arguments ('all', 'completed', 'ongoing') up there.
        },
    },
};
</script>

<style>
.filter__nav button{
    background: none;
    border: none;
    color: #bbb;
    outline: none;
    font-size: 18px;
    text-transform: uppercase;
    margin-right: 10px;
    letter-spacing: 3px;
    font-weight: bold;
    cursor: pointer;
}

.filter__nav button.active{
    color: #555;
}
</style>
