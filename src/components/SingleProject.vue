<template>
    <div class="project" :class="{ completedProject: individualProject.isComplete }">
    
        <!-- This is class binding. If a project's 'isComplete' property is true, it's gonna bind the class "completedProject" to it.

        That means any project that has been marked to be completed, the 'isComplete' property of that project is gonna change to 'true', therefore it's gonna have the class of "completedProject" -->
    
    
    
        <div class="actions">
    
            <h1 title="Click to display project title" @click="toggleShowProjectsDetails" style="color: indigo">
    
                {{ individualProject.title }}
    
            </h1>
    
    
    
            <div class="icons">
    
                <router-link :to="{ name: 'EditProject', params: {xy: individualProject.id} }">
                    <!-- "xy" is the parameter sent from the router page. -->
                    <span class="material-icons">edit</span>
                </router-link>
                <!-- Because edit is the only icon here that leads to a separate page. Other icons just perform actions. -->
    
    
    
                <span @click="deleteProject" class="material-icons"> delete </span>
    
    
    
                <span @click="toggleComplete" class="material-icons tick"> done </span>
    
            </div>
    
        </div>
    
    
    
        <div v-if="showProjectsDetails" class="details">
    
            <p style="font-size: 25px; color: brown">
    
                <em>{{ individualProject.details }}</em>
    
            </p>
    
        </div>
    
    </div>
</template>

<script>
export default {
    props: ["individualProject", "bigDiv"],

    data() {
        return {
            showProjectsDetails: false,

            // Saving the endpoint fetching the Projects, BUT appending the individual ID to it. That's because I'm gonna be using the endpoint many times coz I wanna perform some operations. So I've saved the endpoint with a variable. I'll just be calling the variable name whenever I need the endpoint.
            uri: "http://localhost:3000/projects/" + this.individualProject.id,
        };
    },

    mounted() {},

    methods: {
        // Projects details aren't gonna show unless User clicks on the projects titles and User can toggle btw hiding and showing the projects details.
        toggleShowProjectsDetails() {
            this.showProjectsDetails = !this.showProjectsDetails;
        },

        // Handles the deletion of Projects.
        deleteProject() {
            // This line alone deletes each Project.
            fetch(this.uri, { method: "DELETE" })
                // I want to send the deleted project-id to the home and I can do that via '$emit'. I'm sending it coz after I delete, I want the particular Project to be removed from the Project array entirely. Without doing this, the deletion will only happen in the json-db and not in the browser.
                .then(() => this.$emit("delete", this.individualProject.id))
                // When we emit, we often pass along a data.

                // Incase there's any error..
                .catch((err) => console.warn(err.message));
        },

        // Handles Projects completion. It's a TOGGLE actually coz when the element that has this function is clicked, I'll be toggling between two states......Done & Undone.........Complete & Incomplete.
        toggleComplete() {
            // Patch() request is used when we wanna update SOME PARTS of a Resource and not the WHOLE Resource.
            fetch(this.uri, {
                    method: "PATCH",

                    // Header of the request, means the data being sent will be in json format
                    headers: { "Content-Type": "application/json" },

                    // The data being sent is an object so this is gonna convert it to json string. And that's how json is sent back and forth between clients and the server.
                    // The 'JSON.stringify()' static method converts a JavaScript value to a JSON string.
                    body: JSON.stringify({
                        isComplete: !this.individualProject.isComplete,
                    }),
                    // I have access to the contents inside the database. So I'm able to point out the 'isComplete' property from the db.
                    //  And here, since I'm toggling the complete, I'm reversing whatever value the 'isComplete' property have in the db for individual data.

                    // I added a callback function { ".then()" } because I wanna emit an event which is gonna make these changes not only reflect in the db, but also on the outside (local data) in the browser. So I'm gonna send the emit function to the homepage.
                })
                .then(() => {
                    this.$emit("complete", this.individualProject.id);
                })
                .catch((err) => console.warn(err.message));
            // Incase there's any error..
        },
    },
};
</script>

<style>
/* I gave both the 'mother-div' and the 'child-div' same stylings, so it's gonna be like a double-styling in the interface. */

/*.actions{
    margin-bottom: 190px !important;
    background-color:red !important;
}*/

.project{
    margin: 50px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 10px 10px 3px rgba(36, 17, 17, 0.1);
    border-left: 7px solid #e90074;
}

.projectDiv{  
    margin: 50px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 10px 10px 3px rgba(36, 17, 17, 0.1);
    border-right: 20px double black;
    border-bottom: 10px double black;
}

h1 {
    cursor: pointer;
}

.actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.material-icons {
    font-size: 30px;
    margin-left: 10px;
    color: #bbb;
    cursor: pointer;
}

.material-icons:hover {
    color: #777;
}

.project.completedProject {
    /* completedProject is the class I binded.*/
    border-left: 7px solid #00ce89;
}


.project.completedProject .tick {
    /*Changing the color of the tick icon of completed projects.*/
    color: #00ce89;
    font-size:50px;
    transition: 1s;
}
</style>
