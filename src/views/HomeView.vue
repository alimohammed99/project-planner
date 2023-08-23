<template>
    <div class="home">
    
        <!-- To display the Filtered Navs -->
        <filterNav @filterChange="current = $event" :sendIncurrent="current" />
    
        <!-- current=$event here means......current is set to 'all' initially. So when the filter is changed, the value of current should be set to '$event' which holds the different filter events('all', 'completed', 'ongoing')  -->
        <!-- { :current="current" } is just me sending 'current' as props to the FilterNav component -->
    
        <!-- I have to listen to the filter change event and do what I want with it-->
        <!-- @filterChange is the custom event sent from 'FilterNav.vue' so I have to listen to it here. -->
        <!-- Up there, I'm updating the 'current' property. I am setting the 'current' to whatever data that's passed up. -->
        <!-- $event is the data ('by') sent from the FilterNav component. That's the work of the $event. -->
        <!-- So, on filter change, the 'current' value should be changed to whatever data passed, instead of having the default value ('all' i.e show all projects by default.) -->
    
        <!-- Wanna display the items ('projects') only if the project array has a length i.e, has data inside. Coz there's no point cycling through the array if it's empty. -->
        <div v-if="projects.length">
            <div class="biggestdiv">
                <div class="projectDiv" v-for="project in showProjectsAccordingToFilter" :key="project.id">
                    <!-- For loops in VUE must have a key attribute, and it must be unique for each item. That's why I picked the id. ID is unique. -->
    
                    <!-- I externalized this template into a separate component (reusable) component. This is because I'm not just gonna display only job title or something. Each project should have a bit more template. I could've done it here though. -->
    
                    <!-- This is the single reusable component to display the projects. -->
                    <!-- "project" is derived from the for-loop. So I sent it as 'props' to the new component. It'll allow us have access to the Projects coz "project" has been used to loop all the "Projects". -->
    
                    <SingleProject :individualProject="project" @delete="handleDelete" @complete="handleComplete" />
                    <!-- @delete is the custom event we passed from the SingleProject component. -->
                    <!-- @complete is the custom event we passed from the SingleProject component. -->
    
                </div>
            </div>
        </div>
    
        <div v-else>
            <p style="font-size: 90px; color: tomato">Loading.....</p>
        </div>
    </div>
</template>

<script>
import SingleProject from "../components/SingleProject.vue";

import FilterNav from "../components/FilterNav.vue";

import Navbar from "../components/Navbar.vue";

export default {
    name: "HomeView",
    components: { SingleProject, FilterNav, Navbar },
    data() {
        return {
            // Since I want to get the data from another place (json file) and use it here, the best place/time to enable/get it is inside the mounted() lifecycle. That's why when the component has been mounted to the DOM.
            projects: [],

            // This is basically the current filter. It's gonna be set to 'all' as default. 'all' is part of the arguments passed in the FilterNav component.
            // The essence of this is to track the current filter tab we're on. Whether completed, ongoing or all.
            current: 'all'
            // I need to send this data (current) as props into the FilterNav component coz I wanna style the buttons in the FilterNav conditionally based on the prop value.
        };
    },
    mounted() {

        // I used Fetch API. I need to pass in the endpoint which was provided by the json server to get all the jobs. Now this is gonna fetch all the data for me and return them in json format.
        // The below function is asynchronous and therefore returns a Promise.
        fetch(" http://localhost:3000/projects")

            // The below function fires a callback function after the above function is done.
            // The below is necessary in order to actually get that data and pass into Javascript, I need to take Response.
            // This is asynchronous and therefore also returns a Promise.
            .then((res) => res.json())

            // This is just to populate whatever data in the 'jobs' array inside "data".
            .then((data) => (this.projects = data))

            // This is needed incase there's any error with the asynchronous tasks up there.
            .catch((err) => console.warn(err.message));

    },
    methods: {
        // specific_id is the "this.individualProject.id" passed with the custom event(delete) inside the SingleProject component.
        handleDelete(specific_id) {

            this.projects = this.projects.filter((item) => {

                // filter() cycles through an array and fires the function for each item in the array. If I return 'true' for an item in the array, then the array is still gonna keep that particular item, but if I return 'false', that item will be removed from the array.

                return specific_id !== item.id

                // "item" is used to represent all the stuffs in the array.
                // "specific_id" is used to represent the current stuff we're clicking on.
                // And by returning false here, it means the array is gonna remove specific_id(current thing we clicked on) from ITEM(all the stuffs in the array).

                // And 'item.id'? That's because 'specific_id' holds an ID (ID of the current item). So I have to compare ID and ID. That's why I appended ID to 'item'.
            })

        },
        handleComplete(specific_id) {
            // specific_id is the "this.individualProject.id" passed with the custom event(complete) inside the SingleProject component.

            let rh = this.projects.find(item => {
                // find() to find specific item in the an array.
                // "item" is used to represent all the stuffs in the array.

                return item.id === specific_id
                // Trying to match the IDs.
                // "specific_id" is the current project id we're toggling so I need to match it with item which represents each data in the array. And of course it's gonna return true. If it's true, we're good to go.
            })
            rh.isComplete = !rh.isComplete
            // Toggling the 'isComplete' property, to reverse the value.
        }
    },
    computed: {
        // This is to show the Projects according to filter.
        showProjectsAccordingToFilter() {
            // Now that Projects are not just displayed anyhow, projects are now displayed based on filter in the computed property. So the for-loop up there has to change. Instead of { v-for="project in projects" }, it's gonna be { v-for="project in showProjectsAccordingToFilter" } i.e I'm now using the "showProjectsAccordingToFilter" array instead of the normal "Projects" array, since I now want to filter the display.

            // If 'current' is set to 'COMPLETED', show only completed Projects, i.e Projects in which their 'isComplete' property is TRUE in the DB.
            if (this.current === 'completed') {

                return this.projects.filter(item => item.isComplete)
                // Remember that I used "Projects" and not "Project". I wanna filter and display based on condition, so I have to filter the whole Projects array and not the loop key ( 'project' as in: v-for="project" ).
                // 'Item' now stands for all Projects that are being filtered. It's like an array now.
                // This is how filter() works......it's gonna check the condition and return values that fulfill it.
                // Here, after checking the condition, it's gonna return Projects whose 'isComplete' property is TRUE in the DB.

            }

            // If 'current' is set to 'ONGOING', show only ongoing Projects, i.e Projects in which their 'isComplete' property is FALSE in the DB.
            if (this.current === 'ongoing') {

                return this.projects.filter(item => !item.isComplete)
                // Remember that I used "Projects" and not "Project". I wanna filter and display based on condition, so I have to filter the whole Projects array and not the loop key ( 'project' as in: v-for="project" ).
                // 'Item' now stands for all Projects that are being filtered. It's like an array now.
                // This is how filter() works......it's gonna check the condition and return values that fulfill it.
                // Here, after checking the condition, it's gonna return Projects whose 'isComplete' property is NOT TRUE in the DB i.e FALSE.
            }

            // If 'current' is not set to 'COMPLETED' or 'ONGOING', definitely that means it's gonna be set to 'ALL' show all Projects, don't filter anything, i.e Projects in which their 'isComplete' property is FALSE or TRUE or whatever in the DB. That's why I ddnt filter anything here. Just simply return our all Projects.
            return this.projects

        }
    }
}
</script>
